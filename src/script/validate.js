let email;
let regEmail;
let emailError;

function validate() {
    regEmail = /^[\w-]{3,15}@[a-z]{4,}\.[a-z]{2,}$/;
    email = document.querySelector('.data-email');
    emailError = document.querySelector('.email-error');

    email.addEventListener('input', updateEmail);

}

function validateEmail(value) {
    return regEmail.test(value);
}

function updateEmail() {
    email.addEventListener('blur', function () {
        emailError.style.display = 'none';
        email.style.borderColor = 'black';
    })

    if (validateEmail(email.value)) {
        email.style.borderColor = 'green';
        emailError.style.display = 'none';
    } else {
        email.style.borderColor = 'red';
        emailError.style.display = 'block';
    }
}

export {
    validate,
}
