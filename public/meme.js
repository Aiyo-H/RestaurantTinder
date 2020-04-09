showtime();
var id = 0;

function next() {
  id = (id + 1) % 4;
  switch (id) {
    case 0:
      document.getElementById("pic").src = "./assets/fabric.jpg";
      document.getElementById("info").innerHTML =
        "Stephen Kaltenbach and guests, MODERN DRAPERY, 2020. Felt Fabric, 45 x 60 inches.";
      break;
    case 1:
      document.getElementById("pic").src = "./assets/fatherPortrait.jpg";
      document.getElementById("info").innerHTML =
        "Stephen Kaltenbach, Portrait of My Father, 1972-79. Acrylic on canvas, 114 x 170¾ inches";
      break;
    case 2:
      document.getElementById("pic").src = "./assets/openAfterDeath.jpg";
      document.getElementById("info").innerHTML =
        "Stephen Kaltenbach, OPEN AFTER MY DEATH, 1970. Mild steel, engraved, with unknown contents, 3 x 6 x 3 inches.";
      break;
    case 3:
      document.getElementById("pic").src = "./assets/roomCube.jpg";
      document.getElementById("info").innerHTML =
        "Stephen Kaltenbach, Room Cube, 1967. Blueprint, 18 x 24 inches, edition of 10.";
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
  var leftTime = parseInt(((new Date("2020/05/10, 17:00:00")).getTime() - (new Date()).getTime()) / 1000);
  document.getElementById("countdown").innerHTML = Number(leftTime).toLocaleString();
  setTimeout(showtime, 1000);
}
