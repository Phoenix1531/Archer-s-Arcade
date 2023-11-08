let target = document.getElementById("target");
let arrow = document.getElementById("arrow");
let scoreCount = document.getElementById("score-count");
let arrowCount = document.getElementById("arrow-count");

let score = 0;
let bullseyes=0;
let noOfArrows = 3;
let isArrowVisible = false;

let arrowSound=new Audio("./assets/arrow-body-impact-146419.mp3")
arrowCount.textContent=noOfArrows

function arrowMove() {
  let arrowLeft = 30;
  isArrowVisible = true;
  arrow.style.display = "block";

  const arrowMoveInterval = setInterval(function () {
    arrowLeft += 40;
    arrow.style.left = arrowLeft + "px";

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
    }
    if (arrowLeft >= window.innerWidth) {
      arrow.style.display = "none";
      isArrowVisible = false;
      clearInterval(arrowMoveInterval);
    }
  }, 10);
}

function handleSpacebar(event) {
  if (event.keyCode === 32 && noOfArrows > 0 && !isArrowVisible) {
    arrowMove();
    noOfArrows--;
    arrowCount.textContent = noOfArrows;
    arrowSound.play()
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
    topPosition += direction * 2;

    target.style.top = topPosition + "px";
  }, 10);
}

function gameOver() {
  const gameOverInterval = setInterval(function () {
    if (noOfArrows === 0) {
      localStorage.setItem("score_1", JSON.stringify(score));
      localStorage.setItem("bullseyes1", JSON.stringify(bullseyes));
      window.location.href = "game-2.html";
      clearInterval(gameOverInterval);
    }
  }, 1800);
}
console.log(window)

gameOver();
moveTarget();
