import {animalList} from "/animal.js";
const clientname = animalList[Math.floor(Math.random() * animalList.length)];

const url = "wss://weak-playful-winterberry.glitch.me";
const connection = new WebSocket(url);

let e = document.getElementById("chat");
e.addEventListener('change', sendNewMsg);

let p = document.getElementById("plist1");
p.innerHTML = clientname;
p.style.color = "#118AB2";

let n = document.getElementById("name");
n.innerHTML = clientname;

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
  console.log(message);
  console.log(text.textContent + '\n' + message);
  text.innerText = text.textContent + '\n' + message;
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



// Enter
/*
var btn = document.getElementById('MsgToSend');
btn.addEventListerner('keydown', function (e) {
    if(e.keyCode==13) {
     // i know i should do this but my problem is what is 'e' in my case how can i specify it ?
    }
});
*/