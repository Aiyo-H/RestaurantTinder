import {animalList} from "/animal.js";
const clientname = animalList[Math.floor(Math.random() * animalList.length)];

const url = "wss://weak-playful-winterberry.glitch.me";
const connection = new WebSocket(url);

var firstPlayer = false;

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

function signHost(f) {
  //console.log(firstPlayer);
  if (!f) {
    if (firstPlayer) return;
    document.getElementById("butn").style.display = "none";
    document.getElementById("wait0").style.display = "block";
  } else firstPlayer = true;
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

// NEXT HTML
document.querySelector('#butn').addEventListener('click', () => {connection.send(JSON.stringify({ type: "nextTinder" }));});

connection.onopen = () => {
  connection.send(JSON.stringify({ type: "helloClient" }));
  // Assign the name
  connection.send(JSON.stringify({type: "name", data: [], msg: clientname, first: false, location: "", term: ""}));
};

connection.onerror = error => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = event => {
  console.log(event.data);
  if (event.data == "connected!") return;
  let msgObj = JSON.parse(event.data);
  if (msgObj.type == "name") {
    signHost(msgObj.first);
    signName(msgObj.data);
    //addMessage("Search location: " + msgObj.location);
    //addMessage("Search term: " + msgObj.term);
    addMessage("Welcome " + msgObj.msg + "!");
  }
  if (msgObj.type == "nextTinder") {
    window.location = "https://weak-playful-winterberry.glitch.me/tinder.html";
  }
  if (msgObj.type == "message") {
    addMessage(msgObj.from + ": " + msgObj.msg);
  }
};