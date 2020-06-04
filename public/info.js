var data = [];
window.onload = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/info');
  xhr.addEventListener("load", () => {
    let restaurant = JSON.parse(xhr.responseText);
    data = restaurant.data;
    console.log(data[0].image_url);
    document.getElementById("rest1").src = data[0].image_url;
    document.getElementById("rest2").src = data[1].image_url;
    document.getElementById("rest3").src = data[2].image_url;
    document.getElementById("rest4").src = data[3].image_url;
    document.getElementById("rest5").src = data[4].image_url;
  });
  xhr.send(null);
};
