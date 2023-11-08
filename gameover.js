let restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", (e) => {
  window.location.href = "game-1.html";
});

const scoreElement = document.getElementById("score-count");
const playerName = document.getElementById("playername");
const bullseyeElement = document.getElementById("BullseyesCount");

const playerInfo = JSON.parse(localStorage.getItem("playerInfo"));

const score1 = JSON.parse(localStorage.getItem("score_1"));
const score2 = JSON.parse(localStorage.getItem("score_2"));

const bullseye1 = JSON.parse(localStorage.getItem("bullseyes_1"));
const bullseye2 = JSON.parse(localStorage.getItem("bullseyes_2"));

playerName.textContent = `${playerInfo.name}'s `;
scoreElement.textContent = `${score1 + score2}`;
bullseyeElement.textContent = `${bullseye1 + bullseye2}`;
