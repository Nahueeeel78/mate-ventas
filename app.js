import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
  getFirestore, collection, doc, getDoc, getDocs, setDoc,
  updateDoc, deleteDoc, addDoc, onSnapshot, writeBatch
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

/* ---------- Firebase ---------- */
const firebaseConfig = {
  apiKey: "AIzaSyDed7h1ulwgyxIpqrRNmsILGf9nkZo2AQ0",
  authDomain: "mate-ventas.firebaseapp.com",
  projectId: "mate-ventas",
  storageBucket: "mate-ventas.firebasestorage.app",
  messagingSenderId: "458941926646",
  appId: "1:458941926646:web:373ff64b4528b3e86730d7",
  measurementId: "G-D0SQNMC8QE"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productsCol = collection(db, "products");
const reservasCol = collection(db, "reservas");
const configDoc = doc(db, "config", "admin");

/* ---------- Estado en memoria (se llena solo, en vivo, desde Firestore) ---------- */
let products = [];
let reservas = [];
let activeCategory = "Todos";
let currentProduct = null;
let selectedVariantId = null;
let adminOpen = false;
let mpAlias = "";
let waNumber = "+54 9 11 7036-1019";
let cart = [];
let cartName = "";
let viewMode = localStorage.getItem("mate_view_mode") || "grid";

/* ---------- Utilidades ---------- */
const fmt = n => "$" + Number(n).toLocaleString("es-AR");
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function isSinStock(product){
  return product.variants.every(v => v.reserved);
}
function availableCount(product){
  return product.variants.filter(v => !v.reserved).length;
}
function toast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>t.classList.remove("show"), 2200);
}
function waLink(message){
  const digits = waNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
function cartCount(){ return cart.reduce((s,i)=>s+i.qty,0); }
function cartTotal(){ return cart.reduce((s,i)=>s+i.qty*i.price,0); }
function updateCartBadge(){
  const badge = $("#cart-badge");
  const n = cartCount();
  badge.textContent = n;
  badge.style.display = n > 0 ? "flex" : "none";
}
function resizeImageFile(file, maxSize = 900, quality = 0.75){
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if(width > maxSize || height > maxSize){
          const ratio = Math.min(maxSize/width, maxSize/height);
          width = Math.round(width*ratio); height = Math.round(height*ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ---------- Splash ---------- */
window.addEventListener("load", () => {
  setTimeout(() => { $("#splash").classList.add("hide"); }, 1400);
});

/* ---------- Seed inicial (solo si la colección está vacía) ---------- */
async function seedIfEmpty(){
  const snap = await getDocs(productsCol);
  if(!snap.empty) return;
  const batch = writeBatch(db);
  SEED_PRODUCTS.forEach(p => {
    const { id, ...rest } = p;
    batch.set(doc(db, "products", id), rest);
  });
  await batch.commit();
}
async function bootstrapConfig(){
  const snap = await getDoc(configDoc);
  if(snap.exists() && snap.data().waNumber) return;
  await setDoc(configDoc, { waNumber: "+54 9 11 7036-1019" }, { merge: true });
}

/* ---------- Suscripciones en tiempo real ---------- */
onSnapshot(productsCol, snap => {
  products = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  renderTabs();
  renderGrid();
  if(adminOpen) renderAdminProducts();
  if(currentProduct){
    const updated = products.find(p => p.id === currentProduct.id);
    if(updated){ currentProduct = updated; if($("#overlay-product").classList.contains("show")) renderProductSheet(); }
  }
  if($("#overlay-cart").classList.contains("show")) renderCart();
});
onSnapshot(reservasCol, snap => {
  reservas = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a,b) => (b.createdAt||"").localeCompare(a.createdAt||""));
  if(adminOpen) renderAdminReservas();
});
onSnapshot(configDoc, snap => {
  const data = snap.exists() ? snap.data() : {};
  mpAlias = data.mpAlias || "";
  waNumber = data.waNumber || "+54 9 11 7036-1019";
  if(currentProduct && $("#overlay-product").classList.contains("show")) renderProductSheet();
  const aliasInput = $("#admin-mpalias-input");
  if(aliasInput && document.activeElement !== aliasInput) aliasInput.value = mpAlias;
  const waInput = $("#admin-wa-input");
  if(waInput && document.activeElement !== waInput) waInput.value = waNumber;
});

/* ---------- Render catálogo ---------- */
function categories(){
  const set = new Set(products.map(p => p.category));
  return ["Todos", ...Array.from(set)];
}
function renderTabs(){
  const wrap = $("#tabs");
  wrap.innerHTML = "";
  categories().forEach(cat => {
    const b = document.createElement("button");
    b.className = "tab" + (cat === activeCategory ? " active" : "");
    b.textContent = cat;
    b.onclick = () => { activeCategory = cat; renderTabs(); renderGrid(); };
    wrap.appendChild(b);
  });
}
function renderGrid(){
  const grid = $("#grid");
  const list = products.filter(p => activeCategory === "Todos" || p.category === activeCategory);
  grid.className = "grid" + (viewMode !== "grid" ? ` ${viewMode}-view` : "");
  grid.innerHTML = "";
  if(list.length === 0){
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <div class="glyph">🧉</div>
      <div>Todavía no hay productos en esta categoría.</div>
    </div>`;
    return;
  }
  list.forEach(p => {
    const sinStock = isSinStock(p);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="thumb">
        <img src="${p.img}" alt="${p.title}" loading="lazy">
        ${p.kit ? '<div class="kit-tag">Kit</div>' : ''}
        ${!sinStock ? `<div class="stock-tag">${availableCount(p)} disp.</div>` : ''}
        ${sinStock ? '<div class="stamp"><span>Sin Stock</span></div>' : ''}
      </div>
      <div class="info">
        <div class="title">${p.title}</div>
        <div class="variants-left">${p.variants.length > 1 ? p.variants.length + ' colores/variantes' : ''}</div>
        ${viewMode === "details" && p.desc ? `<div class="desc-preview">${p.desc}</div>` : ''}
        <div class="price">${fmt(p.price)}</div>
      </div>`;
    card.onclick = () => openProduct(p.id);
    grid.appendChild(card);
  });
}
function setViewMode(mode){
  viewMode = mode;
  localStorage.setItem("mate_view_mode", mode);
  $$(".view-btn").forEach(b => b.classList.toggle("active", b.dataset.view === mode));
  renderGrid();
}

/* ---------- Modal producto / reserva ---------- */
function openProduct(id){
  currentProduct = products.find(p => p.id === id);
  const firstFree = currentProduct.variants.find(v => !v.reserved);
  selectedVariantId = firstFree ? firstFree.id : currentProduct.variants[0].id;
  renderProductSheet();
  $("#overlay-product").classList.add("show");
}
function closeProductSheet(){
  $("#overlay-product").classList.remove("show");
  currentProduct = null;
}
function renderProductSheet(){
  const p = currentProduct;
  const sinStock = isSinStock(p);
  $("#sheet-product").innerHTML = `
    <div class="drag"></div>
    <img class="modal-img" src="${p.img}" alt="${p.title}">
    <h2>${p.title}</h2>
    <div class="price-row"><span class="price">${fmt(p.price)}</span>${p.kit ? '<span class="kit-tag" style="position:static">Kit</span>' : ''}</div>
    <div class="desc">${p.desc || ""}</div>

    ${p.variants.length > 1 ? `
    <div class="field">
      <label>Color / variante</label>
      <div class="variant-grid" id="variant-grid"></div>
    </div>` : ""}

    ${sinStock ? `<div class="alert-nostock">⚠ Sin stock disponible en este producto</div>` : `
    <div class="field">
      <label>Cantidad</label>
      <div class="qty-row">
        <button type="button" id="qty-minus">−</button>
        <span id="qty-val">1</span>
        <button type="button" id="qty-plus">+</button>
      </div>
    </div>
    <button type="button" class="btn btn-primary" id="btn-add-cart">Agregar al carrito</button>
    `}
  `;
  if(p.variants.length > 1) renderVariantChips();
  if(!sinStock){
    let qty = 1;
    const qtyVal = $("#qty-val");
    $("#qty-minus").onclick = () => { if(qty>1){qty--; qtyVal.textContent=qty;} };
    $("#qty-plus").onclick = () => { qty++; qtyVal.textContent=qty; };
    $("#btn-add-cart").onclick = () => {
      const variant = currentProduct.variants.find(v => v.id === selectedVariantId);
      const existing = cart.find(i => i.productId === currentProduct.id && i.variantId === variant.id);
      if(existing){ existing.qty += qty; }
      else{
        cart.push({
          productId: currentProduct.id, productTitle: currentProduct.title,
          variantId: variant.id, variantLabel: variant.label,
          price: currentProduct.price, img: currentProduct.img, qty
        });
      }
      updateCartBadge();
      toast(`Agregado al carrito (${cartCount()})`);
      closeProductSheet();
    };
  }
}
function renderVariantChips(){
  const wrap = $("#variant-grid");
  wrap.innerHTML = "";
  currentProduct.variants.forEach(v => {
    const chip = document.createElement("div");
    chip.className = "variant-chip" + (v.id===selectedVariantId ? " selected":"") + (v.reserved ? " reserved":"");
    chip.textContent = v.label + (v.reserved ? " ✕" : "");
    chip.onclick = () => {
      if(v.reserved) return;
      selectedVariantId = v.id;
      renderVariantChips();
    };
    wrap.appendChild(chip);
  });
}
async function checkoutCart(status){
  const name = $("#cart-name") ? $("#cart-name").value.trim() : "";
  if(!name){ toast("Completá tu nombre"); return; }
  if(cart.length === 0){ toast("El carrito está vacío"); return; }

  // Revalidar stock en vivo antes de confirmar (por si alguien reservó mientras tanto)
  if(status === "confirmada"){
    const blocked = [];
    for(const item of cart){
      const prod = products.find(p => p.id === item.productId);
      const v = prod && prod.variants.find(v => v.id === item.variantId);
      if(!v || v.reserved) blocked.push(item);
    }
    if(blocked.length){
      cart = cart.filter(i => !blocked.includes(i));
      updateCartBadge();
      renderCart();
      toast(`${blocked[0].variantLabel} ya fue reservado por otra persona, lo saqué del carrito`);
      return;
    }
  }

  const items = cart.map(i => ({
    productId: i.productId, productTitle: i.productTitle,
    variantId: i.variantId, variantLabel: i.variantLabel,
    qty: i.qty, price: i.price
  }));
  const reserva = {
    name, items, total: cartTotal(), status,
    createdAt: new Date().toISOString()
  };
  try{
    await addDoc(reservasCol, reserva);
    if(status === "confirmada"){
      for(const item of cart){
        await setVariantReserved(item.productId, item.variantId, true);
      }
    }
    const lines = cart.map(i => `- ${i.productTitle} (${i.variantLabel}) x${i.qty} — ${fmt(i.qty*i.price)}`).join("\n");
    const msg = status === "confirmada"
      ? `Hola! Soy ${name}. RESERVADO:\n${lines}\nTotal: ${fmt(cartTotal())}\nYa está reservado, ahora te transfiero.`
      : `Hola! Soy ${name}. Quiero consultar por:\n${lines}\nTotal: ${fmt(cartTotal())}`;
    cart = [];
    updateCartBadge();
    closeCart();
    toast(status === "confirmada" ? "¡Reservado! Se abre WhatsApp para avisar." : "Guardado como borrador");
    window.open(waLink(msg), "_blank");
  }catch(err){
    console.error(err);
    toast("No se pudo guardar. Revisá tu conexión.");
  }
}
async function setVariantReserved(productId, variantId, reserved){
  const prod = products.find(p => p.id === productId);
  if(!prod) return;
  const newVariants = prod.variants.map(v => v.id === variantId ? { ...v, reserved } : v);
  await updateDoc(doc(db, "products", productId), { variants: newVariants });
}

/* ---------- Carrito ---------- */
function openCart(){
  renderCart();
  $("#overlay-cart").classList.add("show");
}
function closeCart(){
  $("#overlay-cart").classList.remove("show");
}
function renderCart(){
  const wrap = $("#sheet-cart");
  if(cart.length === 0){
    wrap.innerHTML = `
      <div class="drag"></div>
      <h2>Tu carrito</h2>
      <div class="empty-state" style="padding:30px 0;">
        <div class="glyph">🛒</div>
        <div>Todavía no agregaste productos.</div>
      </div>`;
    return;
  }
  wrap.innerHTML = `
    <div class="drag"></div>
    <h2>Tu carrito</h2>
    <div id="cart-items"></div>
    <div class="cart-total-row">
      <span class="label">Total</span>
      <span class="amount">${fmt(cartTotal())}</span>
    </div>
    <div class="field">
      <label>Tu nombre</label>
      <input id="cart-name" type="text" placeholder="Nombre y apellido" value="${cartName}">
    </div>
    ${mpAlias ? `
    <div class="mp-info">
      <span>Transferí a este alias de Mercado Pago:</span>
      <strong>${mpAlias}</strong>
    </div>` : `
    <div class="alert-nostock">⚠ La dueña todavía no cargó su alias de Mercado Pago</div>
    `}
    <div class="btn-row">
      <button class="btn btn-secondary" id="btn-cart-borrador">Guardar borrador</button>
      <button class="btn btn-primary" id="btn-cart-reservar">Reservar todo</button>
    </div>
  `;
  const itemsWrap = $("#cart-items");
  cart.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${item.img}" alt="">
      <div class="meta">
        <div class="t">${item.productTitle}</div>
        <div class="v">${item.variantLabel}</div>
        <div class="sub">${fmt(item.price)} × ${item.qty} = ${fmt(item.price*item.qty)}</div>
      </div>
      <div class="cart-qty">
        <button type="button" data-minus="${idx}">−</button>
        <span>${item.qty}</span>
        <button type="button" data-plus="${idx}">+</button>
      </div>
      <button type="button" class="cart-remove" data-remove="${idx}">✕</button>
    `;
    itemsWrap.appendChild(row);
  });
  itemsWrap.querySelectorAll('[data-minus]').forEach(b => b.onclick = () => {
    const i = Number(b.dataset.minus);
    if(cart[i].qty > 1){ cart[i].qty--; } else { cart.splice(i,1); }
    updateCartBadge(); renderCart();
  });
  itemsWrap.querySelectorAll('[data-plus]').forEach(b => b.onclick = () => {
    const i = Number(b.dataset.plus);
    cart[i].qty++;
    updateCartBadge(); renderCart();
  });
  itemsWrap.querySelectorAll('[data-remove]').forEach(b => b.onclick = () => {
    cart.splice(Number(b.dataset.remove), 1);
    updateCartBadge(); renderCart();
  });
  $("#cart-name").oninput = e => cartName = e.target.value;
  $("#btn-cart-borrador").onclick = () => checkoutCart("borrador");
  $("#btn-cart-reservar").onclick = () => checkoutCart("confirmada");
}

/* ---------- Admin: acceso por PIN (guardado en Firestore, compartido) ---------- */
async function openAdmin(){
  let snap;
  try{ snap = await getDoc(configDoc); }
  catch(err){ toast("No se pudo conectar. Revisá tu conexión."); return; }

  let pin = snap.exists() ? snap.data().pin : null;
  if(!pin){
    const setPin = prompt("Primera vez: creá un PIN de 4 dígitos para administrar la app");
    if(!setPin) return;
    await setDoc(configDoc, { pin: setPin }, { merge: true });
    pin = setPin;
    toast("PIN creado. Guardalo bien.");
  }
  const entered = prompt("PIN de administración");
  if(entered !== pin){ if(entered!==null) toast("PIN incorrecto"); return; }
  adminOpen = true;
  renderAdmin();
  $("#overlay-admin").classList.add("show");
}
function closeAdmin(){ $("#overlay-admin").classList.remove("show"); adminOpen = false; }

function renderAdmin(){
  const wrap = $("#sheet-admin");
  wrap.innerHTML = `
    <div class="drag"></div>
    <h2>Panel de la dueña</h2>
    <div class="admin-section">
      <h3>Tu alias de Mercado Pago</h3>
      <div class="field">
        <label>Los compradores van a ver este alias para transferirte</label>
        <input id="admin-mpalias-input" type="text" placeholder="tu.alias.mp" value="${mpAlias}">
      </div>
      <button class="btn btn-secondary" id="admin-mpalias-save">Guardar alias</button>
    </div>

    <div class="admin-section">
      <h3>Tu WhatsApp</h3>
      <div class="field">
        <label>A este número te van a escribir con nombre y comprobante</label>
        <input id="admin-wa-input" type="text" placeholder="+54 9 11 1234-5678" value="${waNumber}">
      </div>
      <button class="btn btn-secondary" id="admin-wa-save">Guardar WhatsApp</button>
    </div>

    <div class="admin-section">
      <h3>Agregar producto nuevo</h3>
      <div class="field"><label>Título</label><input id="np-title" type="text" placeholder="Ej: Termo 1L negro"></div>
      <div class="field"><label>Precio</label><input id="np-price" type="number" placeholder="Ej: 30000"></div>
      <div class="field"><label>Categoría</label><input id="np-cat" type="text" placeholder="Ej: Termos, Kits, Vasos..."></div>
      <div class="field"><label>Foto</label><input id="np-img" type="file" accept="image/*"></div>
      <div class="field"><label>Variantes / colores (separados por coma)</label><input id="np-variants" type="text" placeholder="Ej: Negro, Rojo, Azul"></div>
      <div class="field">
        <label style="display:flex;align-items:center;gap:8px;text-transform:none;">
          <input id="np-kit" type="checkbox" style="width:auto;"> Es un kit / set completo
        </label>
      </div>
      <button class="btn btn-primary" id="np-save">Publicar producto</button>
    </div>

    <div class="admin-section">
      <h3>Productos y stock</h3>
      <div id="admin-products"></div>
    </div>

    <div class="admin-section">
      <h3>Reservas (${reservas.length})</h3>
      <div id="admin-reservas"></div>
    </div>
  `;
  $("#np-save").onclick = createProductFromForm;
  $("#admin-mpalias-save").onclick = async () => {
    const val = $("#admin-mpalias-input").value.trim();
    try{
      await setDoc(configDoc, { mpAlias: val }, { merge: true });
      toast("Alias guardado");
    }catch(err){
      console.error(err);
      toast("No se pudo guardar. Revisá tu conexión.");
    }
  };
  $("#admin-wa-save").onclick = async () => {
    const val = $("#admin-wa-input").value.trim();
    try{
      await setDoc(configDoc, { waNumber: val }, { merge: true });
      toast("WhatsApp guardado");
    }catch(err){
      console.error(err);
      toast("No se pudo guardar. Revisá tu conexión.");
    }
  };
  renderAdminProducts();
  renderAdminReservas();
}
function renderAdminProducts(){
  const el = $("#admin-products");
  if(!el) return;
  el.innerHTML = "";
  products.forEach(p => {
    const row = document.createElement("div");
    row.className = "admin-list-item";
    row.innerHTML = `
      <img src="${p.img}" alt="">
      <div class="meta">
        <div class="t">${p.title}</div>
        <div class="p">${fmt(p.price)} · ${p.category}${isSinStock(p) ? ' · SIN STOCK':''}</div>
      </div>
      <button class="chip-x" data-del="${p.id}">Borrar</button>
    `;
    el.appendChild(row);
    const vrow = document.createElement("div");
    vrow.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;margin:-2px 0 10px 4px;";
    p.variants.forEach(v => {
      const c = document.createElement("span");
      c.className = "chip-x" + (v.reserved ? " is-reserved" : "");
      c.textContent = v.label + (v.reserved ? " ✕" : " ✓");
      c.onclick = () => setVariantReserved(p.id, v.id, !v.reserved);
      vrow.appendChild(c);
    });
    el.appendChild(vrow);
  });
  el.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => {
    if(!confirm("¿Eliminar este producto del catálogo?")) return;
    await deleteDoc(doc(db, "products", b.dataset.del));
  });
}
function renderAdminReservas(){
  const el = $("#admin-reservas");
  if(!el) return;
  el.innerHTML = "";
  if(reservas.length === 0){
    el.innerHTML = `<div class="empty-state" style="padding:20px 0;">Todavía no hay reservas.</div>`;
    return;
  }
  reservas.forEach(r => {
    const card = document.createElement("div");
    card.className = "res-card";
    const itemsHtml = r.items
      ? r.items.map(i => `${i.productTitle} — ${i.variantLabel} × ${i.qty}`).join("<br>")
      : `${r.productTitle} — ${r.variantLabel} × ${r.qty}`;
    const totalHtml = r.total ? `<div class="detail" style="font-weight:600;color:var(--rust)">Total: ${fmt(r.total)}</div>` : "";
    card.innerHTML = `
      <div class="top-row">
        <span class="who">${r.name}</span>
        <span class="status ${r.status}">${r.status}</span>
      </div>
      <div class="detail">${itemsHtml}</div>
      ${totalHtml}
      <div class="actions">
        ${r.status === "borrador" ? `<button data-confirm="${r.id}">Confirmar</button>` : ""}
        <button data-del="${r.id}">Eliminar</button>
      </div>
    `;
    el.appendChild(card);
  });
  el.querySelectorAll('[data-confirm]').forEach(b => b.onclick = async () => {
    const r = reservas.find(x => x.id === b.dataset.confirm);
    await updateDoc(doc(db, "reservas", r.id), { status: "confirmada" });
    const items = r.items || [{ productId: r.productId, variantId: r.variantId }];
    for(const item of items){
      await setVariantReserved(item.productId, item.variantId, true);
    }
    toast("Reserva confirmada");
  });
  el.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => {
    if(!confirm("¿Eliminar esta reserva?")) return;
    await deleteDoc(doc(db, "reservas", b.dataset.del));
    toast("Reserva eliminada");
  });
}
async function createProductFromForm(){
  const title = $("#np-title").value.trim();
  const price = Number($("#np-price").value);
  const cat = $("#np-cat").value.trim() || "Otros";
  const kit = $("#np-kit").checked;
  const variantsRaw = $("#np-variants").value.trim();
  const fileInput = $("#np-img");
  if(!title || !price){ toast("Completá título y precio"); return; }

  const variants = variantsRaw
    ? variantsRaw.split(",").map((s,i)=>({id:"v"+i, label:s.trim(), reserved:false})).filter(v=>v.label)
    : [{id:"u1", label:"Único", reserved:false}];

  const saveBtn = $("#np-save");
  saveBtn.disabled = true; saveBtn.textContent = "Publicando...";

  let imgSrc = "images/convector-oryx.jpg";
  if(fileInput.files && fileInput.files[0]){
    imgSrc = await resizeImageFile(fileInput.files[0]);
  }
  try{
    await addDoc(productsCol, { title, price, category: cat, kit, desc: "", img: imgSrc, variants });
    toast("Producto publicado");
    $("#np-title").value=""; $("#np-price").value=""; $("#np-cat").value=""; $("#np-variants").value=""; $("#np-kit").checked=false; fileInput.value="";
  }catch(err){
    console.error(err);
    toast("No se pudo publicar. Revisá tu conexión.");
  }finally{
    saveBtn.disabled = false; saveBtn.textContent = "Publicar producto";
  }
}

/* ---------- Init ---------- */
seedIfEmpty();
bootstrapConfig();
$("#btn-admin").onclick = openAdmin;
$("#btn-cart").onclick = openCart;
$("#overlay-product").onclick = e => { if(e.target.id === "overlay-product") closeProductSheet(); };
$("#overlay-admin").onclick = e => { if(e.target.id === "overlay-admin") closeAdmin(); };
$("#overlay-cart").onclick = e => { if(e.target.id === "overlay-cart") closeCart(); };
$$(".view-btn").forEach(b => {
  b.classList.toggle("active", b.dataset.view === viewMode);
  b.onclick = () => setViewMode(b.dataset.view);
});
$("#btn-wa-float").onclick = e => {
  e.preventDefault();
  window.open(waLink("Hola! Tengo una consulta sobre los productos."), "_blank");
};
$("#footer-wa").onclick = e => {
  e.preventDefault();
  window.open(waLink("Hola! Tengo una consulta sobre los productos."), "_blank");
};

/* ---------- Acceso oculto al panel: tocar el logo 5 veces ---------- */
const ADMIN_REVEAL_KEY = "mate_admin_revealed";
if(localStorage.getItem(ADMIN_REVEAL_KEY) === "1"){
  $("#btn-admin").style.display = "";
}
let logoTaps = 0, logoTapTimer = null;
$("#brand-wrap").addEventListener("click", () => {
  logoTaps++;
  clearTimeout(logoTapTimer);
  logoTapTimer = setTimeout(() => { logoTaps = 0; }, 2500);
  if(logoTaps >= 5){
    logoTaps = 0;
    localStorage.setItem(ADMIN_REVEAL_KEY, "1");
    $("#btn-admin").style.display = "";
    toast("Panel de administración habilitado en este celular");
  }
});
