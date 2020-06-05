var data = [];
window.onload = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/info');
  xhr.addEventListener("load", () => {
    let restaurant = JSON.parse(xhr.responseText);
    data = restaurant.data;
    //console.log(data[0].image_url);
    let img, name, rating, dollar, location, reviews;
    for (var i = 0; i < 8; i++) {
      
      // Images
      img = 'rest' + (i + 1).toString();
      document.getElementById(img).src = data[i].image_url;
      
      // Names
      name = 'restname' + (i + 1).toString();
      document.getElementById(name).innerHTML = data[i].name;
      
      // Ratings
      rating = 'rating' + (i + 1).toString();
      document.getElementById(rating).src = getRating(data[i].rating);
      
      // Prices
      dollar = 'dollar' + (i + 1).toString();
      document.getElementById(dollar).innerHTML = ((data[i].hasOwnProperty('price')) ? data[i].price : '?');
      
      // Locations
      location = 'location' + (i + 1).toString();
      document.getElementById(location).innerHTML = data[i].location.display_address[0] + ', ' + data[i].location.display_address[1];
      
      // Reviews
      reviews = 'review' + (i + 1).toString();
      document.getElementById(reviews).innerHTML = data[i].review_count.toString() + ' reviews';
    }
  });
  xhr.send(null);
};

function getRating(e) {
  switch (e) {
    // Asssets created by Jean from Noun Project
    case 0:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F0.png?v=1591398893926";
    case 0.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F1.png?v=1591398893926";
    case 1:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F2.png?v=1591398893926";
    case 1.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F3.png?v=1591398893926";
    case 2:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F4.png?v=1591398893926";
    case 2.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F5.png?v=1591398893926";
    case 3:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F6.png?v=1591398893926";
    case 3.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F7.png?v=1591398893926";
    case 4:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F8.png?v=1591398893926";
    case 4.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F9.png?v=1591398893926";
    case 5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F10.png?v=1591398893926";
    default:
      return "/";
  }
}