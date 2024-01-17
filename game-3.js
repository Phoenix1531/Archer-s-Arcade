// DOM elements
let target = document.getElementById("target");
let arrow = document.getElementById("arrow");
let archer = document.getElementById("archer");
let scoreCount = document.getElementById("score-count");
let arrowCount = document.getElementById("arrow-count");

// Game variables
let score = 0;
let bullseyes = 0;
let noOfArrows = 5;
let isArrowVisible = false;

// Audio for arrow release
let arrowSound = new Audio("./assets/arrow-body-impact-146419.mp3");
arrowCount.textContent = noOfArrows;

// Audio for background music
let bgMusic = new Audio("./assets/bg-music.mp3");

// Play background music and set it to loop
bgMusic.play();
bgMusic.loop = true;

// Function to move the arrow and handle collisions
function arrowMove() {
  let arrowLeft = archer.offsetLeft;
  let arrowTop = archer.offsetTop + archer.clientHeight / 2; // Set arrow height to the center of the archer
  isArrowVisible = true;
  arrow.style.display = "block";

  // Move the arrow at regular intervals
  const arrowMoveInterval = setInterval(function () {
    arrowLeft += 40;
    arrow.style.left = arrowLeft + "px";

    // Update arrow's position
    arrow.style.top = arrowTop + "px";

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
      arrow.style.left = archer.offsetLeft + "px";
      arrow.style.top = arrowTop + "px"; // Reset arrow's height
    }

    // Check if arrow moved out of the window
    if (arrowLeft >= window.innerWidth) {
      arrow.style.display = "none";
      isArrowVisible = false;
      clearInterval(arrowMoveInterval);
      arrow.style.left = archer.offsetLeft + "px";
      arrow.style.top = arrowTop + "px"; // Reset arrow's height
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
    topPosition += direction * 4;

    // Apply the new position to the target
    target.style.top = topPosition + "px";
  }, 10);
}

// Function to move the archer up and down
function moveArcher() {
  let archerPosition = 0;
  let archerDirection = 1;

  // Move the archer at regular intervals
  const archerMoveInterval = setInterval(function () {
    // Check if archer reached the top or bottom of the window
    if (archerPosition >= window.innerHeight - archer.clientHeight) {
      archerPosition = window.innerHeight - archer.clientHeight;
      archerDirection = -1;
    } else if (archerPosition <= 0) {
      archerDirection = 1;
    }
    // Move archer based on direction
    archerPosition += archerDirection * 3;

    // Apply the new position to the archer
    archer.style.bottom = archerPosition + "px";
  }, 10);
}

// Function to handle game over and transition to the next level
function gameOver() {
  const gameOverInterval = setInterval(function () {
    if (noOfArrows === 0) {
      // Save score and bullseyes to local storage
      sessionStorage.setItem("score_3", JSON.stringify(score));
      sessionStorage.setItem("bullseyes_3", JSON.stringify(bullseyes));
      // Redirect to the game over page
      window.location.href = "gameover.html";
      clearInterval(gameOverInterval);
    }
  }, 1800);
}

// Start the game functions
moveTarget();
moveArcher();
gameOver();
