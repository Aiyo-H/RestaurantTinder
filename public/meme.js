function start() {
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
  
  
  document.getElementById("link").select(); 
  if (document.execCommand('copy')) {
		document.execCommand('copy');
		console.log('复制成功');
	}
}
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
