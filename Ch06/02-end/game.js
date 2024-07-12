'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const boardRegion = document.querySelector('.board');
  const slotsRegion = document.querySelector('.slots');
  const tilesRegion = document.querySelector('.tiles');

  let currentSolution = [];

  function addTileToSolution(tile) {
    const letter = tile.dataset.letter;

    const targetSlotIndex = currentSolution.length + 1;
    const targetSlot = document.querySelector(`#slot-${targetSlotIndex}`);

    // No slots left
    if (!targetSlot) {
      return;
    }

    currentSolution.push(letter);
    console.log('Solution so far:', currentSolution);

    tile.style.left = targetSlot.offsetLeft + 'px';
    tile.style.top = targetSlot.offsetTop + 'px';
    tile.style.transform = 'none';
  }

  tilesRegion.addEventListener('click', (evt) => {
    evt.preventDefault();

    const tile = evt.target;

    if (!tile.matches('.tile')) {
      return;
    }

    if (currentSolution.indexOf(tile.dataset.letter) === -1) {
      addTileToSolution(tile);
    }
  });
});
