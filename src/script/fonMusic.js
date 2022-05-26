import { initPlayer } from './player';
import { musicPlay, audio, video } from './sharedConstants';
import { togglePlay } from './player';
import { isVideoPlay } from './player';
import { removeIframe, isIframeStart } from './video-iframe';

function fonMusic() {
    const playNext = document.querySelector('.music-right');
    const playPrev = document.querySelector('.music-left');
    let date = new Date();
    const currentDate = document.querySelector('.current-date');
    const options = {month: 'long', day: 'numeric', year: 'numeric', weekday: 'long',};
    const newDate = date.toLocaleDateString('en-BR', options);
    currentDate.textContent = newDate;

    playNext.addEventListener('click', nextMusic);
    playPrev.addEventListener('click', prevMusic);
    musicPlay.addEventListener('click', musicStart);
}

let isAudioPlay = false;

let pause = new Image();
pause.src = './assets/svg/music-svg/pause.svg';

let play = new Image();
play.src = './assets/svg/music-svg/play.svg';

let musicArray = ['1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3', '6.mp3', '7.mp3', '8.mp3', '9.mp3'];
let index = 0;

audio.volume = 0.04;

function nextMusic() {
    if (index < musicArray.length - 1) {
        index++;
        audio.src = `./assets/music/${musicArray[index]}`;
    } else {
        index = 0;
        audio.src = `./assets/music/${musicArray[index]}`;
    }
    musicStart();
}

function prevMusic() {
    if (index > 0) {
        index--;
        audio.src = `./assets/music/${musicArray[index]}`;
    } else {
        index = musicArray.length - 1;
        audio.src = `./assets/music/${musicArray[index]}`;
    }
    musicStart();
}
function audioTogglePause() {
    audio.pause();
    musicPlay.innerHTML = '';
    musicPlay.append(play);
}

function audioTogglePlay() {
    audio.play();
    musicPlay.innerHTML = '';
    musicPlay.appendChild(pause);
}

function musicStart() {
    if (isVideoPlay) {
        togglePlay();
    }

    if (isIframeStart) {
        removeIframe();
    }

    if (audio.paused) {
        audioTogglePlay();
        isAudioPlay = true;
    } else {
        audioTogglePause();
        isAudioPlay = false;
    }
}

export {
    fonMusic,
    audioTogglePause,
    musicStart,
    isAudioPlay,
}
