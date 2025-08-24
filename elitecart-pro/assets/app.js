
/**
 * EliteCart — HTML/CSS/JS MVP (GitHub Pages ready)
 * - 10 categories
 * - Search, filter
 * - Add to Cart, qty edit/remove, subtotal
 * - WhatsApp redirect with order summary
 * - LocalStorage persistence
 * - Minimal theming toggle
 * Customize WHATSAPP_NUMBER below.
 */

const WHATSAPP_NUMBER = "923001112223"; // Change to your number (92 + number without 0)
const CATEGORIES = [
  "Men's Clothing",
  "Women's Clothing",
  "Men's Footwear",
  "Women's Footwear",
  "Watches & Accessories",
  "Bags & Wallets",
  "Beauty & Personal Care",
  "Electronics & Gadgets",
  "Home & Living",
  "Sports & Fitness",
];

const PRODUCTS = [
  {id:"p101", title:"Oxford Shirt — Classic Fit", price:3199, cat:"Men's Clothing", img:"https://images.unsplash.com/photo-1520975693410-001d8d3255a5?q=80&w=1200&auto=format&fit=crop"},
  {id:"p102", title:"Linen Abaya — Sand", price:5499, cat:"Women's Clothing", img:"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop"},
  {id:"p103", title:"Running Sneakers — Graphite", price:4999, cat:"Men's Footwear", img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"},
  {id:"p104", title:"Comfort Flats — Nude", price:2799, cat:"Women's Footwear", img:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop"},
  {id:"p105", title:"Stainless Watch — 42mm", price:7999, cat:"Watches & Accessories", img:"https://images.unsplash.com/photo-1516570161787-2fd917215a3d?q=80&w=1200&auto=format&fit=crop"},
  {id:"p106", title:"Slim Leather Wallet", price:1999, cat:"Bags & Wallets", img:"https://images.unsplash.com/photo-1520975682031-ae319f4bc3ab?q=80&w=1200&auto=format&fit=crop"},
  {id:"p107", title:"Matte Lipstick — 6 Pack", price:1899, cat:"Beauty & Personal Care", img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop"},
  {id:"p108", title:"True Wireless Earbuds", price:6999, cat:"Electronics & Gadgets", img:"https://images.unsplash.com/photo-1585386959984-a41552231658?q=80&w=1200&auto=format&fit=crop"},
  {id:"p109", title:"Smart RGB Bulb — 12W", price:1299, cat:"Home & Living", img:"https://images.unsplash.com/photo-1542219550-8692b017f088?q=80&w=1200&auto=format&fit=crop"},
  {id:"p110", title:"Gym Resistance Bands", price:2499, cat:"Sports & Fitness", img:"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop"},
];

// --- State
let state = {
  query: "",
  category: "All",
  cart: [], // {id, title, price, qty, img}
};

// --- Utils
const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));
const money = (n) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(n);

// LocalStorage
const CART_KEY = "elitecart_cart";
function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    state.cart = raw ? JSON.parse(raw) : [];
  } catch {
    state.cart = [];
  }
}
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

// --- Init
document.addEventListener("DOMContentLoaded", () => {
  // Year
  qs("#year").textContent = String(new Date().getFullYear());

  // Categories
  renderCategories();
  renderFooterCats();

  // Products
  renderProducts();

  // Cart
  loadCart();
  renderCart();

  // Search
  qs("#searchInput").addEventListener("input", (e) => {
    state.query = e.target.value.toLowerCase();
    renderProducts();
  });

  // Drawer open/close
  qs("#cartOpenBtn").addEventListener("click", openCart);
  qs("#cartCloseBtn").addEventListener("click", closeCart);
  qs("#drawerBackdrop").addEventListener("click", closeCart);

  // Checkout actions
  qs("#clearCart").addEventListener("click", () => {
    state.cart = [];
    saveCart();
    renderCart();
  });
  qs("#proceedCheckout").addEventListener("click", () => {
    alert("Checkout placeholder — enable COD / JazzCash / Easypaisa next.");
  });

  // Theme
  qs("#themeToggle").addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
  });
});

// --- Renderers
function renderCategories() {
  const wrap = qs("#categoryTabs");
  wrap.innerHTML = "";
  const allBtn = pill("All");
  wrap.appendChild(allBtn);
  CATEGORIES.forEach((c) => wrap.appendChild(pill(c)));

  function pill(name) {
    const b = document.createElement("button");
    b.className = "ec-pill" + (state.category === name ? " active" : "");
    b.textContent = name;
    b.addEventListener("click", () => {
      state.category = name;
      qsa(".ec-pill").forEach((el) => el.classList.remove("active"));
      b.classList.add("active");
      renderProducts();
    });
    return b;
  }
}

