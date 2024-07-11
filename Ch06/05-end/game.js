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
    console.log('Solution so far:', currentSolution.join(''));

    // Store the tile's original location if needed
    if (!tile.dataset.originalLeft) {
      const originalStyle = getComputedStyle(tile);

      tile.dataset.originalLeft = originalStyle.getPropertyValue('left');
      tile.dataset.originalTop = originalStyle.getPropertyValue('top');
      tile.dataset.originalTransform =
        originalStyle.getPropertyValue('transform');
    }

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

  const intersectsASlot = (tileEl) => {
    const roundableProps = [
      'left',
      'top',
      'bottom',
      'right',
      'width',
      'height',
    ];

    for (const slotEl of slotsRegion.querySelectorAll('.slot')) {
      const slotCoords = slotEl.getBoundingClientRect();
      const tileCoords = tileEl.getBoundingClientRect();

      let slot = {},
        tile = {};

      for (const prop of roundableProps) {
        tile[prop] = parseInt(tileCoords[prop], 10);
        slot[prop] = parseInt(slotCoords[prop], 10);
      }

      // @see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
      if (
        slot.left < tile.left + tile.width &&
        slot.left + slot.width > tile.left &&
        slot.top < tile.top + tile.height &&
        slot.top + slot.height > tile.top
      ) {
        slotEl.style.background = '#99ff99';

        return slotEl;
      } else {
        slotEl.style.background = 'transparent';
      }
    }

    return null;
  };

  // Drag and drop trackers
  let draggableTile;
  let targetSlot;
  let x = 0;
  let y = 0;
  let boardRect = boardRegion.getBoundingClientRect();

  const mouseDownHandler = (evt) => {
    draggableTile = evt.target;

    // Calculate the mouse position
    const rect = draggableTile.getBoundingClientRect();
    x = evt.pageX - rect.left + boardRect.left;
    y = evt.pageY - rect.top + boardRect.top;

    // Straighten out while dragging
    draggableTile.dataset.originalTransform = draggableTile.style.transform;
    draggableTile.style.transform = 'none';

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = (evt) => {
    // Set position for dragging element
    draggableTile.style.position = 'absolute';
    draggableTile.style.top = `${evt.pageY - y}px`;
    draggableTile.style.left = `${evt.pageX - x}px`;

    targetSlot = intersectsASlot(evt.target);
  };

  const mouseUpHandler = () => {
    // Remove the position styles to let the tiles go back to their original positions
    // draggableTile.style.removeProperty('top');
    // draggableTile.style.removeProperty('left');
    // draggableTile.style.removeProperty('position');

    // If we are intersecting with a slot, drop the tile there
    if (targetSlot) {
      const slotCoords = targetSlot.getBoundingClientRect();
      const tileTop =
        parseInt(slotCoords.top, 10) - parseInt(boardRect.top, 10);
      const tileLeft =
        parseInt(slotCoords.left, 10) - parseInt(boardRect.left, 10);

      draggableTile.style.top = `${tileTop}px`;
      draggableTile.style.left = `${tileLeft}px`;

      targetSlot.style.background = 'transparent';

      targetSlot = null;
    } else {
      // Not moving to a slot, restore the original transform along with position
      draggableTile.style.transform = draggableTile.dataset.originalTransform;
    }

    x = null;
    y = null;
    draggableTile = null;

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  tilesRegion.querySelectorAll('.tile').forEach((tile) => {
    tile.addEventListener('mousedown', mouseDownHandler);
  });
});
