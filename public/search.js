"use strict";
document.querySelector("#forgot").addEventListener("click", () => {
  window.location = "https://weak-playful-winterberry.glitch.me/game.html";
});

document.querySelector("#butn3").addEventListener("click", function() {
  let search_location = document.getElementById("textarea1").value == "" ? "davis, ca" : document.getElementById("textarea1").value;
  let search_term = document.getElementById("textarea2").value == "" ? "hamburger" : document.getElementById("textarea2").value;
  let xhr = new XMLHttpRequest();
  let info = {
    location: search_location,
    term: search_term
  };
  xhr.open("POST", "/search", true);
  xhr.setRequestHeader("content-Type", "application/json;charset=UTF-8");
  xhr.onloadend = function(e) {
    //window.location = "https://weak-playful-winterberry.glitch.me/tinder.html";
  };
  xhr.send(JSON.stringify(info));
});