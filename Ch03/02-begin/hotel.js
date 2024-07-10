'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const btnGirado = document.querySelector('#btn-chef-g');

  btnGirado.addEventListener('click', (evt) => {
    evt.preventDefault();

    // Regular string
    // alert("Chef Girado\n\nChef Girado trained in Paris and has a degree in cuisinology from Tufts.");

    // Leaving the info in the page, pulling into an alert means questionable formatting
    const infoGirado = document.querySelector('#info-chef-g');
    alert(infoGirado.textContent);
  });

  const btnStiles = document.querySelector('#btn-chef-s');
  const dialogStiles = document.querySelector('.modal-dialog');
  const dialogStilesBackdrop = document.querySelector('.modal-dialog-backdrop');
  const btnStilesClose = document.querySelector('#btn-chef-s-close');

  btnStiles.addEventListener('click', (evt) => {
    evt.preventDefault();

    dialogStiles.style.display = 'block';
    dialogStilesBackdrop.style.display = 'block';
  });

  btnStilesClose.addEventListener('click', (evt) => {
    evt.preventDefault();

    dialogStiles.style.display = 'none';
    dialogStilesBackdrop.style.display = 'none';
  });
});
