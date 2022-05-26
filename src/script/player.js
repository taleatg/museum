import {isTicketOverlayOpen} from './overlay';
import {musicPlay, audio, video} from './sharedConstants';
import { musicStart, isAudioPlay, audioTogglePause } from './fonMusic';

let bigPlay;
let progress;
let toggle;
let volume;
let volumeBar;
let fullscreen;
let wrapper;
let slides;
let slider;
let dots;
let speedVideo;
let rewindLeft;
let rewindRight;

function initPlayer() {
    const player = document.querySelector('.video');
    wrapper = document.querySelector('.video-fullscreen');
    bigPlay = document.querySelector('.video-buttons__bigplay');
    progress = document.querySelector('.progress');
    toggle = document.querySelector('.toggle');
    volume = document.querySelector('.volume');
    volumeBar = document.querySelector('.volume-bar');
    fullscreen = document.querySelector('.fullscreen');
    slides = document.querySelectorAll('.slide');
    slider = document.querySelector('.slider');
    dots = document.querySelectorAll('.dot');
    const oneSlide = document.querySelector('.slide');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    speedVideo = document.querySelector('.speed-video');
    rewindLeft = document.querySelector('.rewind-left');
    rewindRight = document.querySelector('.rewind-right');
    const videos = document.querySelectorAll('.video-iframe');

    progressStart();

    window.onkeydown = function (e) {
        return !(e.keyCode == 32 && (e.target.type != 'text' && e.target.type != 'textarea'));
    };

    dots.forEach((item, indexDot) => {
        item.addEventListener('click', () => {
            let currentIndex = index;
            index = indexDot;
            currentSlide(index);
            if (currentIndex < index) {
                afterFewSlides(index, currentIndex);
            } else {
                beforeFewSlides(index, currentIndex);
            }
        })
    })

    videos.forEach((item) => {
        item.addEventListener('click', videoPause);
    })

    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('timeupdate', updateProgress);
    bigPlay.addEventListener('click', togglePlay);

    progress.addEventListener('change', changeProgress);
    progress.addEventListener('input', updateValueProgress);

    volume.addEventListener('click', volumeOnOff);
    volumeBar.addEventListener('change', rangeUpdateVolume);
    volumeBar.addEventListener('input', updateVolumeProgress);

    toggle.addEventListener('click', togglePlay);
    document.addEventListener('keydown', keyDown);
    fullscreen.addEventListener('click', toggleFullscreen);

    arrowLeft.addEventListener('click', offsetLeft);
    arrowRight.addEventListener('click', offsetRight);
}

video.volume = 0.5;

let isVideoPlay = false;
let allVideos = ['video0.mp4', 'video1.mp4', 'video2.mp4', 'video3.mp4', 'video4.mp4'];
let allPosters = ['poster0.jpg', 'poster1.jpg', 'poster2.jpg', 'poster3.jpg', 'poster4.jpg'];

let num = 0;
let offset = 0;
let index = 0;

function createImage(src = '', classList = []) {
    const image = new Image();
    src ? image.src = src : null;
    classList.length ? image.classList.add(...classList) : null;
    return image;
}

const unmute = createImage('./assets/svg/volum.svg', ['volumeImg']);
const mute = createImage('./assets/svg/mute.svg', ['volumeImg']);
const bigPlayButton = createImage('./assets/svg/button_play.svg', ['bigPlay']);
const play = createImage('./assets/svg/play.svg', ['toggleImg']);
const pause = createImage('./assets/svg/pause.svg', ['toggleImg']);
const full = createImage('', ['fullscreenImg']);

function videoTogglePlay() {
    video.play();
    bigPlay.innerHTML = '';
    isVideoPlay = true;
}

function videoTogglePause() {
    video.pause();
    bigPlay.innerHTML = '';
    bigPlay.appendChild(bigPlayButton);
    isVideoPlay = false;
}

function togglePlay() {
    if (video.paused) {
        videoTogglePlay();
        audioTogglePause();
    } else {
        videoTogglePause();

        if (isAudioPlay) {
            musicStart();
        }
    }
}

function updateButton() {
    toggle.innerHTML = '';
    toggle.appendChild(video.paused ? play : pause);
}

