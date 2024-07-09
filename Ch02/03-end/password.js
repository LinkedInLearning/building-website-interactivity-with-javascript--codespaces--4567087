"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const btnReveal = document.querySelector('#reveal-password');
    const fldPassword = document.querySelector('.field--password');
    const fldPasswordSync = document.querySelector('.field--password--reveal');

    // This doesn't work because the style is set by a CSS, not an attribute
    // const fldPasswordInitialDisplay = fldPassword.style.display;

    const fldPasswordInitialDisplay = getComputedStyle(fldPassword).getPropertyValue('display');

    btnReveal.addEventListener('click', evt => {
        evt.preventDefault();

        // Is the password field currently hidden or not?
        // We use a variable so the non-hidden display can be controlled by CSS only, not hard-coded here
        const fldPasswordCurrentDisplay = getComputedStyle(fldPassword).getPropertyValue('display');

        if (fldPasswordCurrentDisplay !== fldPasswordInitialDisplay) {
            fldPassword.style.display = fldPasswordInitialDisplay;
            fldPasswordSync.style.display = 'none';
            btnReveal.innerText = btnReveal.dataset.labelShow;
        } else {
            fldPassword.style.display = 'none';
            fldPasswordSync.style.display = fldPasswordInitialDisplay;
            btnReveal.innerText = btnReveal.dataset.labelHide;
        }
    });

    fldPassword.addEventListener('input', evt => {
        fldPasswordSync.value = fldPassword.value;
    });

    // Don't forget to make the sync bidirectional
    fldPasswordSync.addEventListener('input', evt => {
        fldPassword.value = fldPasswordSync.value;
    });
})
