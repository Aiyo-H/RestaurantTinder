window.onload = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/info');
  xhr.addEventListener("load", () => {
    let postcard = JSON.parse(xhr.responseText);
    console.log(postcard);
  });
  xhr.send(null);
};
