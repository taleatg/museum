import {videoTogglePause} from './player';

let isTicketOverlayOpen = false;
let buttonTotal;
let overlay;
let close;
let bookingTickets;
let booking;

function showOverlay() {
    buttonTotal = document.querySelector('.button-total');
    overlay = document.querySelector('.overlay');
    bookingTickets = document.querySelector('.booking-tickets__container');
    close = document.querySelector('.tickets-close');
    booking = document.querySelector('.booking');

    window.onload = init();
}

function init() {
    buttonTotal.addEventListener('click', addOverlay);
    overlay.addEventListener('click', removeOverlay);
    close.addEventListener('click', removeOverlay);
}

function addOverlay() {
    overlay.style.display = 'block';
    bookingTickets.classList.add('active');
    booking.classList.add('active');
    isTicketOverlayOpen = true;
    videoTogglePause();
}

function removeOverlay() {
    overlay.style.display = 'none';
    bookingTickets.classList.remove('active');
    booking.classList.remove('active');
    isTicketOverlayOpen = false;
}

export {
    isTicketOverlayOpen,
    showOverlay
}
