let catImage = document.getElementById("cat-image");
let catGif = document.getElementById("cat-gif");

let restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", function () {
  // Reset the game
});

let feedButton = document.getElementById("feed-button");
feedButton.addEventListener("click", function () {
  // Feed the cat
});

let playButton = document.getElementById("play-button");
playButton.addEventListener("click", function () {
  // Play with the cat
});

let sleepButton = document.getElementById("sleep-button");
sleepButton.addEventListener("click", function () {
  // Put the cat to sleep
});

let pauseButton = document.getElementById("pause-button");
pauseButton.addEventListener("click", function () {
  // Pause the game
});

catGif.src = "images/cat/still.gif";
catGif.style.maxHeight = "100%";
