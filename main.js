document.oncontextmenu = (event) => event.preventDefault();
//создаём переменную,в которой будет сама игра
const game = document.querySelector(".game");
//добавляем горизонтальные линии
function createField(width, height) {
  for (let i = 0; i < height; i++) {
    game.innerHTML += '<div class="line"></div>';
  }
  //создаём переменную с линиями
  const lines = document.querySelectorAll(".line");
  lines.forEach((el) => {
    for (let i = 0; i < width; i++) {
      el.innerHTML += '<div class="closedSquare"></div>';
    }
  });
}

//создаём переменную со всеми бомбами
let squares = document.querySelectorAll(".closedSquare");
//создаём переменную и функцию,которая создаёт
// случайные числа для того,чтобы сделать позицию бомб случайной
let bombNums = []; // new empty array

let n, p;

function SetBombs(bombs, fieldSize) {
  for (let i = 0; i < bombs; i++) {
    do {
      n = Math.floor(Math.random() * fieldSize) + 1;
      p = bombNums.includes(n);
      if (!p) {
        bombNums.push(n);
      }
    } while (p);
  }
}

function HowMany(el) {
  let a = 0;
  bombNums.forEach((elem) => {
    if (elem === el) {
      a += 1;
    }
  });
  return a;
}

function MakeBombs() {
  squares.forEach((el, a) => {
    if (bombNums.includes(a)) {
      el.classList.remove("closedSquare");
      el.classList.add("bomb");
    }
  });
}

