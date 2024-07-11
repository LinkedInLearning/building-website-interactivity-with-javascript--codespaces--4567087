'use strict';

window.addEventListener('DOMContentLoaded', () => {
  class LineItem extends HTMLElement {
    static register() {
      if ('customElements' in window) {
        customElements.define('line-item', LineItem);
      }
    }

    connectedCallback() {
      const fldQty = this.querySelector('.line-item--qty');
      const fldPrice = this.querySelector('.line-item--price');
      const fldSubtotal = this.querySelector('.line-item--subtotal');

      // Update this formatted version of the price after we've finished messing around with it.
      let formattedPrice = fldPrice.value;

      // Price and quantity changes should both trigger an update of the subtotal
      const updateSubtotal = () => {
        const qty = parseInt(fldQty.value || '0', 10);
        const priceOnlyNumbers = (fldPrice.value || '0').replace(
          /[^0-9.]/gi,
          ''
        );
        const price = parseFloat(priceOnlyNumbers);
        const priceCents = Math.round(price * 100);
        const subtotalCents = priceCents * qty;

        // Update the subtotal with currency formatting
        fldSubtotal.value = '$' + (subtotalCents / 100).toFixed(2);

        // Update the price field with currency as well
        formattedPrice = '$' + price.toFixed(2);
      };

      fldQty.addEventListener('change', updateSubtotal);
      fldPrice.addEventListener('input', updateSubtotal);

      fldPrice.addEventListener('blur', () => {
        fldPrice.value = formattedPrice;
      });
    }
  }

  LineItem.register();
});
