# EliteCart — HTML/CSS/JS (GitHub Pages)

## How to deploy (super easy)
1) Go to GitHub → New repository → Name it `elitecart` (or anything).
2) Upload these three files/folders:
   - `index.html`
   - `assets/style.css`
   - `assets/app.js`
3) Settings → Pages → Set `Branch: main` and `/root` (or `/docs` if you use docs folder).
4) Wait 1–2 minutes; your site goes live at `https://<username>.github.io/<repo>/`.

## Customize
- Change WhatsApp number in `assets/app.js` (`WHATSAPP_NUMBER`).
- Edit product list in `assets/app.js` (`PRODUCTS` array).
- Edit category list in `assets/app.js` (`CATEGORIES` array).
- Tweak colors in `assets/style.css` (CSS variables at top).

## Features
- 10 categories, search, filter
- Cart with qty controls, remove, clear, subtotal
- WhatsApp checkout (order summary prefilled)
- LocalStorage persistence
- Responsive and fast
