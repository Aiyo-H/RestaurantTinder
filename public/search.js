"use strict";
document.querySelector("#forgot").addEventListener("click", () => {
  window.location = "https://weak-playful-winterberry.glitch.me/game.html";
});

document.querySelector("#butn3").addEventListener("click", () => {
  window.location = "https://weak-playful-winterberry.glitch.me/tinder.html";
});


// -------------------Yelp API-----------------------------

const yelp = require('yelp-fusion');
const client = yelp.client('YOUR_API_KEY');

client.search({
  term: 'Four Barrel Coffee',
  location: 'san francisco, ca',
}).then(response => {
  console.log(response.jsonBody.businesses[0].name);
}).catch(e => {
  console.log(e);
});

// ---------------------------------------------------------