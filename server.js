// server.js
// where your node app starts

// include modules
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const sql = require("sqlite3").verbose();
const FormData = require("form-data");
const nodemailer = require('nodemailer');
const WebSocket = require('ws');
const http = require("http");

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
// by sending index.html, the main page of the app
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
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