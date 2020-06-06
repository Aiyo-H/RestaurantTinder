"use strict";

window.onload = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/play');
  xhr.addEventListener("load", () => {
    console.log(JSON.parse(xhr.responseText));
    let result = JSON.parse(xhr.responseText);
    let rests, votes;
    for (var i = 0; i < 8; i++) {
      
      // Rests
      rests = 'result' + (i + 1).toString();
      document.getElementById(rests).innerHTML = result.rests[i];
      
      // Votes
      votes = 'vote' + (i + 1).toString();
      document.getElementById(votes).innerHTML = result.votes[i].toString();
    }
  });
  xhr.send(null);
};



document.querySelector("#forgot").addEventListener("click", () => {
  window.location = "https://weak-playful-winterberry.glitch.me/game.html";
});

document.querySelector("#butn3").addEventListener("click", function() {
  let search_location = document.getElementById("textarea1").textContent == "" ? "davis, ca" : document.getElementById("textarea1").textContent;
  let search_term = document.getElementById("textarea2").textContent == "" ? "coffee" : document.getElementById("textarea2").textContent;
  let xhr = new XMLHttpRequest();
  let info = {
    location: search_location,
    term: search_term
  };
  xhr.open("POST", "/search", true);
  xhr.setRequestHeader("content-Type", "application/json;charset=UTF-8");
  xhr.onloadend = function(e) {
    window.location = "https://weak-playful-winterberry.glitch.me/host.html";
  };
  console.log(info);
  xhr.send(JSON.stringify(info));
});