var id = 0;
showtime();
function next() {
  id = (id + 1) % 4;
  switch (id) {
    case 0:
      document.getElementById("pic").src = "./assets/fabric.jpg";
      break;
    case 1:
      document.getElementById("pic").src = "./assets/fatherPortrait.jpg";
      break;
    case 2:
      document.getElementById("pic").src = "./assets/openAfterDeath.jpg";
      break;
    case 3:
      document.getElementById("pic").src = "./assets/roomCube.jpg";
      break;
  }
}
function last() {
  if (id == 0) id = 4;
  id = (id - 1) % 4;
  switch (id) {
    case 0:
      document.getElementById("pic").src = "./assets/fabric.jpg";
      break;
    case 1:
      document.getElementById("pic").src = "./assets/fatherPortrait.jpg";
      break;
    case 2:
      document.getElementById("pic").src = "./assets/openAfterDeath.jpg";
      break;
    case 3:
      document.getElementById("pic").src = "./assets/roomCube.jpg";
      break;
  }
}

function showtime() {
  var nowtime = new Date();
  var endtime = new Date("2020/05/10,17:00:00");
  var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
  document.getElementById("countdown").innerHTML = Number(lefttime).toLocaleString();
}
