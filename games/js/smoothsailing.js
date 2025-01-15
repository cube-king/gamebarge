const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const shipHeight = 100;
const shipWidth = 100;
let score = 0;
let shipX = (canvas.width - shipWidth) / 2;
let shipY = canvas.height - shipHeight - 500;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let randomX = getRandomInt(80, 1840);
let end = false;
const ship = document.getElementById("source");
const obstacleimg = document.getElementById("obstacle");
const decoImg = document.getElementById("seaweed")
const obstacleWidth = 80;
const obstacleHeight = 80;
const numObstacles = 7; 
const numDecos = 14; 
let obstacles = []
let decos = []

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function updateDblCounter() {
    document.getElementById("dblcounter").textContent = "Doubloons: "+ localStorage.getItem("score")
}

function initObstacles() {
  obstacles = [];
  for (let i = 0; i < numObstacles; i++) {
    obstacles.push({
      x: getRandomInt(80, 1840),
      y: 1160 + getRandomInt(0,300),
      width: obstacleWidth,
      height: obstacleHeight
    });
  }
}

function initDecos() {
  decos = [];
  for (let i = 0; i < numDecos; i++) {
    decos.push({
      x: getRandomInt(80, 1840),
      y: 1160 + getRandomInt(0,1000),
      width: 64,
      height: 64
    });
  }
}

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  }
}

function drawship() {
  ctx.beginPath();
  ctx.drawImage(ship,shipX, shipY, shipWidth, shipHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function isTouching(rect1, rect2) {
  return !(
    rect1.x + rect1.width < rect2.x ||
    rect2.x + rect2.width < rect1.x || 
    rect1.y + rect1.height < rect2.y || 
    rect2.y + rect2.height < rect1.y 
  );
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function drawObstacles() {
  obstacles.forEach((obstacle, index) => {
    ctx.beginPath();
    ctx.drawImage(obstacleimg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    ctx.fill();
    ctx.closePath();

    obstacle.y -= score*0.01 + 6;

    if (obstacle.y < -80) {
      obstacle.y = 1160 + getRandomInt(0,200);
      obstacle.x = getRandomInt(80, canvas.width - obstacle.width);
    }

    const shipRect = {
      x: shipX,
      y: shipY,
      width: shipWidth,
      height: shipHeight
    };

    if (isTouching(shipRect, obstacle)) {
      console.log("collision with obs", index);
      endGame();   
    }
  });
}


function drawDecos() {
  decos.forEach((deco, index) => {
    ctx.beginPath();
    ctx.globalAlpha = 0.5
    ctx.drawImage(decoImg, deco.x, deco.y, deco.width, deco.height);
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1


    deco.y -= score*0.01 + 6;

    if (deco.y < -80) {
      deco.y = 1160 + getRandomInt(0,200);
      deco.x = getRandomInt(80, canvas.width - deco.width);
    }
  });
}

function draw() {
  if (end == false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawship();
    drawObstacles();
    drawDecos();
    if (rightPressed) {
      shipX += 7;
      if (shipX + shipWidth > canvas.width) {
        shipX = canvas.width - shipWidth;
      }
    } else if (leftPressed) {
      shipX -= 7;
      if (shipX < 0) {
        shipX = 0;
      }
    } else if (upPressed) {
      shipY -= 3 
      if (shipY < 0) {
          shipY = 0;
      }
    } else if (downPressed) {
      shipY += 2
      if (shipY + shipHeight > canvas.height) {
          shipY = canvas.height - shipHeight;
      }
    }
    score += 0.2  
  }
  else {
    clearInterval(refreshIntervalId);
    return;
  }
}

function startGame() {
  shipY = canvas.height / 2 - shipHeight
  shipX = canvas.width / 2 - shipWidth / 2
  end = false;
  initObstacles();
  initDecos();
  refreshIntervalId = setInterval(draw, 10);
}

function endGame() {
  end = true;
  scoreToAddTo = Number(localStorage.getItem("score"));
  scoreToAddTo += Math.round(score);
  localStorage.setItem("score", scoreToAddTo);
  updateDblCounter()
  score = 0
  scoreToAddTo = 0
  document.getElementById('startbutton').disabled = false;
  document.getElementById('startButton').classList.remove("hidden")
  document.getElementById('startButton').classList.add("visible");
}

function remButton() {
  document.getElementById('startbutton').disabled = true;
  document.getElementById('startButton').classList.remove("visible")
  document.getElementById('startButton').classList.add("hidden")
}

function updateDblCounter() {
    document.getElementById("dblcounter").textContent = "Doubloons: "+ localStorage.getItem("score")
}

document.getElementById('startbutton').addEventListener("click", startGame)
document.getElementById('startbutton').addEventListener("click", remButton)

updateDblCounter()

document.getElementById('startButton').classList.add("visible");