//Проверяем, есть ли в определённой позиции бомба
//если да,то возвращает 1,иначе 0
let aroundPos = [];
function GetClassName(pos) {
  aroundPos.push(pos);
  if(squares[pos].innerHTML=='<img src="pixel-flag.png">'){
    FlagCount+=1
  }
  if (squares[pos].className == "bomb") {
    return 1;
  } else {
    return 0;
  }
}
let BombCount = 0;
let FlagCount = 0;
//в зависимости от позиции проверяем все соседние ячейки
function GetNearBombs(el, pos, width, height) {
  if(el.className=="bomb"){
    EndOfGameSettings();
  }
  FlagCount = 0
  BombCount = 0;
  aroundPos = [];
  if (pos == 0) {
    BombCount += GetClassName(pos + 1);
    BombCount += GetClassName(pos + width);
    BombCount += GetClassName(pos + width + 1);
  } else if (pos == width - 1) {
    BombCount += GetClassName(pos - 1);
    BombCount += GetClassName(pos + width - 1);
    BombCount += GetClassName(pos + width);
  } else if (pos == width * height - width) {
    BombCount += GetClassName(pos - width);
    BombCount += GetClassName(pos - width + 1);
    BombCount += GetClassName(pos + 1);
  } else if (pos == width * height - 1) {
    BombCount += GetClassName(pos - width - 1);
    BombCount += GetClassName(pos - width);
    BombCount += GetClassName(pos - 1);
  } else if (pos < width - 1 && pos > 0) {
    BombCount += GetClassName(pos - 1);
    BombCount += GetClassName(pos + 1);
    BombCount += GetClassName(pos + width - 1);
    BombCount += GetClassName(pos + width);
    BombCount += GetClassName(pos + width + 1);
  } else if (pos % width == 0) {
    BombCount += GetClassName(pos - width);
    BombCount += GetClassName(pos - width + 1);
    BombCount += GetClassName(pos + 1);
    BombCount += GetClassName(pos + width);
    BombCount += GetClassName(pos + width + 1);
  } else if (pos < squares.length - 1 && pos > width * height - width) {
    BombCount += GetClassName(pos - width - 1);
    BombCount += GetClassName(pos - width);
    BombCount += GetClassName(pos - width + 1);
    BombCount += GetClassName(pos - 1);
    BombCount += GetClassName(pos + 1);
  } else if (pos % width == width - 1 && pos < squares.length - 1) {
    BombCount += GetClassName(pos - width - 1);
    BombCount += GetClassName(pos - width);
    BombCount += GetClassName(pos - 1);
    BombCount += GetClassName(pos + width - 1);
    BombCount += GetClassName(pos + width);
  } else {
    BombCount += GetClassName(pos - width - 1);
    BombCount += GetClassName(pos - width);
    BombCount += GetClassName(pos - width + 1);
    BombCount += GetClassName(pos - 1);
    BombCount += GetClassName(pos + 1);
    BombCount += GetClassName(pos + width - 1);
    BombCount += GetClassName(pos + width);
    BombCount += GetClassName(pos + width + 1);
  }
  //указываем внутри ячейки количество бомб вокруг
  if(el.innerHTML==""){
  el.innerHTML = BombCount;
  el.style.backgroundColor = "#a9a9a9";
  if(el.innerHTML=="1"){el.style.color = "blue"}
  else if(el.innerHTML=="2"){el.style.color = "green"}
  else if(el.innerHTML=="3"){el.style.color = "red"}
  else if(el.innerHTML=="4"){el.style.color = "darkblue"}
  else if(el.innerHTML=="5"){el.style.color = "brown"}
  else if(el.innerHTML=="6"){el.style.color = "cyan"}
  else if(el.innerHTML=="7"){el.style.color = "black"}
  else if(el.innerHTML=="8"){el.style.color = "grey"}
  if (el.innerHTML === "0") {
    el.innerHTML = " "
    OpenNearby(aroundPos, width, height);
  }}
  else{
    if(FlagCount==+el.innerHTML){
      OpenNearby(aroundPos, width, height)
    }
  }
}
function setFlag(el) {
  if (el.innerHTML == "") {
    minesLeft -=1;
    minesTxt.innerHTML = minesLeft
    el.innerHTML = '<img src="pixel-flag.png">';
  }
  else if (el.innerHTML==='<img src="pixel-flag.png">'){
    minesLeft+=1;
    el.innerHTML = "";
    minesTxt.innerHTML = minesLeft
  } 
}
function OpenNearby(nearpos, width, height) {
  nearpos.forEach((el) => {
    if (squares[el].innerHTML === "") {
      GetNearBombs(squares[el], el, width, height);
    }
  });
}
function EndOfGameSettings() {
  restartBtn.innerHTML = btnReact[2]
  createToast("error")
  squares.forEach((el) => {
    el.replaceWith(el.cloneNode(true));
  });
  alert("Вы нарвались на мину.");
}
//показываем число внутри ячейки,если по неё кликнули
function SetGameSettings(width, height) {
  squares.forEach((el, a) => {
    if (el.className != "bomb") {
      el.addEventListener("click", (event) =>
        GetNearBombs(el, a, width, height)
      );
    } else {
      el.addEventListener("click", (event) => EndOfGameSettings());
    }
    el.oncontextmenu = (event) => {
      setFlag(el);
    };
  });
}
let minesLeft = 0;
let minesTxt = document.querySelector(".flagsRemain")
function StartGame() {
  const Fields = document.querySelectorAll(".inputField");
  const widthOfField = +Fields[0].value;
  const heightOfField = +Fields[1].value;
  const amountOfBombs = +Fields[2].value;
  minesLeft = amountOfBombs
  minesTxt.innerHTML = minesLeft
  if (widthOfField < 8 && heightOfField < 8) {
    alert("Enter bigger field size");
  } else if (widthOfField * heightOfField <= amountOfBombs) {
    alert("So many bombs for this game field");
  } else {
    document.querySelector(".startMenu").style.display = "none";
    document.querySelector(".skin").style.display = "flex";

    createField(widthOfField, heightOfField);
    squares = document.querySelectorAll(".closedSquare");
    SetBombs(amountOfBombs, widthOfField * heightOfField);
    MakeBombs();
    SetGameSettings(widthOfField, heightOfField);
    CheckWin(amountOfBombs);
  }
}
const startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", StartGame);
const restartBtn = document.querySelector(".restartBtn");
restartBtn.addEventListener("click", (event) => {
  location.reload();
});
let winchecker = 0;
const timer = document.querySelector(".timer")
let time = 0;
let btnReact = ["😀","😐","😭"]
restartBtn.innerHTML = btnReact[1];
function CheckWin(bombs) {
  winchecker = 0;
  time+=1;
  timer.innerHTML=time;
  squares.forEach((el, a) => {
    if(el.className==="closedSquare"){
      if(el.innerHTML!==""){
        winchecker+=1
      }
    }
  });
  if (winchecker === squares.length-bombNums.length) {
    restartBtn.innerHTML = btnReact[0];
    createToast("success")
  } else {
    setTimeout((event) => CheckWin(bombs), 1000);
  }
}
const notifications = document.querySelector(".notifications")
const toastDetails = {
  timer: 5000,
  success: {
    icon: "fa-circle-check",
    text: "Hello World: This is a success toast.",
  },
  error: {
    icon: "fa-circle-xmark",
    text: "Hello World: This is an error toast.",
  },
  warning: {
    icon: "fa-triangle-exclamation",
    text: "Hello World: This is a warning toast.",
  },
  info: {
    icon: "fa-circle-info",
    text: "Hello World: This is an information toast.",
  },
  random: {
    icon: "fa-solid fa-star",
    text: "Hello World: This is a random toast.",
  },
}

const removeToast = (toast) => {
  toast.classList.add("hide")
  if (toast.timeoutId) clearTimeout(toast.timeoutId)
  setTimeout(() => toast.remove(), 500)
}

const createToast = (id) => {
  const { icon, text } = toastDetails[id]
  const toast = document.createElement("li")
  toast.className = `toast ${id}`
  toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`
  notifications.appendChild(toast) 
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer)
}