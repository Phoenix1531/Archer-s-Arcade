// DOM elements
let target = document.getElementById("target");
let arrow = document.getElementById("arrow");
let scoreCount = document.getElementById("score-count");
let arrowCount = document.getElementById("arrow-count");

// Game variables
let score = 0;
let bullseyes = 0;
let noOfArrows = 3;
let isArrowVisible = false;

// Audio for arrow release
let arrowSound = new Audio("./assets/arrow-body-impact-146419.mp3");
arrowCount.textContent = noOfArrows;

// Function to move the arrow and handle collisions
function arrowMove() {
  let arrowLeft = 30;
  isArrowVisible = true;
  arrow.style.display = "block";

  // Move the arrow at regular intervals
  const arrowMoveInterval = setInterval(function () {
    arrowLeft += 40;
    arrow.style.left = arrowLeft + "px";

    const arrowRect = arrow.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // Check for collision with the target
    if (
      arrowRect.right >= targetRect.left &&
      arrowRect.left <= targetRect.right &&
      arrowRect.bottom >= targetRect.top &&
      arrowRect.top <= targetRect.bottom
    ) {
      // Update score and display
      score++;
      scoreCount.textContent = score;

      // Check for bullseye and update count
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

      // Hide arrow and stop interval
      arrow.style.display = "none";
      isArrowVisible = false;
      clearInterval(arrowMoveInterval);
    }

    // Check if arrow moved out of the window
    if (arrowLeft >= window.innerWidth) {
      arrow.style.display = "none";
      isArrowVisible = false;
      clearInterval(arrowMoveInterval);
    }
  }, 10);
}

// Function to handle spacebar press and arrow release
function handleSpacebar(event) {
  if (event.keyCode === 32 && noOfArrows > 0 && !isArrowVisible) {
    // Trigger arrow release
    arrowMove();
    // Update arrow count
    noOfArrows--;
    arrowCount.textContent = noOfArrows;
    // Play arrow release sound
    arrowSound.play();
  }
}

// Event listener for spacebar press
document.addEventListener("keydown", handleSpacebar);

// Function to move the target up and down
function moveTarget() {
  let topPosition = 0;
  let direction = 1;

  // Move the target at regular intervals
  const targetMoveInterval = setInterval(function () {
    // Check if target reached the top or bottom of the window
    if (topPosition >= window.innerHeight - target.clientHeight) {
      topPosition = window.innerHeight - target.clientHeight;
      direction = -1;
    } else if (topPosition <= 0) {
      direction = 1;
    }
    // Move target based on direction
    topPosition += direction * 2;

    // Apply the new position to the target
    target.style.top = topPosition + "px";
  }, 10);
}

// Function to handle game over and transition to the next level
function gameOver() {
  const gameOverInterval = setInterval(function () {
    if (noOfArrows === 0) {
      // Save score and bullseyes to local storage
      sessionStorage.setItem("score_1", JSON.stringify(score));
      sessionStorage.setItem("bullseyes1", JSON.stringify(bullseyes));
      // Redirect to the next level
      window.location.href = "game-2.html";
      clearInterval(gameOverInterval);
    }
  }, 1800);
}

// Start the game functions
gameOver();
moveTarget();

// Audio for background music
let bgMusic = new Audio("./assets/bg-music.mp3");

// Play background music and set it to loop
bgMusic.play();
bgMusic.loop = true;  