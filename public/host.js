import {animalList} from "/animal.js";
const clientname = animalList[Math.floor(Math.random() * animalList.length)];

const url = "wss://weak-playful-winterberry.glitch.me";
const connection = new WebSocket(url);

let e = document.getElementById("newMsg");
e.addEventListener("change", sendNewMsg);
let button1 = document.getElementById("btn1");
let button2 = document.getElementById("btn2");
let progressBar = document.getElementById("progress");
let restaurant = document.getElementById("restaurant");

function sendNewMsg() {
  let e = document.getElementById("newMsg");
  let msgObj = {
    type: "message",
    from: clientname,
    msg: e.value
  };
  connection.send(JSON.stringify(msgObj));
  e.value = null;
}

let addMessage = function(message) {
  const pTag = document.createElement("p");
  pTag.appendChild(document.createTextNode(message));
  document.getElementById("messages").appendChild(pTag);
};

connection.onopen = () => {
  connection.send(JSON.stringify({ type: "helloClient" }));
};

connection.onerror = error => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = event => {
  console.log(event.data);
  let msgObj = JSON.parse(event.data);
  if (msgObj.type == "message") {
    addMessage(msgObj.from + ": " + msgObj.msg);
  } else if (msgObj.type == "command") {
    console.log("next");
    progressBar.textContent = "Please chose...";
    restaurant.textContent = "Restaurant " + msgObj.info;
  } else if (msgObj.type == "end") {
    progressBar.textContent = msgObj.info + " is your choice, go and enjoy!";
    restaurant.textContent = "Restaurant " + msgObj.info;
    button1.style.display = "none";
    button2.style.display = "none";
  } else {
    addMessage(msgObj.type);
  }
};


// Enter
/*
var btn = document.getElementById('MsgToSend');
btn.addEventListerner('keydown', function (e) {
    if(e.keyCode==13) {
     // i know i should do this but my problem is what is 'e' in my case how can i specify it ?
    }
});
*/