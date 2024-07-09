"use strict";

window.addEventListener('DOMContentLoaded', () => {
    // This won't work now, since there's more than one
    // const btnClose = document.querySelector('.btn--dialog-close');

    /*
    // Loop?  It would work.
    const btnsClose = document.querySelectorAll('.btn--dialog-close');
    btnsClose.forEach(btn => {
        btn.addEventListener('click', evt => {
            evt.preventDefault();

            dialogGirardo.close();
        })
    })
    */

    // Better to delegate
    const inHotelSection = document.querySelector('#inhotel');

    inHotelSection.addEventListener('click', evt => {
        const target = evt.target;

        if (target.classList.contains('btn--dialog-open')) {
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
        } else if (target.classList.contains('btn--dialog-close')) {
            // This is a closer
            evt.preventDefault();

            // parentNode would also work, but this is more resilient if the HTML gets deeper
            const myDialog = evt.target.closest('dialog');

            if ('close' in myDialog) {
                myDialog.close();
            }
        }
    });
});
