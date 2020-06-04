window.onload = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/display");
  xhr.addEventListener("load", () => {
    let restaurants = JSON.parse(xhr.responseText);
    //console.log(restaurants);
    /*
    document.getElementById("im").style.display = "flex";
    document.getElementById("pic").src = postcard.image;
    document.getElementById("line").style.display = "block";
    document.getElementById("text").textContent = postcard.message;
    document.getElementById("text").style.fontFamily = postcard.font;
    document.getElementById("background").style.backgroundColor =
      postcard.color;
      */
  });
  xhr.send(null);
};
