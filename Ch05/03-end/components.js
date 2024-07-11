'use strict';

window.addEventListener('DOMContentLoaded', () => {
  class StreetAddress extends HTMLElement {
    static register() {
      // If our browser can define custom elements
      if ('customElements' in window) {
        customElements.define('street-address', StreetAddress);
      }
    }

    formatPostalCode() {
      const postalCodeLength = 5;
      const val = this.value;
      let updatedValue = val.replace(/[^0-9]/g, '');
      if (updatedValue.length > postalCodeLength) {
        updatedValue =
          updatedValue.slice(0, postalCodeLength) +
          '-' +
          updatedValue.slice(postalCodeLength);
      }

      this.value = updatedValue;
    }

    connectedCallback() {
      const postalInput = this.querySelector('.postal-code input');

      postalInput.addEventListener('input', this.formatPostalCode);
    }
  }

  StreetAddress.register();
});
