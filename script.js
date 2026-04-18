let username = "";
let score = 0;
let data = JSON.parse(localStorage.getItem("rank")) || {};

function startGame() {
  username = document.getElementById("username").value;

  if (!username) {
    alert("이름 입력!");
    return;
  }

  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";

  document.getElementById("welcome").innerText = username + "님 환영!";
  updateRank();
}

function addScore() {
  score++;

  document.getElementById("score").innerText = score;

  data[username] = score;

  localStorage.setItem("rank", JSON.stringify(data));

  updateRank();
}

function updateRank() {
  let sorted = Object.entries(data).sort((a,b)=>b[1]-a[1]);

  let html = "";

  sorted.forEach((item, index) => {
    html += (index+1) + "위 " + item[0] + " : " + item[1] + "<br>";
  });

  document.getElementById("ranking").innerHTML = html;
}
