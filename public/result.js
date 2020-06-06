window.onload = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/result');
  xhr.addEventListener("load", () => {
    console.log(JSON.parse(xhr.responseText));
    let result = JSON.parse(xhr.responseText);
    let rests, votes;
    for (var i = 0; i < 8; i++) {
      
      // Rests
      rests = 'result' + (i + 1).toString();
      document.getElementById(rests).innerHTML = result.rests[i];
      
      // Votes
      votes = 'vote' + (i + 1).toString();
      document.getElementById(votes).innerHTML = result.votes[i].toString();
    }
    document.getElementById("rest1").src = "https://s3-media3.fl.yelpcdn.com/bphoto/oHN-1eHRJAz3eoFaCOB5WA/o.jpg";
    document.getElementById("restname1").innerHTML = "Temple Coffee Roasters";
    document.getElementById("dollar1").innerHTML = "$";
    document.getElementById("rating1").src = "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F6.png?v=1591398893926";
    document.getElementById("location1").innerHTML = "239 G St, Davis, CA 95616";
    document.getElementById("review1").innerHTML = "445 reviews";
    document.getElementById("choose1").innerHTML = "5 chosen";
  });
  xhr.send(null);
};



/*
b.addEventListener("mouseover", () => {
    b.style.border = "1px dashed black";
    document.querySelector(".postcard").style.backgroundColor = colors[i];
  });
b.addEventListener("mouseout", () => {
    if (b != currentColor) {
      b.style.border = "none";
      document.querySelector(".postcard").style.backgroundColor =
        currentColor.style.backgroundColor;
    } else {
      b.style.border = "1px solid black";
    }
});
*/