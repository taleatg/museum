let index;
let next;
let prev;
let slides;
let slideNow;
let squares;

export function welcomeSlider() {
    next = document.querySelector('.navigation-right');
    prev = document.querySelector('.navigation-left');
    slides = document.querySelectorAll('.welcome__one-slide');
    squares = document.querySelectorAll('.welcome-slider__navigation');
    slideNow = document.querySelector('.welcome-slider__current-slide');
    index = 0;

    squares.forEach((item, indSquare) => {
        item.addEventListener('click', function () {
            index = indSquare;
            currentSlide(index)
        })
    })

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);
}

let numberSlide = ['01', '02', '03', '04', '05'];
let elem = document.querySelector('.img-container');

function activeSlide(n) {
    for (let slide of slides) {
        slide.classList.remove('welcome__slide-active');
    }
    slides[n].classList.add('welcome__slide-active');
}

function activeSquare(n) {
    for (let square of squares) {
        square.classList.remove('welcome__slide-active');
    }
    squares[n].classList.add('welcome__slide-active');
}

function currentSlide(index) {
    activeSlide(index);
    activeSquare(index);
    slideNow.innerText = numberSlide[index];
}

function nextSlide() {
    if (index === slides.length - 1) {
        index = 0;
        currentSlide(index);
    } else {
        index++;
        currentSlide(index);
    }
}

function prevSlide() {
    if (index === 0) {
        index = slides.length - 1;
        currentSlide(index);
    } else {
        index--;
        currentSlide(index);
    }
}

function swipe(elem) {
    let surface = elem;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;

    let startTime = 0;
    let endTime = 0;

    let limit = 150;
    let restraint = 100;
    let allTime = 300;

    surface.addEventListener('mousedown', function (e) {
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false)

    surface.addEventListener('mouseup', function (e) {
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        endTime = new Date().getTime() - startTime;

        if (endTime <= allTime) {
            if (Math.abs(distX) >= limit && Math.abs(distY) <= restraint) {
                if (distX > 0) {
                    prevSlide(index);
                } else {
                    nextSlide(index)
                }
            }
        }

        e.preventDefault();
    }, false)
}

swipe(elem);
