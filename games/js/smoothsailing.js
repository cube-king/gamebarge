const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const shipHeight = 100;
const shipWidth = 100;
let shipX = (canvas.width - shipWidth) / 2;
let shipY = canvas.height - shipHeight;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
const image = document.getElementById("source");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function updateDblCounter() {
    document.getElementById("dblcounter").textContent = "Doubloons: "+ localStorage.getItem("score")
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
  ctx.drawImage(image,shipX, shipY, shipWidth, shipHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawship();
  if (rightPressed) {
    shipX += 5;
    if (shipX + shipWidth > canvas.width) {
      shipX = canvas.width - shipWidth;
    }
  } else if (leftPressed) {
    shipX -= 5;
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
}

setInterval(draw, 10);


function updateDblCounter() {
    document.getElementById("dblcounter").textContent = "Doubloons: "+ localStorage.getItem("score")
}

updateDblCounter()