'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const boardRegion = document.querySelector('.board');
  const slotsRegion = document.querySelector('.slots');
  const tilesRegion = document.querySelector('.tiles');

  let currentSolution = [];

  // Store all original tile positions for reset purposes
  tilesRegion.querySelectorAll('.tile').forEach((tile) => {
    const originalStyle = getComputedStyle(tile);

    tile.dataset.originalLeft = originalStyle.getPropertyValue('left');
    tile.dataset.originalTop = originalStyle.getPropertyValue('top');
    tile.dataset.originalTransform =
      originalStyle.getPropertyValue('transform');
  });

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

  function removeLetterFromSolution(tile) {
    const letter = tile.dataset.letter;

    // remove the letter from the solution, restore the tile
    const lastLetter = currentSolution.slice(-1).toString();

    if (!lastLetter || letter !== lastLetter) {
      console.error('Letters must be removed in order:', letter, lastLetter);
      return;
    }

    currentSolution = currentSolution.slice(0, -1);
    console.log('Solution so far:', currentSolution);

    tile.style.left = tile.dataset.originalLeft;
    tile.style.top = tile.dataset.originalTop;
    tile.style.transform = tile.dataset.originalTransform;
  }

  tilesRegion.addEventListener('click', (evt) => {
    evt.preventDefault();

    const tile = evt.target;

    if (!tile.matches('.tile')) {
      return;
    }

    if (currentSolution.indexOf(tile.dataset.letter) === -1) {
      addTileToSolution(tile);
    } else {
      removeLetterFromSolution(tile);
    }
  });
});
