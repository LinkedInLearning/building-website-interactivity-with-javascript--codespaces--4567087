'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const btnReveal = document.querySelector('#reveal-password');
  const fldPassword = document.querySelector('#txt-password');

  btnReveal.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (fldPassword.type === 'text') {
      fldPassword.type = 'password';
      btnReveal.innerText = btnReveal.dataset.labelShow;
    } else if (fldPassword.type === 'password') {
      fldPassword.type = 'text';
      btnReveal.innerText = btnReveal.dataset.labelHide;
    }
  });
});
