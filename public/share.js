"use strict";
var id = "";

window.onload = () => {
  var home = document.getElementById("desc");
  home.style.display = "none";
  var startbtn = document.getElementById("butn");
  startbtn.style.display = "none";
  var share = document.getElementsByClassName("link");
  for (var i = 0; i < share.length; i++) {
    share[i].style.display = null;
  }
  var searchbtn = document.getElementById("butn2");
  searchbtn.style.display = null;
  id = randomString();
  document.getElementById("link2").innerHTML = "https://weak-playful-winterberry.glitch.me/play.html?id=" + id;
};




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

























var id = "";

function search() {
  var share = document.getElementsByClassName("link");
  for (var i = 0; i < share.length; i++) {
    share[i].style.display = "none";
  }
  var searchbtn = document.getElementById("butn2");
  searchbtn.style.display = "none";
  var get = document.getElementById("butn3");
  get.style.display = null;
  var enter = document.getElementsByClassName("enter");
  for (var i = 0; i < enter.length; i++) {
    enter[i].style.display = null;
  }
  var forgot = document.getElementById("forgot");
  forgot.style.display = null;
}

function forgot() {
  var share = document.getElementsByClassName("link");
  for (var i = 0; i < share.length; i++) {
    share[i].style.display = null;
  }
  var searchbtn = document.getElementById("butn2");
  searchbtn.style.display = null;
  var get = document.getElementById("butn3");
  get.style.display = "none";
  var enter = document.getElementsByClassName("enter");
  for (var i = 0; i < enter.length; i++) {
    enter[i].style.display = "none";
  }
  var forgot = document.getElementById("forgot");
  forgot.style.display = "none";
}

function get() {
  var getbtn = document.getElementById("butn3");
  getbtn.style.display = "none";
  var enter = document.getElementsByClassName("enter");
  for (var i = 0; i < enter.length; i++) {
    enter[i].style.display = "none";
  }
  var forgot = document.getElementById("forgot");
  forgot.style.display = "none";
  var resinfo = document.getElementsByClassName("infodisplay");
  for (var i = 0; i < resinfo.length; i++) {
    resinfo[i].style.display = null;
  }
  var no = document.getElementById("no");
  no.style.display = null;
  var yes = document.getElementById("yes");
  yes.style.display = null;
}


document.querySelector('#link3').addEventListener('click', () => {
  const el = document.createElement('textarea');
  el.value = "https://weak-playful-winterberry.glitch.me/play.html?id=" + id;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  console.log("link copied");
});

