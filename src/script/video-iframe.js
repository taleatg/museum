import {isAudioPlay, musicStartAfterIframe} from './fonMusic';

let video;
let toggle;
let slideContainer;
let bigPlay;
let navigathion;
let videos;
let oldLink;
let oldButton;
let oldIcon;
let audio;
let musicPlay;
let isIframeStart = false;

function findVideo() {
    video = document.querySelector('video');
    toggle = document.querySelector('.toggle');
    slideContainer = document.querySelector('.slide-navigation');
    bigPlay = document.querySelector('.video-buttons__bigplay');
    navigathion = slideContainer.querySelectorAll('.navigation');
    videos = document.querySelectorAll('.video-iframe');

    audio = document.querySelector('#audio');
    musicPlay = document.querySelector('.music-play');


    navigathion.forEach((item) => {
        item.addEventListener('click', removeIframe);
    })

    video.addEventListener('click', removeIframe);
    toggle.addEventListener('click', removeIframe);
    bigPlay.addEventListener('click', removeIframe);

    findVideos();
}

let pauseMusic = new Image();
pauseMusic.src = './assets/svg/music-svg/pause.svg';

let playMusic = new Image();
playMusic.src = './assets/svg/music-svg/play.svg';

function findVideos() {
    for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
    }
}

function setupVideo(video) {
    let link = video.querySelector('.video__link');
    let media = video.querySelector('.video__media');
    let button = video.querySelector('.video__button');
    let icon = video.querySelector('.video__icon');
    let id = parseMediaURL(media);

    video.addEventListener('click', () => {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].querySelector('iframe')) {
                removeIframe();
            }
        }

        let iframe = createIframe(id);
        oldLink = link;
        oldButton = button;
        oldIcon = icon;

        link.remove();
        button.remove();
        video.appendChild(iframe);

        audio.pause();
        musicPlay.innerHTML = '';
        musicPlay.append(playMusic);
    });

    link.removeAttribute('href');
    video.classList.add('video-iframe__active');
}

function parseMediaURL(media) {
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/sddefault\.jpg/i;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
}

function createIframe(id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    isIframeStart = true;

    return iframe;
}

function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1&enablejsapi=1.';

    return 'https://www.youtube.com/embed/' + id + query;
}

function removeIframe() {
    const iframe = document.querySelectorAll('iframe');
    let videoIframe = document.querySelectorAll('.video-iframe');

    let index;

    for (let i = 0; i < videoIframe.length; i++) {
        if (videoIframe[i].querySelector('iframe')) {
            index = i;
        }
    }

    for (let i = 0; i < iframe.length; i++) {
        iframe[i].remove();
        videoIframe[index].appendChild(oldLink);
        videoIframe[index].appendChild(oldButton);
        videoIframe[index].appendChild(oldIcon);
    }

    removeIframeStartAudio();
}

function removeIframeStartAudio() {
    if (isAudioPlay) {

    }
}

export {
    findVideo,
    removeIframe,
    isIframeStart,
}
