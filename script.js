console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let volumeControl = document.getElementById('volumeControl');
let muteToggle = document.getElementById('muteToggle');
let shuffleToggle = document.getElementById('shuffleToggle');
let repeatToggle = document.getElementById('repeatToggle');
let bannerCover = document.getElementById('bannerCover');

let songs = [
    {songName: "Let Me Down Slowly", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/9.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji Heroes Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Raabta", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
];

let shuffleMode = false;
let repeatMode = false;
let originalSongOrder = [...songs];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

function pulseSongInfo() {
    const playingWrapper = document.querySelector('.playing-wrapper');
    playingWrapper.classList.remove('playing');
    void playingWrapper.offsetWidth;
    playingWrapper.classList.add('playing');
}

function updateBannerCover() {
    bannerCover.src = songs[songIndex].coverPath;
}

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        pulseSongInfo();
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
        updateBannerCover();
    } else {
        audioElement.pause();
        document.querySelector('.playing-wrapper').classList.remove('playing');
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        document.getElementById(songIndex).classList.remove('fa-circle-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    document.getElementById("currentTime").innerText = formatTime(audioElement.currentTime);
    if (!isNaN(audioElement.duration)) {
        document.getElementById("totalDuration").innerText = formatTime(audioElement.duration);
    }
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        pulseSongInfo();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        updateBannerCover();
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (shuffleMode) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        songIndex = (songIndex >= songs.length - 1 && !repeatMode) ? 0 : songIndex + 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    pulseSongInfo();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    updateBannerCover();
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0 && !repeatMode) ? songs.length - 1 : songIndex - 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    pulseSongInfo();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    updateBannerCover();
});

audioElement.addEventListener('ended', () => {
    if (repeatMode) {
        audioElement.currentTime = 0;
        audioElement.play();
    } else {
        if (shuffleMode) {
            songIndex = Math.floor(Math.random() * songs.length);
        } else {
            songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
        }
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        pulseSongInfo();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        makeAllPlays();
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
        updateBannerCover();
    }
});

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = `0${sec}`;
    if (min < 10) min = `0${min}`;
    return `${min}:${sec}`;
}

audioElement.volume = 0.5;

volumeControl.addEventListener('input', () => {
    audioElement.volume = volumeControl.value / 100;
    muteToggle.classList.remove('fa-volume-xmark');
    muteToggle.classList.add('fa-volume-high');
});

let previousVolume = 0.5;
muteToggle.addEventListener('click', () => {
    if (audioElement.volume > 0) {
        previousVolume = audioElement.volume;
        audioElement.volume = 0;
        volumeControl.value = 0;
        muteToggle.classList.remove('fa-volume-high');
        muteToggle.classList.add('fa-volume-xmark');
    } else {
        audioElement.volume = previousVolume;
        volumeControl.value = previousVolume * 100;
        muteToggle.classList.remove('fa-volume-xmark');
        muteToggle.classList.add('fa-volume-high');
    }
});

shuffleToggle.addEventListener('click', () => {
    shuffleMode = !shuffleMode;
    shuffleToggle.classList.toggle('active-mode');
    if (shuffleMode) {
        songs = [...originalSongOrder].sort(() => Math.random() - 0.5);
    } else {
        songs = [...originalSongOrder];
        songIndex = songs.findIndex(song => song.songName === masterSongName.innerText);
    }
});

repeatToggle.addEventListener('click', () => {
    repeatMode = !repeatMode;
    repeatToggle.classList.toggle('active-mode');
});

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.code === 'Space') {
        masterPlay.click();
    } else if (e.code === 'ArrowRight') {
        document.getElementById('next').click();
    } else if (e.code === 'ArrowLeft') {
        document.getElementById('previous').click();
    }
});