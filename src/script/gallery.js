let galleryPicture;

export function updateGallery() {
    galleryPicture = document.querySelectorAll('.gallery-picture');
    window.reload = shuffle(arrPicture);
    window.onload = scrollAnimate();
    window.addEventListener('scroll', scrollAnimate);

    let newGallery = arrPicture.map((item, index) => {
        const img = document.createElement('img');
        img.classList.add('gallery-picture__size');
        img.src = `./assets/img/galery/${item}.jpg`;
        img.alt = `${item}`;
        img.setAttribute('loading', 'lazy');
        galleryPicture[index].append(img);
    })
}

let arrPicture = ['galery1', 'galery2', 'galery3', 'galery4', 'galery5', 'galery6', 'galery7', 'galery8', 'galery9', 'galery10', 'galery11', 'galery12', 'galery13', 'galery14', 'galery15']

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function scrollAnimate() {
    for (let i = 0; i < galleryPicture.length; i++) {
        let oneImage = galleryPicture[i];
        const oneImageHeight = oneImage.offsetHeight;
        const oneImageOffset = offset(oneImage).top;
        const start = -550;

        let coordinate = window.innerHeight - start;

        if (oneImageHeight > window.innerHeight) {
            coordinate = window.innerHeight - window.innerHeight / start;
        }

        if (pageYOffset > oneImageOffset - coordinate) {
            oneImage.classList.add('gallery-picture__active');
        } else {
            oneImage.classList.remove('gallery-picture__active');
        }
    }
}

function offset(e) {
    const rect = e.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageXOffset || document.documentElement.scrollTop;

    return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
}
