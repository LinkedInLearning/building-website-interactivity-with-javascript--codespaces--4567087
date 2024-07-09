"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const myForm = document.querySelector('#frm-signup');
    const passwords = document.querySelectorAll('.field--password');

    // Step 1: Validate that the passwords match when the form is submitted.
    myForm.addEventListener('submit', evt => {
        // For our purposes, this form doesn't need to go anywhere
        evt.preventDefault();

        if (passwords[0].value !== passwords[1].value) {
            alert('Your passwords must match.  Please double check and fix them.');
        } else {
            alert('Success!');
        }
    });

    // Step 2: Wire up toggling password visibility
    const btnReveal = document.getElementById('reveal-password');

    btnReveal.addEventListener('click', evt => {
        evt.preventDefault();

        passwords.forEach(pwField => {
            if (pwField.type === 'password') {
                pwField.type = 'text';
                btnReveal.innerText = btnReveal.dataset.labelHide;
            } else {
                pwField.type = 'password';
                btnReveal.innerText = btnReveal.dataset.labelShow;
            }
        });
    });
});