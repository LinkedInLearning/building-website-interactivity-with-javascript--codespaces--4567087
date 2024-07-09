"use strict";

window.addEventListener('DOMContentLoaded', () => {
    class StreetAddress extends HTMLElement {
        static register() {
            // If our browser can define custom elements
            if ("customElements" in window) {
                customElements.define("street-address", StreetAddress);
            }
        }
    }

    StreetAddress.register();
})
