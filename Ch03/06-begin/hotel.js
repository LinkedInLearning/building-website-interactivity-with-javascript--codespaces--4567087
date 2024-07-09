"use strict";

window.addEventListener('DOMContentLoaded', () => {
    // Better to delegate
    const inHotelSection = document.querySelector('#inhotel');

    inHotelSection.addEventListener('click', evt => {
        const target = evt.target;

        if (target.matches('.btn--dialog-open')) {
            // This is a dialog opener
            evt.preventDefault();

            // Get the nearest dialog, should be close
            let myDialog = target.parentNode.querySelector('.dialog--chef');
            if (!myDialog) {
                myDialog = target.parentNode.parentNode.querySelector('.dialog--chef');
            }

            if (myDialog) {
                myDialog.showModal();
            }
        } else if (target.matches('.btn--dialog-close')) {
            // This is a closer
            evt.preventDefault();

            // parentNode would also work, but this is more resilient if the HTML gets deeper
            const myDialog = evt.target.closest('dialog');

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
