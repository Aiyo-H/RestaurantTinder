var data = [];
window.onload = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/info');
  xhr.addEventListener("load", () => {
    let restaurant = JSON.parse(xhr.responseText);
    data = restaurant.data;
    console.log(data);
    document.getElementById("rest1").src = data[0].image_url;
  });
  xhr.send(null);
};