function renderFooterCats() {
  const ul = qs("#footerCats");
  ul.innerHTML = "";
  CATEGORIES.slice(0, 5).forEach((c) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#grid";
    a.textContent = c;
    a.addEventListener("click", () => {
      state.category = c;
      renderCategories();
      renderProducts();
    });
    li.appendChild(a);
    ul.appendChild(li);
  });
}

function renderProducts() {
  const grid = qs("#grid");
  grid.innerHTML = "";

  let list = PRODUCTS.slice();
  if (state.category !== "All") list = list.filter((p) => p.cat === state.category);
  if (state.query) list = list.filter((p) => p.title.toLowerCase().includes(state.query));

  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "ec-card";
    card.innerHTML = `
      <img class="ec-card-img" src="${p.img}" alt="${p.title}">
      <div class="ec-card-body">
        <h3 class="ec-title">${p.title}</h3>
        <p class="ec-sub">${p.cat}</p>
        <div class="ec-row">
          <div class="ec-price">${money(p.price)}</div>
          <button class="ec-add" data-id="${p.id}">Add</button>
        </div>
      </div>
    `;
    card.querySelector(".ec-add").addEventListener("click", () => addToCart(p));
    grid.appendChild(card);
  });
}

// --- Cart logic
function addToCart(p) {
  const hit = state.cart.find((i) => i.id === p.id);
  if (hit) hit.qty += 1;
  else state.cart.push({ id: p.id, title: p.title, price: p.price, qty: 1, img: p.img });
  saveCart();
  renderCart();
  openCart();
}
function removeFromCart(id) {
  state.cart = state.cart.filter((i) => i.id !== id);
  saveCart();
  renderCart();
}
function setQty(id, delta) {
  const it = state.cart.find((i) => i.id === id);
  if (!it) return;
  it.qty = Math.max(1, it.qty + delta);
  saveCart();
  renderCart();
}
function cartSubtotal() {
  return state.cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function renderCart() {
  const list = qs("#cartItems");
  list.innerHTML = "";
  if (!state.cart.length) {
    list.innerHTML = `<p class="ec-muted">Your cart is empty.</p>`;
  } else {
    state.cart.forEach((i) => {
      const row = document.createElement("div");
      row.className = "ec-item";
      row.innerHTML = `
        <img src="${i.img}" alt="${i.title}">
        <div style="flex:1; min-width:0">
          <div style="font-weight:600">${i.title}</div>
          <div class="ec-muted" style="font-size:13px">${money(i.price)}</div>
          <div class="ec-qty" style="margin-top:6px">
            <button aria-label="decrease">−</button>
            <div>${i.qty}</div>
            <button aria-label="increase">+</button>
            <button class="ec-icon-btn" style="margin-left:auto" aria-label="remove">🗑️</button>
          </div>
        </div>
      `;
      const [decBtn, , incBtn, rmBtn] = row.querySelectorAll("button");
      decBtn.addEventListener("click", () => setQty(i.id, -1));
      incBtn.addEventListener("click", () => setQty(i.id, +1));
      rmBtn.addEventListener("click", () => removeFromCart(i.id));
      list.appendChild(row);
    });
  }
  qs("#subtotal").textContent = money(cartSubtotal());
  qs("#cartCount").textContent = String(state.cart.reduce((s, i) => s + i.qty, 0));

  // WhatsApp link
  const msg = [
    `*EliteCart Order*`,
    ...state.cart.map((i) => `• ${i.title} x${i.qty} — ${money(i.price * i.qty)}`),
    ``,
    `Subtotal: ${money(cartSubtotal())}`,
    ``,
    `Name:`,
    `Address:`,
    `City:`,
    `Phone:`,
  ].join("%0A");
  qs("#waCheckout").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

// --- Drawer
function openCart() {
  qs("#cartDrawer").classList.add("open");
  qs("#drawerBackdrop").classList.add("show");
  qs("#cartDrawer").setAttribute("aria-hidden", "false");
  qs("#drawerBackdrop").setAttribute("aria-hidden", "false");
}
function closeCart() {
  qs("#cartDrawer").classList.remove("open");
  qs("#drawerBackdrop").classList.remove("show");
  qs("#cartDrawer").setAttribute("aria-hidden", "true");
  qs("#drawerBackdrop").setAttribute("aria-hidden", "true");
}
