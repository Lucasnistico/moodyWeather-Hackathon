const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const seekSlider = document.getElementById("seekSlider");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
const volumeSlider = document.getElementById("volumeSlider");

playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "Play";
  }
});

audioPlayer.addEventListener("timeupdate", () => {
  seekSlider.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
});

seekSlider.addEventListener("input", () => {
  audioPlayer.currentTime = (seekSlider.value / 100) * audioPlayer.duration;
});

volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value;
});

audioPlayer.addEventListener("loadedmetadata", () => {
  durationDisplay.textContent = formatTime(audioPlayer.duration);
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${secs}`;
}
