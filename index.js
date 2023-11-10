let body=document.querySelector("body")
body.addEventListener("click",(e)=>{
    window.location.href="./startpage.html"
})
let bgMusic = new Audio("./assets/bg-music.mp3");
const bgMusicPlay=setInterval(function(){
    bgMusic.play()
},240000)
