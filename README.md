# Istituto Archeologico Valtellinese — Sito Web & Archivio Digitale

![Performance](https://img.shields.io/badge/Lighthouse_Performance-99%25-green?style=flat-square&logo=lighthouse)
![Accessibility](https://img.shields.io/badge/Lighthouse_Accessibility-100%25-brightgreen?style=flat-square&logo=lighthouse)
![Best Practices](https://img.shields.io/badge/Lighthouse_Best_Practices-100%25-brightgreen?style=flat-square&logo=lighthouse)
![SEO](https://img.shields.io/badge/Lighthouse_SEO-100%25-brightgreen?style=flat-square&logo=lighthouse)
![License](https://img.shields.io/badge/License-AGPLv3-blue.svg?style=flat-square)

Sito web ufficiale ed archivio delle pubblicazioni dell'**Istituto Archeologico
Valtellinese**. Realizzato come sito statico performante ed accessibile con
Eleventy (11ty) e distribuito sulla rete edge di Cloudflare tramite Cloudflare
Workers e Cloudflare R2.

---

## 🛠️ Tech Stack & Architettura

- **SSG:** [Eleventy (11ty)](https://www.11ty.dev/)
- **Templating:** [Nunjucks (`.njk`)](https://mozilla.github.io/nunjucks/) +
  [WebC (`.webc`)](https://www.11ty.dev/docs/languages/webc/) per i componenti
  UI
- **Architettura CSS:** [CUBE CSS](https://cube.fyi/) (Composition, Utility,
  Block, Exception) con Design Tokens
- **Navigazione:** Popover API nativa HTML (Zero JavaScript per menu e modali)
- **Motore di Ricerca:** [Pagefind](https://pagefind.app/) (ricerca full-text
  client-side)
- **Hosting / Compute:** [Cloudflare Workers](https://workers.cloudflare.com/)
  (`wrangler.jsonc`)
- **CDN Asset & Media:**
  [Cloudflare R2](https://www.cloudflare.com/products/r2/) a
  `https://media.archeologicovaltellinese.it` (PDF, bollettini ed immagini ad
  alta risoluzione)

---

## ♿ Accessibilità & Performance (A11y Compliant)

Il progetto rispetta le linee guida **WCAG 2.1 AA**:

- **Zero JS per la Navigazione:** Uso del Popover API nativo per gestire menu e
  modali mantenendo la gestione del focus e del tasto `ESC` a carico del
  browser.
- **CSS Modulare & Leggero:** Architettura CUBE CSS basata su design token e
  layout fluidi nativi, senza l'uso di framework CSS esterni.
- **HTML Semantico:** Struttura accessibile agli screen reader con attributi
  ARIA e `skip-link` per saltare direttamente ai contenuti.
- **Preferenze Utente:** Supporto nativo via CSS a `prefers-reduced-motion` e
  contrasti elevati.

---

## 📦 Struttura del Progetto

```text
.
├── _11ty/                # Filtri custom (date, autori) e shortcode
├── _components/          # Componenti WebC (form-contatti, form-socio, scroll-top)
├── src/
│   ├── assets/           # Font locali (WOFF2), favicon, immagini di layout
│   ├── common/           # Sitemap, robots.txt, manifest, 404
│   ├── _data/            # JSON/JS (pubblicazioni, direttivo, bibliografia Pace, nav)
│   ├── _includes/        # Partial Nunjucks, SVG e sistema CUBE CSS (base, composition, blocks, utilities)
│   ├── _layouts/         # Template base (base.njk, article.njk, page.njk)
│   ├── news/             # Comunicati, conferenze ed eventi (Markdown + JSON)
│   └── pages/            # Pagine del sito (storie, pubblicazioni, notiziari, istituto)
└── wrangler.jsonc        # Configurazione Cloudflare Workers
```

## 📄 Licenza e Proprietà

Questa repository adotta una distinzione netta tra software e contenuti:

- **Codice Sorgente ed Architettura Web:** Copyright (C) 2026 **Daniele
  Mondora**. Distribuito sotto licenza
  **[GNU Affero General Public License v3.0 (AGPL-3.0-or-later)](LICENSE)**.
  Chiunque modifichi o utilizzi questo codice per erogare servizi di rete è
  tenuto a rilasciare le proprie modifiche sotto la medesima licenza.

- **Contenuti, Materiale Scientifico ed Archivio:** Copyright (C) 2026
  **Istituto Archeologico Valtellinese**. Tutti i testi, i dati d'archivio
  (`src/_data/`), le ricerche storiche, le pubblicazioni ed i file multimediali
  (immagini, PDF) sono di proprietà esclusiva dell'Istituto. Tutti i diritti
  sono riservati (**© Tutti i diritti riservati / All Rights Reserved**).
