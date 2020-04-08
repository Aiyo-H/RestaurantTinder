var id = 0;
function next() {
  id = (id + 1) % 4;
  switch (id) {
    case 0:
      document.getElementById("img").src = "./assets/fabric.jpg";
      break;
    case 1:
      document.getElementById("img").src = "./assets/fatherPortrait.jpg";
      break;
    case 2:
      document.getElementById("img").src = "./assets/openAfterDeath.jpg";
      break;
    case 3:
      document.getElementById("img").src = "./assets/roomCube.jpg";
      break;
  }
}