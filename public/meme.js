var id = 1;
showSlide(id);
showTime();

function showTime() {
  var leftTime = parseInt(
    (new Date("2020/05/10, 17:00:00").getTime() - new Date().getTime()) / 1000
  );
  document.getElementById("countdown").innerHTML = Number(
    leftTime
  ).toLocaleString();
  setTimeout(showTime, 1000);
}

function nextSlide(n) {
  showSlide(++id);
  showText(id);
}

function lastSlide(n) {
  showSlide(--id);
  showText(id);
}

function currentSlide(n) {
  showSlide((id = n));
  showText(id);
}

function showSlide(n) {
  var slides = document.getElementsByClassName("mySlides");
  var buttons = document.getElementsByClassName("dot");
  id = n > slides.length ? 1 : n < 1 ? slides.length : n;
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].className = buttons[i].className.replace(" active", "");
  }
  slides[id - 1].style.display = "block";
  buttons[id - 1].className += " active";
}

function showText(n) {
  var text = document.getElementById("text2").innerHTML;
  switch (n) {
    case 1:
      text =
        "Stephen Kaltenbach and guests, MODERN DRAPERY, 2020. Felt Fabric, 45 x 60 inches";
      break;
    case 2:
      text =
        "Stephen Kaltenbach, Portrait of My Father, 1972-79. Acrylic on canvas, 114 x 170¾ inches";
      break;
    case 3:
      text =
        "Stephen Kaltenbach, OPEN AFTER MY DEATH, 1970. Mild steel, engraved, with unknown contents, 3 x 6 x 3 inches";
      break;
    case 4:
      text =
        "Stephen Kaltenbach, Room Cube, 1967. Blueprint, 18 x 24 inches, edition of 10";
      break;
  }
}
