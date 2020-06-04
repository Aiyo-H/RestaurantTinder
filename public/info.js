var data = [];
window.onload = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/info');
  xhr.addEventListener("load", () => {
    let restaurant = JSON.parse(xhr.responseText);
    data = restaurant.data;
    console.log(data[0].image_url);
    
    // Images
    document.getElementById("rest1").src = data[0].image_url;
    document.getElementById("rest2").src = data[1].image_url;
    document.getElementById("rest3").src = data[2].image_url;
    document.getElementById("rest4").src = data[3].image_url;
    document.getElementById("rest5").src = data[4].image_url;
    
    // Names
    document.getElementById("restname1").innerHTML = data[0].name;
    document.getElementById("restname2").innerHTML = data[1].name;
    document.getElementById("restname3").innerHTML = data[2].name;
    document.getElementById("restname4").innerHTML = data[3].name;
    document.getElementById("restname5").innerHTML = data[4].name;
    
    // Ratings
    document.getElementById("rating1").src = getRating(data[0].rating);
    document.getElementById("rating2").src = getRating(data[1].rating);
    document.getElementById("rating3").src = getRating(data[2].rating);
    document.getElementById("rating4").src = getRating(data[3].rating);
    document.getElementById("rating5").src = getRating(data[4].rating);
  });
  xhr.send(null);
};

function getRating(e) {
  switch (e) {
    case 0:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F0.png?v=1591256325203";
    case 0.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F1.png?v=1591255699229";
    case 1:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F2.png?v=1591255699229";
    case 1.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F3.png?v=1591255699229";
    case 2:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F4.png?v=1591255699229";
    case 2.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F5.png?v=1591255699229";
    case 3:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F6.png?v=1591255699229";
    case 3.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F7.png?v=1591255699229";
    case 4:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F8.png?v=1591255699229";
    case 4.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F9.png?v=1591255699229";
    case 5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F1.png?v=1591255699229";
    default:
      return "/";
  }
}