function updateVolumeProgress() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value * 100}%, #C4C4C4 ${value * 100}%, #C4C4C4 100%)`;
}

function muteVideo() {
    video.muted = true;
    volume.innerHTML = '';
    volume.appendChild(mute);
}

function unMuteVideo() {
    video.muted = false;
    volume.innerHTML = '';
    volume.appendChild(unmute);
}

function rangeUpdateVolume() {
    video.volume = volumeBar.value;
    volumeBar.value === '0' ? muteVideo() : unMuteVideo();
}

function volumeOnOff() {
    let volumeValue = video.volume;
    if ((!video.muted) || (volumeValue === 0)) {
        muteVideo();
        volumeBar.value = 0;
        volumeBar.style.background = `linear-gradient(to right, #C4C4C4 0%, #C4C4C4 100%)`;
    } else {
        unMuteVideo();
        volumeBar.value = volumeValue;
        volumeBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volumeValue * 100}%, #C4C4C4 ${volumeValue * 100}%, #C4C4C4 100%)`;
    }
}

function volumeArrowUp() {
    while ((video.volume >= 0) && (video.volume <= 1)) {
        video.volume += 0.1;
        volumeBar.value = video.volume;
        unMuteVideo();
        break;
    }
}

function volumeArrowDown() {
    while ((video.volume >= 0) && (video.volume <= 1)) {
        video.volume = Math.floor((video.volume - 0.1) * 10) / 10;
        volumeBar.value = video.volume;
        break;
    }
    if (volumeBar.value === '0') {
        volume.innerHTML = '';
        volume.appendChild(mute);
    }
}

function progressStart() {
    progress.value = 0;
    progress.style.background = '#C4C4C4';
}

function updateValueProgress() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100 || 0;
    progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progress.value}%, #C4C4C4 ${progress.value}%, #C4C4C4 100%)`;

    if (progress.value == 100) {
        bigPlay.innerHTML = '';
        bigPlay.appendChild(bigPlayButton);
        return;
    }
}

function changeProgress(e) {
    video.currentTime = e.target.value * video.duration / 100;
    updateProgress();
}

