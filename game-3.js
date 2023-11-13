let target = document.getElementById("target");
let arrow = document.getElementById("arrow");
let archer = document.getElementById("archer");
let scoreCount = document.getElementById("score-count");
let arrowCount = document.getElementById("arrow-count");

let score = 0;
let bullseyes = 0;
let noOfArrows = 5;
let isArrowVisible = false;

let arrowSound = new Audio("./assets/arrow-body-impact-146419.mp3");
arrowCount.textContent = noOfArrows;

let bgMusic = new Audio("./assets/bg-music.mp3");

bgMusic.play();
bgMusic.loop=true

function arrowMove() {
  let arrowLeft = archer.offsetLeft;
  let arrowTop = archer.offsetTop + archer.clientHeight / 2; // Set arrow height to the center of the archer
  isArrowVisible = true;
  arrow.style.display = "block";

  const arrowMoveInterval = setInterval(function () {
    arrowLeft += 40;
    arrow.style.left = arrowLeft + "px";
    
    // Update arrow's position
    arrow.style.top = arrowTop + "px";

    const arrowRect = arrow.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    if (
      arrowRect.right >= targetRect.left &&
      arrowRect.left <= targetRect.right &&
      arrowRect.bottom >= targetRect.top &&
      arrowRect.top <= targetRect.bottom
    ) {
      score++;
      scoreCount.textContent = score;

      const bullseyeRect = document.getElementById("bullseye-box").getBoundingClientRect();
      if (
        arrowRect.right >= bullseyeRect.left &&
        arrowRect.left <= bullseyeRect.right &&
        arrowRect.bottom >= bullseyeRect.top &&
        arrowRect.top <= bullseyeRect.bottom
      ) {
        bullseyes++;
        alert("Bullseye!");
      }

      arrow.style.display = "none";
      isArrowVisible = false;
      clearInterval(arrowMoveInterval);
      arrow.style.left = archer.offsetLeft + "px";
      arrow.style.top = arrowTop + "px"; // Reset arrow's height
    }

    if (arrowLeft >= window.innerWidth) {
      arrow.style.display = "none";
      isArrowVisible = false;
      clearInterval(arrowMoveInterval);
      arrow.style.left = archer.offsetLeft + "px";
      arrow.style.top = arrowTop + "px"; // Reset arrow's height
    }
  }, 10);
}

function handleSpacebar(event) {
  if (event.keyCode === 32 && noOfArrows > 0 && !isArrowVisible) {
    arrowMove();
    noOfArrows--;
    arrowCount.textContent = noOfArrows;
    arrowSound.play();
  }
}
document.addEventListener("keydown", handleSpacebar);

function moveTarget() {
  let topPosition = 0;
  let direction = 1;

  const targetMoveInterval = setInterval(function () {
    if (topPosition >= window.innerHeight - target.clientHeight) {
      topPosition = window.innerHeight - target.clientHeight;
      direction = -1;
    } else if (topPosition <= 0) {
      direction = 1;
    }
    topPosition += direction * 4;

    target.style.top = topPosition + "px";
  }, 10);
}

function moveArcher() {
  let archerPosition = 0;
  let archerDirection = 1;

  const archerMoveInterval = setInterval(function () {
    if (archerPosition >= window.innerHeight - archer.clientHeight) {
      archerPosition = window.innerHeight - archer.clientHeight;
      archerDirection = -1;
    } else if (archerPosition <= 0) {
      archerDirection = 1;
    }
    archerPosition += archerDirection * 3;
    archer.style.bottom = archerPosition + "px";
  }, 10);
}

function gameOver() {
  const gameOverInterval = setInterval(function () {
    if (noOfArrows === 0) {
      localStorage.setItem("score-3", JSON.stringify(score));
      localStorage.setItem("bullseyes-3", JSON.stringify(bullseyes));
      window.location.href = "gameover.html";
      clearInterval(gameOverInterval);
    }
  }, 1800);
}

moveTarget();
moveArcher();
gameOver();
