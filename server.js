// server.js
// where your node app starts

// include modules
const express = require('express');

const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const sql = require("sqlite3").verbose();
const FormData = require("form-data");

// ----------------------------DATABASE--------------------------------------

// This creates an interface to the file if it already exists, and makes the 
// file if it does not. 
const postcardsDB = new sql.Database("restaurant.db");

// Actual table creation; only runs if "postcards.db" is not found or empty
// Does the database table exist?
let cmd = " SELECT name FROM sqlite_master WHERE type='table' AND name='RestaurantsTable' ";
postcardsDB.get(cmd, function (err, val) {
    console.log(err, val);
    if (val == undefined) {
        console.log("No database file - creating one");
        createPostcardsDB();
    } else {
        console.log("Database file found");
    }
});

function createPostcardsDB() {
  // explicitly declaring the randomString protects rowids from changing if the 
  // table is compacted; not an issue here, but good practice
  const cmd = 'CREATE TABLE RestaurantsTable ( randomString TEXT PRIMARY KEY, image TEXT, color TEXT, font TEXT, message TEXT)';
  postcardsDB.run(cmd, function(err, val) {
    if (err) {
      console.log("Database creation failure",err.message);
    } else {
      console.log("Created database");
    }
  });
}

// ---------------------------------------------------------------------------

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/images')    
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
// let upload = multer({dest: __dirname+"/assets"});
let upload = multer({storage: storage});


// begin constructing the server pipeline
const app = express();


// ------------------------------DATABASE---------------------------------------

// A middleware function to handles the GET query /saveDisplay
// Observe that it either ends up sending the HTTP response or calls next(), so it
// is a valid middleware function. 
function handlePostcard(request, response, next) {
  /*
  //let cmd = "SELECT * FROM PostcardsTable";
  postcardsDB.all(cmd, function (err, rows) {
    if (err) {
      console.log("Database reading error", err.message)
      next();
    } else {
      // send postcard to browser in HTTP response body as JSON
      response.json(rows);
      console.log("rows",rows);
    }
  });*/
  
  // Example of just getting first row
  const r = request.query.id;
  let xcmd = "SELECT * FROM PostcardsTable WHERE randomString = ?";
  postcardsDB.get( xcmd, r, function ( err, rowData ) {    
     if (err) { console.log("error: ",err.message); }
     else { console.log( "got: ", rowData);  response.json(rowData); }
  });

}
// -------------------------------------------------------------------------------


// --------------------------RandomString-----------------------------------------
// Availability: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

function randomString() {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < 22; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
// --------------------------------------------------------------------------------


// Serve static files out of public directory
app.use(express.static('public'));

// Also serve static files out of /images
app.use("/images",express.static('images'));

// Handle GET request to base URL with no other route specified
// by sending creator.html, the main page of the app
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/public/creator.html');
});

// Next, the the two POST AJAX queries

// Handle a post request to upload an image. 
app.post('/upload', upload.single('newImage'), function (request, response) {
  console.log("Recieved",request.file.originalname,request.file.size,"bytes")
  if(request.file) {
    // Push to ECS162.org server
    sendMediaStore("/images/" + request.file.originalname, request, response);
    //sendMediaStore("/images/ec2.png", request, response);
    
    // Delete images in Glitch
    fs.unlink("/app/images/" + request.file.originalname, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
    
    // file is automatically stored in /images, 
    // even though we can't see it. 
    // We set this up when configuring multer
    //response.end("recieved "+request.file.originalname);
  }
  else throw 'error';
});

// Handle a GET request with r
app.get("/showPostcard", handlePostcard);

// Handle a post request containing JSON
app.use(bodyParser.json());
// gets JSON data into req.body
app.post('/saveDisplay', function (req, res) {

  console.log("Server recieved",req.body);
  let string = randomString();
  let image = req.body.image;
  let color = req.body.color;
  let font = req.body.font;
  let message = req.body.message;
  // put new item into database
  cmd = "INSERT INTO PostcardsTable ( randomString, image, color, font, message) VALUES (?,?,?,?,?) ";
  postcardsDB.run(cmd, string, image, color, font, message, function(err) {
    if (err) {
      console.log("DB insert error",err.message);
      //next();
    } else {
      //let newId = this.lastID; // the rowid of last inserted item
      res.send(string);
    }
  }); // callback, postcardsDB.run
  
  
});

// custom 404 page (not a very good one...)
// last item in pipeline, sends a response to any request that gets here
app.all("*", function (request, response) { 
  response.status(404);  // the code for "not found"
  response.send("This is not the droid you are looking for"); });


// The GET AJAX query is handled by the static server, since the 
// file postcardData.json is stored in /public

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// function called when the button is pushed
// handles the upload to the media storage API
function sendMediaStore(filename, serverRequest, serverResponse) {
  let apiKey = process.env.ECS162KEY;
  if (apiKey === undefined) {
    serverResponse.status(400);
    serverResponse.send("No API key provided");
  } else {
    // we'll send the image from the server in a FormData object
    let form = new FormData();
    
    // we can stick other stuff in there too, like the apiKey
    form.append("apiKey", apiKey);
    // stick the image into the formdata object
    form.append("storeImage", fs.createReadStream(__dirname + filename));
    // and send it off to this URL
    form.submit("http://ecs162.org:3000/fileUploadToAPI", function(err, APIres) {
      // did we get a response from the API server at all?
      if (APIres) {
        // OK we did
        console.log("API response status", APIres.statusCode);
        // the body arrives in chunks - how gruesome!
        // this is the kind stream handling that the body-parser 
        // module handles for us in Express.  
        let body = "";
        APIres.on("data", chunk => {
          body += chunk;
        });
        APIres.on("end", () => {
          // now we have the whole body
          if (APIres.statusCode != 200) {
            serverResponse.status(400); // bad request
            serverResponse.send(" Media server says: " + body);
          } else {
            serverResponse.status(200);
            serverResponse.send(body);
          }
        });
      } else { // didn't get APIres at all
        serverResponse.status(500); // internal server error
        serverResponse.send("Media server seems to be down.");
      }
    });
  }
}