function toggleFullscreen() {
    fullscreen.blur();
    if (!document.fullscreenElement) {
        full.src = './assets/svg/fullscreen_exit.svg'
        fullscreen.innerHTML = '';
        fullscreen.appendChild(full);
        if (wrapper.requestFullscreen) {
            wrapper.requestFullscreen();
        } else if (wrapper.mozRequestFullscreen) {
            wrapper.mozRequestFullscreen();
        } else if (wrapper.msRequestFullscreen) {
            wrapper.msRequestFullscreen();
        }
    } else {
        full.src = './assets/svg/fullscreen.svg'
        fullscreen.innerHTML = '';
        fullscreen.appendChild(full);
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullscreen) {
            document.mozCancelFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function skipLeft(sec) {
    video.currentTime = video.currentTime - sec;
    rewindInLeft();
}

function skipRight(sec) {
    video.currentTime = video.currentTime + sec;
    rewindInRight();
}

function rewindInLeft() {
    rewindLeft.classList.add('rewind-left__active');
    setTimeout(function () {
        rewindLeft.classList.remove('rewind-left__active');
    }, 1000);
}

function rewindInRight() {
    rewindRight.classList.add('rewind-right__active');
    setTimeout(function () {
        rewindRight.classList.remove('rewind-right__active');
    }, 1000);
}

function playbackRateSmaller() {
    if (video.playbackRate > 0.25) {
        video.playbackRate -= 0.25;
        speed();
    }
}

function playbackRateBigger() {
    if (video.playbackRate < 2) {
        video.playbackRate += 0.25;
        speed();
    }
}

function speed() {
    speedVideo.innerHTML = `${video.playbackRate}x`;
    speedVideo.classList.add('speed-video__active');
    setTimeout(function () {
        speedVideo.classList.remove('speed-video__active');
    }, 1000);
}

function nextVideo() {
    while (num < 5) {
        num++;
        if (num === 5) {
            num = 0;
        }
        video.src = './assets/video/' + allVideos[num];
        video.poster = './assets/video/posters/' + allPosters[num];
        toggle.innerHTML = '';
        toggle.appendChild(play);
        bigPlay.innerHTML = '';
        bigPlay.appendChild(bigPlayButton);
        break;
    }
}

function previousVideo() {
    while (num >= 0) {
        num--;
        if (num === -1) {
            num = 4;
        }
        video.src = './assets/video/' + allVideos[num];
        video.poster = './assets/video/posters/' + allPosters[num];
        toggle.innerHTML = '';
        toggle.appendChild(play);
        bigPlay.innerHTML = '';
        bigPlay.appendChild(bigPlayButton);
        break;
    }
}


function keyDown(e) {
    if (isTicketOverlayOpen) return;

    if ((video.volume === 0) && (e.code === 'KeyM')) {
        volume.innerHTML = '';
        volume.appendChild(mute);
    }
    switch (e.code) {
        case 'KeyM':
            volumeOnOff();
            break;
        case 'KeyF':
            toggleFullscreen();
            break;
        case 'Space':
            togglePlay();
            break;
        case 'KeyK':
            togglePlay();
            break;
        case 'Home':
            video.currentTime = 0;
            break;
        case 'End':
            video.currentTime = video.duration;
            break;
        case 'ArrowUp':
            volumeArrowUp();
            break;
        case 'ArrowDown':
            volumeArrowDown();
            break;
        case 'ArrowLeft':
            skipLeft(5);
            break;
        case 'ArrowRight':
            skipRight(5);
            break;
        case 'KeyJ':
            skipLeft(10);
            break;
        case 'KeyL':
            skipRight(10);
            break;
        case 'KeyP':
            offsetLeft();
            break;
        case 'KeyN':
            offsetRight();
            break;
    }

    for (let i = 0; i <= 9; i++) {
        if (e.code === `Digit${i}`) {
            video.currentTime = video.duration * `0.${i}`;
            updateProgress();
            break;
        }
    }

    if (e.key === '<' || e.keyCode === 188) {
        playbackRateSmaller();
    }
    if (e.key === '>' || e.keyCode === 190) {
        playbackRateBigger();
    }
}

function activeDot(num) {
    for (let dot of dots) {
        dot.classList.remove('active');
    }
    dots[num].classList.add('active');
}

function activeSlide(num) {
    for (let slide of slides) {
        slide.classList.remove('active');
    }
    slides[num].classList.add('active');
}

function currentSlide(ind) {
    activeSlide(ind);
    activeDot(ind);
}

function nextSlide(num) {
    let oldSlide = slides[num].parentNode.removeChild(slides[0]);
    slider.appendChild(oldSlide);
    slides = document.querySelectorAll('.slide');
    currentSlide(num);
    nextVideo();
}

function offsetRight() {
    if (index === slides.length - 1) {
        index = 0;
        nextSlide(index);
    } else {
        index++;
        nextSlide(index);
    }
}

function afterFewSlides(ind, currentIndex) {
    let num = ind - currentIndex;
    while (num > 0) {
        let oldSlide = slides[num].parentNode.removeChild(slides[0]);
        slider.appendChild(oldSlide);
        slides = document.querySelectorAll('.slide');
        activeSlide(ind);
        nextVideo(ind);
        num--;
    }
}

function prevSlide(num) {
    let oldSlide = slides[num].parentNode.removeChild(slides[slides.length - 1]);
    slider.insertBefore(oldSlide, slides[0]);
    slides = document.querySelectorAll('.slide');
    currentSlide(num);
    previousVideo();
}

function offsetLeft() {
    if (index === 0) {
        index = slides.length - 1;
        prevSlide(index);
    } else {
        index--;
        prevSlide(index);
    }
}

function beforeFewSlides(ind, currentIndex) {
    let num = currentIndex;
    while (num > ind) {
        let oldSlide = slides[num].parentNode.removeChild(slides[slides.length - 1]);
        slider.insertBefore(oldSlide, slides[0]);
        slides = document.querySelectorAll('.slide');
        activeSlide(ind);
        previousVideo(ind);
        num--;
    }
}


function videoPause() {
    video.pause();
    bigPlay.innerHTML = '';
    bigPlay.appendChild(bigPlayButton);
}

export {
    isVideoPlay,
    initPlayer,
    togglePlay,
    videoTogglePause,
}
