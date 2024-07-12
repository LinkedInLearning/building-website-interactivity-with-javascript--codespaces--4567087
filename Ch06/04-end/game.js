'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const boardRegion = document.querySelector('.board');
  const slotsRegion = document.querySelector('.slots');
  const tilesRegion = document.querySelector('.tiles');

  let currentSolution = [];

    // Store all original tile positions for reset purposes
    tilesRegion.querySelectorAll('.tile').forEach(tile => {
        const originalStyle = getComputedStyle(tile);

        tile.dataset.originalLeft = originalStyle.getPropertyValue('left');
        tile.dataset.originalTop = originalStyle.getPropertyValue('top');
        tile.dataset.originalTransform = originalStyle.getPropertyValue('transform');
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
    console.log('Solution so far:', currentSolution.join(''));

    tile.style.left = targetSlot.offsetLeft + 'px';
    tile.style.top = targetSlot.offsetTop + 'px';
    tile.style.transform = 'none';
  }

  function removeTileFromSolution(tile) {
    const letter = tile.dataset.letter;

    // remove the letter from the solution, restore the tile
    const lastLetter = currentSolution.slice(-1).toString();

    if (!lastLetter || letter !== lastLetter) {
      console.error('Letters must be removed in order:', letter, lastLetter);
      return;
    }

    currentSolution = currentSolution.slice(0, -1);
    console.log('Solution so far:', currentSolution.join(''));

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
      removeTileFromSolution(tile);
    }
  });

  // Listen for presses of the A-F keys and delete
  document.addEventListener('keyup', (evt) => {
    const evtCode = evt.code.toLowerCase();
    if (
      currentSolution.length > 0 &&
      (evtCode === 'backspace' || evtCode === 'delete')
    ) {
      // remove the letter from the solution, restore the tile
      const lastLetter = currentSolution.slice(-1);
      const tile = document.querySelector(`.tile[data-letter=${lastLetter}]`);

      removeTileFromSolution(tile);
    } else if (evtCode.match(/key[a-f]/)) {
      // Thank goodness we don't have to write a separate if block for every letter code!
      const myLetter = evtCode.match(/key([a-f])/i)[1];

      if (currentSolution.indexOf(myLetter) === -1) {
        const tile = document.querySelector(`.tile[data-letter=${myLetter}]`);

        addTileToSolution(tile);
      }
    }
  });
});
