let instructionsBtn=document.getElementById("instruction")
instructionsBtn.addEventListener("click",(e)=>{
    window.location.href="./instructions.html"
})
const playerInfo = { name: '', nickname: '' };
const nameInput = document.getElementById('name');
const nicknameInput = document.getElementById('nickname');
const startButton = document.getElementById('start');

startButton.addEventListener('click', () => {
  if (!nameInput.value || !nicknameInput.value) {
    alert('Please fill in both your name and nickname before starting the game.');
    return;
  }

  playerInfo.name = nameInput.value;
  playerInfo.nickname = nicknameInput.value;
  localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
  window.location.href = 'gamepage.html';
});

