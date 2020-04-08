var id = 0;
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