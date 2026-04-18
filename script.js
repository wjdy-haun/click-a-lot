let username = "";
let score = 0;

let data = JSON.parse(localStorage.getItem("rank")) || {};

// 로그인
function login() {
  username = document.getElementById("username").value;

  if (!username) {
    alert("이름 입력!");
    return;
  }

  document.getElementById("login").style.display = "none";
  document.getElementById("game").style.display = "block";

  document.getElementById("welcome").innerText = username + "님 환영!";
}

// 점수 증가
function addScore() {
  score++;

  document.getElementById("score").innerText = score;

  data[username] = score;

  localStorage.setItem("rank", JSON.stringify(data));

  updateRank();
}

// 랭킹 업데이트
function updateRank() {
  let sorted = Object.entries(data).sort((a,b)=>b[1]-a[1]);

  let html = "";

  sorted.forEach((item, index) => {
    let medal = "";

    if (index === 0) medal = "🥇";
    if (index === 1) medal = "🥈";
    if (index === 2) medal = "🥉";

    html += `<div>${medal} ${item[0]} : ${item[1]}</div>`;
  });

  document.getElementById("ranking").innerHTML = html;
}
