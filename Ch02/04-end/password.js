'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const btnReveal = document.querySelector('#reveal-password');
  const fldPassword = document.querySelector('#txt-password');
  const fldPasswordSync = document.querySelector('#txt-password-reveal');

  // Can't just use fldPassword.style.display because there's no style attribute,
  // the value comes from CSS.
  const fldPasswordInitialDisplay =
    getComputedStyle(fldPassword).getPropertyValue('display');

  btnReveal.addEventListener('click', (evt) => {
    evt.preventDefault();

    // Is the password field currently hidden or not?
    // We get its current computed style and compare it to the initial value
    const fldPasswordCurrentDisplay =
      getComputedStyle(fldPassword).getPropertyValue('display');

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

  fldPassword.addEventListener('input', (evt) => {
    fldPasswordSync.value = fldPassword.value;
  });

  fldPasswordSync.addEventListener('input', (evt) => {
    fldPassword.value = fldPasswordSync.value;
  });
});
