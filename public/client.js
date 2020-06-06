// client-side js, loaded by index.html
// run by the browser each time the page is loaded

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

button1.addEventListener("click", () => {
  progressBar.textContent = "Waiting...";
  let cmdObj = {
    type: "command",
    choice: 0
  };
  connection.send(JSON.stringify(cmdObj));
});

button2.addEventListener("click", () => {
  progressBar.textContent = "Waiting...";
  let cmdObj = {
    type: "command",
    choice: 1
  };
  connection.send(JSON.stringify(cmdObj));
});

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
  if (event.data == "connected!") return;
  let msgObj = JSON.parse(event.data);
  if (msgObj.type == "message") {
    addMessage(msgObj.from + ": " + msgObj.msg);
  }
};
