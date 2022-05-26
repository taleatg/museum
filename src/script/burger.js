let burgerOverlay;
let burgerImg;
let burgerMenu;
let menu;
let welcomeTitle;
let welcomeSubtitle;
let welcomeButton;

export function burger() {
    burgerMenu = document.querySelector('.burger');
    menu = document.querySelector('.header-menu');
    welcomeTitle = document.querySelector('.welcome-title');
    welcomeSubtitle = document.querySelector('.welcome-subtitle');
    welcomeButton = document.querySelector('.welcome-button');
    const menuItem = document.querySelectorAll('.menu__item');
    burgerOverlay = document.querySelector('.burger-overlay');
    burgerImg = document.querySelector('.burger-img');
    const social = document.querySelectorAll('.social');

    menuItem.forEach((item) => {
        item.addEventListener('click', () => {
            removeBurgerOverlay();
        });
    });

    social.forEach((item) => {
        item.addEventListener('click', () => {
            removeBurgerOverlay();
        });
    });

    burgerMenu.addEventListener('click', addBurgerOverlay);
    burgerOverlay.addEventListener('click', removeBurgerOverlay);
}

function addBurgerOverlay() {
    burgerOverlay.classList.toggle('burger-overlay__active');
    burgerImg.classList.toggle('burger-img__active');
    burgerMenu.classList.toggle('burger-active');
    menu.classList.toggle('burger-menu');
    welcomeTitle.classList.toggle('not-show');
    welcomeSubtitle.classList.toggle('not-show');
    welcomeButton.classList.toggle('not-show');
}

function removeBurgerOverlay() {
    burgerOverlay.classList.toggle('burger-overlay__active');
    burgerImg.classList.toggle('burger-img__active');
    burgerMenu.classList.remove('burger-active');
    menu.classList.remove('burger-menu');
    welcomeTitle.classList.remove('not-show');
    welcomeSubtitle.classList.remove('not-show');
    welcomeButton.classList.remove('not-show');
}
