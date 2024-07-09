"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const btnReveal = document.querySelector('#reveal-password');
    const fldPassword = document.querySelector('.field--password');

    btnReveal.addEventListener('click', evt => {
        evt.preventDefault();

        if (fldPassword.type === 'text') {
            fldPassword.type = 'password';
            btnReveal.innerText = 'Show password';
        } else {
            fldPassword.type = 'text';
            btnReveal.innerText = 'Hide password';
        }
    });

})
