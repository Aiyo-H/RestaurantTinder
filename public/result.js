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
  });
  xhr.send(null);
};