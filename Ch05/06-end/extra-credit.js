"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const challengeRegion = document.querySelector('#component-challenge');

    challengeRegion.querySelector('.add-item').addEventListener('click', evt => {
        evt.preventDefault();
        
        const lastLineItem = challengeRegion.querySelector('line-item:last-child');

        let newLineItem =  lastLineItem.cloneNode(true);

        newLineItem.querySelector('.line-item--name').value = '';
        newLineItem.querySelector('.line-item--qty').value = 1;
        newLineItem.querySelector('.line-item--price').value = '';
        newLineItem.querySelector('.line-item--subtotal').value = '';

        challengeRegion.querySelector('form').append(newLineItem);
    })
});
