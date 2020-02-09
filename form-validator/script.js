const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
};

const showSuccess = input => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};

const checkRequired = inputArr => {
    inputArr.forEach(input => {
        input.value.trim() === ''
            ? showError(input, `${getFieldName(input)} is required`)
            : showSuccess(input);
    });
};

const checkLength = (input, min, max) => {
    input.value.length < min
        ? showError(input, `${getFieldName(input)} must be at least ${min} characters`)
        : input.value.length > max
        ? showError(input, `${getFieldName(input)} must be less than ${max} characters`)
        : showSuccess(input);
};

const checkEmail = input => {
    const emailTestRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    emailTestRegex.test(String(input.value.trim()).toLowerCase())
        ? showSuccess(input)
        : showError(input, 'Email is not valid');
};

const checkPasswordsMatch = (input1, input2) => {
    input1.value !== input2.value && showError(input2, 'Passwords do not match');
};

const getFieldName = input => input.id.charAt(0).toUpperCase() + input.id.slice(1);

form.addEventListener('submit', event => {
    event.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});
