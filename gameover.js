let restartBtn=document.getElementById("restart")
restartBtn.addEventListener("click",(e)=>{
    window.location.href="gamepage.html"
})

const scoreElement = document.getElementById('score-count');
const playerName = document.getElementById('playername');

const playerInfo = JSON.parse(localStorage.getItem('playerInfo'));
const score = JSON.parse(localStorage.getItem('score'));

if (playerInfo) {
  playerName.textContent = `${playerInfo.name}'s `;
  scoreElement.textContent = `${score}`;
}
