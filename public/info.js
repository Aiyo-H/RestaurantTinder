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
    document.getElementById("restname1").innerHTML = data[0].name;
    document.getElementById("restname2").innerHTML = data[1].name;
    document.getElementById("restname3").innerHTML = data[2].name;
    document.getElementById("restname4").innerHTML = data[3].name;
    document.getElementById("restname5").innerHTML = data[4].name;
  });
  xhr.send(null);
};

function getRating(e) {
  switch (e) {
    case 0:
      return 
      break;
      
  }
}