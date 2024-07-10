'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const inHotelSection = document.querySelector('#inhotel');

  let delayTimer;

  inHotelSection.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.matches('.btn--dialog-open')) {
      evt.preventDefault();

      let myDialog = target.parentNode.querySelector('.dialog--chef');

      if (!myDialog) {
        myDialog = target.parentNode.parentNode.querySelector('.dialog--chef');
      }

      if (myDialog) {
        myDialog.showModal();

        // If we've marked this one as self-dismissing
        if (myDialog.dataset.closeDelay) {
          const delay = parseInt(myDialog.dataset.closeDelay, 10);

          delayTimer = setTimeout(() => {
            myDialog.close();
          }, delay * 1000);
        }
      }
    } else if (target.matches('.btn--dialog-close')) {
      evt.preventDefault();

      const myDialog = target.closest('dialog');

      if ('close' in myDialog) {
        myDialog.close();
      }
    } else if (target.matches('.dialog--chef')) {
      // Clicking the dialog backdrop, which is part of the dialog
      if (target.open) {
        target.close();
      }
    }
  });
});
