alert("JS 살아있음");
let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = null;
let score = 0;

// 회원가입
function signup() {
  let id = document.getElementById("id").value;
  let pw = document.getElementById("pw").value;

  if (!id || !pw) return alert("입력!");

  if (users[id]) return alert("이미 존재");

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

    document.getElementById("welcome").innerText = id + "님";

    updateUI();
  } else {
    alert("로그인 실패");
  }
}

/* 🔵 코어 클릭 */
function coreClick(e) {
  addScore();
  createWave(e);
}

/* 점수 증가 */
function addScore() {
  if (!currentUser) return;

  score++;

  users[currentUser].score = score;

  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("score").innerText = score;

  // 50 효과
  if (score % 50 === 0) {
    let core = document.getElementById("core");
    core.classList.add("pop");
    setTimeout(() => core.classList.remove("pop"), 300);
  }

  updateUI();
}

/* 🌊 파동 */
function createWave(e) {
  const wave = document.createElement("div");
  wave.className = "wave";

  wave.style.left = e.clientX + "px";
  wave.style.top = e.clientY + "px";

  document.body.appendChild(wave);

  setTimeout(() => wave.remove(), 600);
}

/* UI 업데이트 */
function updateUI() {

  let sorted = Object.entries(users)
    .sort((a,b)=>b[1].score - a[1].score);

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

  // TOP3 효과
  let items = document.querySelectorAll("#ranking div");

  items.forEach((el,i)=>{
    el.classList.remove("top1","top2","top3");

    if(i===0) el.classList.add("top1");
    if(i===1) el.classList.add("top2");
    if(i===2) el.classList.add("top3");
  });

  // 그래프
  let g = "";

  sorted.forEach(u=>{
    g += `<div>${u[0]}</div>
          <div class="bar" style="width:${u[1].score}px"></div>`;
  });

  document.getElementById("graph").innerHTML = g;
}
