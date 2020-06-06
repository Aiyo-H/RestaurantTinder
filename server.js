// server.js
// where your node app starts

// include modules
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");
const sql = require("sqlite3").verbose();
const FormData = require("form-data");
const nodemailer = require("nodemailer");
const WebSocket = require("ws");
const http = require("http");
const yelp = require("yelp-fusion");

// begin constructing the server pipeline
const app = express();

/*
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
  
  // REAL
  // const cmd = 'CREATE TABLE RestaurantsTable ( randomString TEXT PRIMARY KEY, image TEXT, color TEXT, font TEXT, message TEXT)';
  const cmd = 'CREATE TABLE RestaurantsTable ( randomString TEXT PRIMARY KEY)';
  
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

*/

// ------------------------------DATABASE---------------------------------------

// A middleware function to handles the GET query /saveDisplay
// Observe that it either ends up sending the HTTP response or calls next(), so it
// is a valid middleware function.
//function handlePostcard(request, response, next) {
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

/*
  const r = request.query.id;
  let xcmd = "SELECT * FROM RestaurantsTable WHERE randomString = ?";
  postcardsDB.get( xcmd, r, function ( err, rowData ) {    
     if (err) { console.log("error: ",err.message); }
     else { console.log( "got: ", rowData);  response.json(rowData); }
  });

}
*/
// -------------------------------------------------------------------------------

// --------------------------RandomString-----------------------------------------
// Availability: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

function randomString() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 22; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// --------------------------------------------------------------------------------

// Serve static files out of public directory
app.use(express.static("public"));

app.use(express.json());

// Also serve static files out of /images
app.use("/images", express.static("images"));

// Handle GET request to base URL with no other route specified
// by sending index.html, the main page of the app
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

// The GET AJAX query is handled by the static server, since the
// file postcardData.json is stored in /public

// listen for requests :)

/*
app.post("/sendemail", function (request, response) {
  console.log("1");
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
});


// -----------------------------EmailSender-------------------------------------

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'restaurantinder@gmail.com',
    pass: '19981117'
  }
});

var mailOptions = {
  from: 'restaurantinder@gmail.com',
  to: 'wangbingwei1117@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// -----------------------------------------------------------------------------
*/

/*----------------WebSocket---------------------*/

/*--------Chat box------------*/
/*const server = http.createServer(app);

const wssT = new WebSocket.Server({server});


/wss.on('connection', (ws) => {
  console.log("a new client");
  ws.on('message', (message) => {
    console.log(message);
    //ws.send("server echo:" + message);
    broadcast(message)
  })
  ws.send('connected!')
})

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log(data);
      client.send(data);
    }
  });
}

//start our server
server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
*/
/*--------Game round------------*/

// -------------------Yelp API-----------------------------

var location = "";
var term = "";

const client = yelp.client(
  "a-rz6KFK-1vvLJPMK_MBe-87qtO7omEq8Fk9q4YUo5lAodMng785UgrhB7iDHs8BDW4B3Czqlf0kDpBn4UGpQIFq_xFASEi6Gh1XlCSG0ckQlPcR32ZqHV_PQkPYXnYx"
);

function search() {
  client.search({
      term: term,
      location: location
    })
    .then(response => {
      console.log(response.jsonBody.businesses[0].name);
      var data = [];
      //console.log(response.jsonBody.businesses[0]);
      for (var i = 0; i < 8; i++) {
        data.push(response.jsonBody.businesses[i]);
      }
      //console.log(data);
      var data = { data: data };
      fs.writeFile("./restaurant.json", JSON.stringify(data), function(err) {
        if (err) {
          return console.log(err);
        }
      });
    })
    .catch(e => {
      console.log(e);
    });
}

app.post("/search", function(request, response) {
  console.log(request.body);
  location = request.body.location;
  term = request.body.term;
  search();
  response.send(request.body);
  response.end();
});

app.get("/info", function(request, response) {
  fs.readFile("/app/restaurant.json", function(err, data) {
    response.writeHead(200, { "Content-Type": "application/json" });
    //console.log(JSON.parse(data));
    response.write(data);
    response.end();
  });
});

// --------------------websocket-------------------------------------

//
const server = http.createServer(app);

const wss = new WebSocket.Server({server});

let voteResults = [];

let nameList = {};

let clientCount = 0;
let voteCount = 0; // how many people have voted this round
const restaurantList = ["AA","BB","CC","DD", "EE", "FF", "GG", "HH"]; //from yelp API

let numOfVotes = [0, 0, 0, 0, 0, 0, 0, 0]; //counting how many votes on each restaurant


wss.on('connection', (ws) => {
  clientCount += 1;
  console.log("a new client, now ", clientCount, "users connected");
  ws.on('message', (message) => {
    //console.log(message);
    //ws.send("server echo:" + message);
    //broadcast(message)
    let cmdObj = JSON.parse(message);
    //console.log(message);
    if (cmdObj.type == 'message'){
      let msgObj = {type : 'message', info : cmdObj.msg};
      broadcast(message);
    }
    if (cmdObj.type == 'name'){
      //let msgObj = {type : 'message', info : cmdObj.msg};
      broadcast(message);
    }
    if (cmdObj.type == 'result'){
      voteCount += 1;
      let voteResult = cmdObj.choice;
      //console.log(cmdObj);
      console.log("one user's vote is", voteResult);
      for(var i = 0 ; i < numOfVotes.length ; i++){
        if (voteResult[i]){
          numOfVotes[i] += 1;
        }
      }
      if (voteCount >= clientCount) {
        let voteObj = {
          type : "voteCounting",
          arr : numOfVotes,
        }; //save in obj
        // Save the data
        saveData(voteObj);
        
        
      }
    }
    
    /*if (cmdObj.type == 'command'){
      console.log("one user vote ", yOrN[cmdObj.choice], "on this restaurant");
      voteCount += 1;
      console.log(voteCount, "users voted");
      if (cmdObj.choice == 0){
        numOfVotes[restaurantInd] += 1;
        voteYes += 1;
      }
      console.log("voteYes is ", voteYes);
      if (voteCount == clientCount){
        voteCount = 0;
        if (voteYes == clientCount) {
          let endObj = {'type': 'end', 'info':restaurantList[restaurantInd]};
          broadcast(JSON.stringify(endObj));
        }
        
        else if (restaurantInd == restaurantList.length-1) {
          //reference:https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
          let indexOfMaxValue = numOfVotes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
          let endObj = {'type': 'end', 'info':restaurantList[indexOfMaxValue]};
          
          broadcast(JSON.stringify(endObj));
        }
        else{
          restaurantInd += 1;
          
          let nrObj = {'type': 'command', 'info':restaurantList[restaurantInd]};
          broadcast(JSON.stringify(nrObj));
        }
        voteYes = 0;
        
      }
    }*/
  })
  
  ws.on('close', ()=>{
    clientCount -= 1;
    console.log("a client quit, now ", clientCount, "users connected")
  });
  ws.send('connected!');
  
})

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log(data);
      client.send(data);
    }
  });
}

function saveData(result) {
  fs.writeFile("./voteresult.json", JSON.stringify(result), function(err) {
        if (err) {
          return console.log(err);
        }
  });
}

// -----------------------------------------------------------------

// custom 404 page (not a very good one...)
// last item in pipeline, sends a response to any request that gets here
app.all("*", function(request, response) {
  response.status(404); // the code for "not found"
  response.send("This is not the droid you are looking for");
});





/*var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
*/
server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});