function ripleEffect() {
    const buttonBook = document.querySelector('.button-book');
    buttonBook.addEventListener('click', ripleCreate);
}

function ripleCreate(e) {
    let addDiv = document.createElement('div');
    let maxValue = Math.max(this.clientWidth, this.clientHeight);
    let rect = this.getBoundingClientRect();

    addDiv.style.width = addDiv.style.height = maxValue + 'px';
    addDiv.style.left = e.clientX - rect.left - (maxValue / 2) + 970 + 'px';
    addDiv.style.top = e.clientY - rect.top - (maxValue / 2) + 673 + 'px';

    addDiv.classList.add('riple');
    this.appendChild(addDiv);
}

export {
    ripleEffect,
}
