window.onload = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/result');
  xhr.addEventListener("load", () => {
    console.log(JSON.parse(xhr.responseText));
    let 
    for (var i = 0; i < 8; i++) {
      //if (removeList.includes(i)) continue;
      
      // Images
      img = 'rest' + (i + 1).toString();
      document.getElementById(img).src = data[i].image_url;
    }
  });
  xhr.send(null);
};