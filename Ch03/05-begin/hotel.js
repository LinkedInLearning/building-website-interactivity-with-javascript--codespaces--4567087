'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const inHotelSection = document.querySelector('#inhotel');

  inHotelSection.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.classList.contains('btn--dialog-open')) {
      evt.preventDefault();

      let myDialog = target.parentNode.querySelector('.dialog--chef');

      if (!myDialog) {
        myDialog = target.parentNode.parentNode.querySelector('.dialog--chef');
      }

      if (myDialog) {
        myDialog.showModal();
      }
    } else if (target.classList.contains('btn--dialog-close')) {
      evt.preventDefault();

      const myDialog = target.closest('dialog');

      if ('close' in myDialog) {
        myDialog.close();
      }
    }
  });
});
