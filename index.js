const font = new FontFaceObserver('Material Symbols Outlined');
font.load().then(() => {
  document.body.classList.add('fonts-loaded');
});


const image = document.getElementById('songImage');
const title = document.getElementById('songTitle');
const audio = document.getElementById('audio');
const prevButton = document.getElementById('prevButton');
const playPauseSpan = document.getElementById('playPauseSpan');
const nextButton = document.getElementById('nextButton');
const progressBar = document.getElementById('progress');
const startTimeDisplay = document.getElementById('startTime');
const endTimeDisplay = document.getElementById('endTime');
const volumeControl = document.getElementById('volumeControl');

let currentSongIndex = 0;
const songs = [
  {
    title: 'Toda Lecha Rebbe',
    src: './songs/Benny_Friedman_-_Toda_Lecha_Rebbe_(Single).mp3',
    image: './images/toda-lecha-rebbe.webp'
  },
  {
    title: 'Yama',
    src: './songs/Benny_Friedman_-_Yama.mp3',
    image: './images/yama.webp'
  },
  {
    title: 'L\'chai_Olamim',
    src: './songs/Matt_Dubb_Feat._Mordchai_Shapiro___Benny_Friedman_-_L\'chai_Olamim_(Single).mp3',
    image: './images/lechai-olamim.webp'
  },
  {
    title: 'Yesh Bi Emunah',
    src: './songs/Mordechai_Shapiro___Shmuel_-_Yesh_Bi_Emunah_(Single).mp3',
    image: './images/yesh-bi-emuna.webp'
  },
  {
    title: 'Ani Yehudi',
    src: './songs/Mordechai_Shapiro_-_Ani_Yehudi_(Single).mp3',
    image: './images/ani-yehudi.webp'
  }
];


audio.addEventListener('loadedmetadata', () => {
  const endTime = formatTime(audio.duration);
  endTimeDisplay.textContent = endTime;
});

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseSpan.textContent = 'pause_circle';
  } else {
    audio.pause();
    playPauseSpan.textContent = 'play_circle';
  }
}

function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  // let's say the current song index is 0 so 0 - 1 + songs.length which is 5 = 4
  // 4 % 5 is 0 with 4 remainder so our current song is 4 in this example
  playSong();
}

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong();
}

function playSong() {
  const newSong = songs[currentSongIndex];
  if (audio.src !== newSong.src) {
    audio.src = newSong.src;
    image.src = newSong.image;
    title.textContent = newSong.title;
    audio.play();
    playPauseSpan.textContent = 'pause_circle';
  }
}

playPauseSpan.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', playPreviousSong);
nextButton.addEventListener('click', playNextSong);
audio.addEventListener('ended', playNextSong);

function updateProgressBar() {
  const progressValue = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progressValue}%`;

  const startTime = formatTime(audio.currentTime);
  startTimeDisplay.textContent = startTime;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function setProgressBar(event) {
  const clickX = event.clientX - progressBar.parentElement.offsetLeft;
  const percentage = (clickX / progressBar.parentElement.clientWidth) * 100;
  const duration = (percentage / 100) * audio.duration;
  audio.currentTime = duration;
}

function setVolume() {
  audio.volume = volumeControl.value;
}

audio.addEventListener('timeupdate', updateProgressBar);
progressBar.parentElement.addEventListener('click', setProgressBar);
volumeControl.addEventListener('input', setVolume);