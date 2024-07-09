"use strict";

window.addEventListener('DOMContentLoaded', () => {
    // Step 1: Define the custom element
    class LineItem extends HTMLElement {
        static register() {
            // If our browser can define custom elements
            if ("customElements" in window) {
                customElements.define("line-item", LineItem);
            }
        }

        connectedCallback() {
            const fldQty = this.querySelector('.line-item--qty');
            const fldPrice = this.querySelector('.line-item--price');
            const fldSubtotal = this.querySelector('.line-item--subtotal');

            // Update this formatted version of the price after we've finished messing around with it.
            let formattedPrice = fldPrice?.value;

            // Price and quantity changes should both trigger an update of the subtotal
            const updateSubtotal = evt => {
                const qty = parseInt(fldQty.value || '0', 10);
                const priceOnlyNumbers = (fldPrice.value || '0').replace(/[^0-9.]/gi, '');
                const price = parseFloat(priceOnlyNumbers);

                // Update the subtotal with currency formatting
                fldSubtotal.value = '$' + (qty * price).toFixed(2);

                // Update the price field with currency as well
                formattedPrice = '$' + price.toFixed(2);
            };

            fldQty?.addEventListener('change', updateSubtotal);
            fldPrice?.addEventListener('input', updateSubtotal);

            fldPrice?.addEventListener('blur', evt => {
                fldPrice.value = formattedPrice;
            });
        }
    }

    LineItem.register();
});
