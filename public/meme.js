var id = 1;
showSlide(id);
showTime();

function showTime() {
  var leftTime = parseInt(((new Date("2020/05/10, 17:00:00")).getTime() - (new Date()).getTime()) / 1000);
  document.getElementById("countdown").innerHTML = Number(leftTime).toLocaleString();
  setTimeout(showTime, 1000);
}

function nextSlide(n) {
  showSlide(++id);
}

function lastSlide(n) {
  showSlide(--id);
}

function currentSlide(n) {
  showSlide(id = n);
}

function showSlide(n) {
  var slides = document.getElementsByClassName("mySlides");
  var buttons = document.getElementsByClassName("dot");
  id = n > slides.length ? 1 : (n < 1 ? slides.length : n);
  for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].className = buttons[i].className.replace(" active", "");
  }
  slides[id - 1].style.display = "block";  
  buttons[id - 1].className += " active";
}