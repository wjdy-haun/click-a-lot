alert("JS 연결 확인됨");
let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = null;
let score = 0;

// 회원가입
function signup() {
  let id = document.getElementById("id").value;
  let pw = document.getElementById("pw").value;

  if (!id || !pw) return alert("입력!");

  if (users[id]) {
    alert("이미 있는 아이디");
    return;
  }

  users[id] = { pw: pw, score: 0 };

  localStorage.setItem("users", JSON.stringify(users));

  alert("회원가입 완료!");
}

// 로그인
function login() {
  let id = document.getElementById("id").value;
  let pw = document.getElementById("pw").value;

  if (users[id] && users[id].pw === pw) {

    currentUser = id;
    score = users[id].score;

    document.getElementById("auth").style.display = "none";
    document.getElementById("game").style.display = "block";

    document.getElementById("welcome").innerText = id + "님 환영!";

    updateUI();
  } else {
    alert("로그인 실패");
  }
}

// 클릭
function clickBox() {
  if (!currentUser) return;

  score++;

  users[currentUser].score = score;

  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("score").innerText = score;

  // 50단위 애니메이션
  if (score % 50 === 0) {
    let box = document.getElementById("box");
    box.classList.add("pop");

    setTimeout(() => {
      box.classList.remove("pop");
    }, 300);
  }

  updateUI();
}

// UI 업데이트
function updateUI() {

  let sorted = Object.entries(users).sort((a,b)=>b[1].score - a[1].score);

  // 랭킹
  let html = "";
  sorted.forEach((u,i)=>{
    let medal = "";
    if (i===0) medal="🥇";
    if (i===1) medal="🥈";
    if (i===2) medal="🥉";

    html += `<div>${medal} ${u[0]} : ${u[1].score}</div>`;
  });

  document.getElementById("ranking").innerHTML = html;

  // 그래프
  let g = "";
  sorted.forEach(u=>{
    g += `<div>${u[0]}</div>
          <div class="bar" style="width:${u[1].score}px"></div>`;
  });

  document.getElementById("graph").innerHTML = g;
}
function applyTop3Effect() {
  let items = document.querySelectorAll("#ranking div");

  items.forEach((el, index) => {
    el.classList.remove("top1", "top2", "top3");

    if (index === 0) el.classList.add("top1");
    if (index === 1) el.classList.add("top2");
    if (index === 2) el.classList.add("top3");
  });
}
