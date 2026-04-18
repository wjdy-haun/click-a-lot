let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = null;
let score = 0;

// 회원가입
function signup() {
  let id = document.getElementById("id").value;
  let pw = document.getElementById("pw").value;

  if (!id || !pw) return alert("입력!");

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

// 클릭
function clickBox() {
  score++;

  users[currentUser].score = score;

  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("score").innerText = score;

  // 50 단위 애니메이션
  if (score % 50 === 0) {
    let box = document.getElementById("box");
    box.classList.add("pop");

    setTimeout(() => {
      box.classList.remove("pop");
    }, 300);
  }

  updateUI();
}

// 랭킹 + 그래프
function updateUI() {

  let sorted = Object.entries(users).sort((a,b)=>b[1].score - a[1].score);

  // 랭킹
  let html = "";
  sorted.forEach((u,i)=>{
    html += (i+1)+"위 "+u[0]+" : "+u[1].score+"<br>";
  });

  document.getElementById("ranking").innerHTML = html;

  // 그래프
  let graph = "";

  sorted.forEach(u=>{
    graph += `<div>${u[0]}</div>
              <div class="bar" style="width:${u[1].score}px"></div>`;
  });

  document.getElementById("graph").innerHTML = graph;
}
