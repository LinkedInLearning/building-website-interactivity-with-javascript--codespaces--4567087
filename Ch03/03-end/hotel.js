"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const btnGirado = document.querySelector('#btn-chef-g');
    const dialogGirardo = document.querySelector('#dlg-chef-g');
    const btnClose = document.querySelector('.btn--dialog-close');

    btnGirado.addEventListener('click', evt => {
        evt.preventDefault();

        dialogGirardo.showModal();
    });

    btnClose.addEventListener('click', evt => {
        evt.preventDefault();

        dialogGirardo.close();
    });
});
