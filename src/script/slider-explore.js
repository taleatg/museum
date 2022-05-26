export function sliderExplore() {
    const separator = document.querySelector('.separator-container');
    let x = document.getElementsByClassName('before');
    let clicked;

    for (let i = 0; i < x.length; i++) {
        compareImages(x[i]);
    }

    function compareImages(img) {
        let w = img.offsetWidth + 33;
        let h = img.offsetHeight;

        img.style.width = 61 + '%';

        separator.addEventListener('mousedown', sliderReady);
        window.addEventListener('mouseup', sliderFinish);
        separator.addEventListener('touchstart', sliderReady);
        window.addEventListener('touchstop', sliderFinish);

        function sliderReady(e) {
            e.preventDefault();
            clicked = 1;

            window.addEventListener('mousemove', sliderMove);
            window.addEventListener('touchmove', sliderMove);
        }

        function sliderFinish() {
            clicked = 0;
        }

        function sliderMove(e) {
            if (clicked == 0) {
                return false;
            }

            let pos = getCursorPos(e);
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;

            slider(pos);
        }

        function getCursorPos(e) {
            e = e || window.event;
            let a = img.getBoundingClientRect();
            let x = 0;
            x = e.pageX - a.left;
            x = x - window.pageXOffset;
            return x;
        }

        function slider(x) {
            if (x > 720) {
                x = 720;
            }

            img.style.width = x + 'px';
            separator.style.left = img.offsetWidth - (separator.offsetWidth / 2) + 'px';
        }
    }
}
