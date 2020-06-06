import {animalList} from "/animal.js";
const clientname = animalList[Math.floor(Math.random() * animalList.length)];

const url = "wss://weak-playful-winterberry.glitch.me";
const connection = new WebSocket(url);

let e = document.getElementById("chat");
e.addEventListener('change', sendNewMsg);

let n = document.getElementById("name");
n.innerHTML = clientname;

function signName(l) {
  let p = document.querySelectorAll('.dispname');
  for (var i = 0; i < p.length; i++) {
    if (l[i] == "Waiting...") return;
    p[i].innerHTML = l[i];
    p[i].style.color = "#118AB2";
  }
}

function sendNewMsg(key) {
  console.log("send");
  let e = document.getElementById("chat");
  let msgObj = {
    type: "message",
    from: clientname,
    msg: e.value
  };
  connection.send(JSON.stringify(msgObj));
  e.value = null;
}

let addMessage = function(message) {
  let text = document.getElementById("chatarea");
  let newline = String.fromCharCode(13, 10);
  //console.log(message);
  //console.log(text.textContent + '&#13;&#10;' + message);
  text.innerHTML = text.textContent == "" ? text.textContent + message : text.textContent + newline + message;
};

connection.onopen = () => {
  connection.send(JSON.stringify({ type: "helloClient" }));
  // Assign the name
  connection.send(JSON.stringify({type: "name", data: [], msg: clientname}));
};

connection.onerror = error => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = event => {
  console.log(event.data);
  if (event.data == "connected!") return;
  let msgObj = JSON.parse(event.data);
  if (msgObj.type == "name") {
    signName(msgObj.data);
  }
  if (msgObj.type == "message") {
    addMessage(msgObj.from + ": " + msgObj.msg);
  }
};