"use strict";
var id = "";

window.onload = () => {
  id = randomString();
  document.getElementById("link2").innerHTML =
    "https://weak-playful-winterberry.glitch.me/play.html?id=" + id;
};

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

document.querySelector("#butn2").addEventListener("click", () => {
  window.location = "https://weak-playful-winterberry.glitch.me/search.html";
});

document.querySelector("#link3").addEventListener("click", () => {
  const url = "https://weak-playful-winterberry.glitch.me/play.html?id=" + id;
  const el = document.createElement("textarea");
  el.value = url;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  console.log("link copied");
  
  
  
  // Use them in email.onclick()
  var subject = "Invitation to RestaurantTinder";
  var body = "Here is the link to join the Game:) " + url;
  window.open('mailto:test@example.com?subject=' + subject + '&body=' + body);
});
document.querySelector("#link3").addEventListener("click", () => {
  const url = "https://weak-playful-winterberry.glitch.me/play.html?id=" + id;
  const el = document.createElement("textarea");
  el.value = url;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  console.log("link copied");
  
  
  
  // Use them in email.onclick()
  var subject = "Invitation to RestaurantTinder";
  var body = "Here is the link to join the Game:) " + url;
  window.open('mailto:test@example.com?subject=' + subject + '&body=' + body);
});

