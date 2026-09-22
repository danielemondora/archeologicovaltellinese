// scrollTopButton.js — Web Component completo
class ScrollTopButton extends HTMLElement {
  #sentinel = null;
  #observer = null;
  #btn      = null;

  // Attributi osservabili
  static get observedAttributes() {
    return ['threshold', 'label', 'color', 'border'];
  }

  connectedCallback() {
    // Attach shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // Stili incapsulati
    const style = document.createElement('style');
    style.textContent = `
      :host { display: contents; }

      button {
        --_bg: ${this.getAttribute('color') || '#06b6d4'};
        --_border: ${this.getAttribute('border') || '#06b6d4'};
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 9999;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid var(--_border);
        cursor: pointer;
        background: var(--_bg);
        color: #fff;
        box-shadow: 0 4px 14px color-mix(in srgb, var(--_bg) 50%, transparent);
        display: grid;
        place-items: center;
        transition: opacity .25s ease, transform .25s ease;

        @starting-style {
          opacity: 0;
          transform: translateY(12px) scale(0.8);
        }
      }

      button[hidden] { display: none; }

      button:hover {
        filter: brightness(0.9);
        transform: translateY(-2px);
      }

      button:focus-visible {
        outline: 3px solid var(--_bg);
        outline-offset: 3px;
      }

      @media (prefers-reduced-motion: reduce) {
        button { transition: opacity .1s linear; }
      }
    `;

    // Markup del pulsante
    const label = this.getAttribute('label') || 'Torna in cima alla pagina';
    this.#btn = document.createElement('button');
    this.#btn.setAttribute('aria-label', label);
    this.#btn.setAttribute('title', label);
    this.#btn.setAttribute('hidden', '');
    this.#btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 640 640">
      <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
      <path d="M342.6 73.4C330.1 60.9 309.8 60.9 297.3 73.4L137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7C149.8 291.2 170.1 291.2 182.6 278.7L288 173.3L288 544C288 561.7 302.3 576 320 576C337.7 576 352 561.7 352 544L352 173.3L457.4 278.7C469.9 291.2 490.2 291.2 502.7 278.7C515.2 266.2 515.2 245.9 502.7 233.4L342.7 73.4z"/>
    </svg>
    `;

    shadow.appendChild(style);
    shadow.appendChild(this.#btn);

    this.#setupObserver();
    this.#btn.addEventListener('click', this.#handleClick.bind(this));
  }

  #setupObserver() {
    // Rimuovi observer precedente se esiste
    this.#observer?.disconnect();
    this.#sentinel?.remove();

    this.#sentinel = document.createElement('div');
    this.#sentinel.setAttribute('aria-hidden', 'true');
    this.#sentinel.style.cssText =
      'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.prepend(this.#sentinel);

    this.#observer = new IntersectionObserver(
      ([entry]) => {
        if (this.#btn) this.#btn.hidden = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    this.#observer.observe(this.#sentinel);
  }

  #handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const target =
      document.querySelector('main h1, main') ?? document.body;
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
    this.#sentinel?.remove();
  }

  attributeChangedCallback(name, _old, newVal) {
    if (!this.#btn) return;
    if (name === 'label') {
      this.#btn.setAttribute('aria-label', newVal);
      this.#btn.setAttribute('title', newVal);
    }
  }
}

customElements.define('scroll-top-button', ScrollTopButton);