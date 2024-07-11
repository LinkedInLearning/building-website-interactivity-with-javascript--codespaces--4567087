'use strict';

window.addEventListener('DOMContentLoaded', () => {
  class PasswordField extends HTMLElement {
    static register() {
      // If our browser can define custom elements
      if ('customElements' in window) {
        customElements.define('password-field', PasswordField);
      }
    }

    connectedCallback() {
      const btnReveal = this.querySelector('.btn-reveal-password');

      btnReveal.addEventListener('click', (evt) => {
        evt.preventDefault();

        const fldPassword = this.querySelector('.field--password');

        if (fldPassword.type === 'text') {
          fldPassword.type = 'password';
          btnReveal.innerText = this.dataset.labelShow;
        } else {
          fldPassword.type = 'text';
          btnReveal.innerText = this.dataset.labelHide;
        }
      });
    }
  }

  PasswordField.register();
});
