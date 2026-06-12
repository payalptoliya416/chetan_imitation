

document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const closeMenu = document.getElementById("closeMenu");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", function () {
        mobileMenu.classList.remove("translate-x-full");
    });

    closeMenu.addEventListener("click", function () {
        mobileMenu.classList.add("translate-x-full");
    });

});


// ── Product data ──────────────────────────────────────────────
const allProducts = [
  { id:1,  name:"Rajwadi Kundan Pearl Bridal Necklace Set", price:4999, mrp:7999,  rating:4, reviews:156, sale:true,  inStock:true,  category:"necklaces", size:4.0, img:"assets/images/Royal_Bridal.png" },
  { id:2,  name:"Antique Gold Plated Temple Jewellery Set", price:3499, mrp:5999,  rating:4, reviews:156, sale:false, inStock:true,  category:"necklaces", size:5.0, img:"assets/images/Royal_Bridal.png" },
  { id:3,  name:"Royal Polki Stone Wedding Necklace",        price:5299, mrp:8499,  rating:4, reviews:156, sale:false, inStock:true,  category:"necklaces", size:6.0, img:"assets/images/Royal_Bridal.png" },
  { id:4,  name:"Designer Emerald Stone Party Necklace",     price:1499, mrp:2999,  rating:4, reviews:156, sale:false, inStock:true,  category:"necklaces", size:4.5, img:"assets/images/Royal_Bridal.png" },
  { id:5,  name:"Traditional Gold Finish Bridal Haar",       price:2299, mrp:4299,  rating:4, reviews:156, sale:false, inStock:true,  category:"necklaces", size:5.0, img:"assets/images/Royal_Bridal.png" },
  { id:6,  name:"Handcrafted Polki Pearl Choker Set",        price:4299, mrp:6999,  rating:4, reviews:156, sale:false, inStock:true,  category:"necklaces", size:7.0, img:"assets/images/Royal_Bridal.png" },
  { id:7,  name:"Traditional Meenakari Gold Plated Necklace",price:1799, mrp:3299,  rating:4, reviews:156, sale:true,  inStock:true,  category:"necklaces", size:4.0, img:"assets/images/Royal_Bridal.png" },
  { id:8,  name:"Elegant American Diamond Party Set",        price:4499, mrp:4499,  rating:4, reviews:156, sale:false, inStock:true,  category:"necklaces", size:6.5, img:"assets/images/Royal_Bridal.png" },
  { id:9,  name:"Royal Antique Kundan Temple Set",           price:5999, mrp:9499,  rating:4, reviews:156, sale:false, inStock:false, category:"necklaces", size:8.0, img:"assets/images/Royal_Bridal.png" },
  { id:10, name:"Bridal Kundan Choker Long Haaram",          price:6499, mrp:9999,  rating:5, reviews:200, sale:true,  inStock:true,  category:"necklaces", size:5.0, img:"assets/images/Royal_Bridal.png" },
  { id:11, name:"Oxidised Silver Look Tribal Necklace",      price:1299, mrp:1999,  rating:3, reviews:88,  sale:false, inStock:true,  category:"shortneck",  size:4.0, img:"assets/images/Royal_Bridal.png" },
  { id:12, name:"Pearl Drop Long Chain Necklace",            price:2199, mrp:3499,  rating:4, reviews:134, sale:false, inStock:true,  category:"longneck",   size:6.0, img:"assets/images/Royal_Bridal.png" },
  { id:13, name:"Gold Plated Bangal Kadali Set",             price:1899, mrp:3199,  rating:4, reviews:112, sale:true,  inStock:true,  category:"bangal",     size:4.0, img:"assets/images/Royal_Bridal.png" },
  { id:14, name:"Antique Hathful Set for Weddings",          price:3299, mrp:5500,  rating:4, reviews:95,  sale:false, inStock:false, category:"hathful",    size:7.0, img:"assets/images/Royal_Bridal.png" },
  { id:15, name:"Kundan Mangalsutra with Pendant",           price:2499, mrp:4199,  rating:5, reviews:67,  sale:false, inStock:true,  category:"mangalsutra",size:5.0, img:"assets/images/Royal_Bridal.png" },
  { id:16, name:"Statement Jhumka Pendal Set",               price:999,  mrp:1699,  rating:4, reviews:200, sale:true,  inStock:true,  category:"pendal",     size:4.0, img:"assets/images/Royal_Bridal.png" },
  { id:17, name:"Designer Ring Set – Meenakari Gold",        price:799,  mrp:1299,  rating:4, reviews:145, sale:false, inStock:true,  category:"ring",       size:5.0, img:"assets/images/Royal_Bridal.png" },
  { id:18, name:"Juda Kandora Traditional Bridal Set",       price:3999, mrp:6499,  rating:5, reviews:178, sale:true,  inStock:true,  category:"juda",       size:6.0, img:"assets/images/Royal_Bridal.png" },
];
 
// ── State ─────────────────────────────────────────────────────
let state = {
  page: 1,
  perPage: 9,
  sort: 'default',
  priceMin: 0,
  priceMax: 10000,
  selectedCats: [],
  selectedSizes: [],
  showOutOfStock: true,
  wishlist: new Set(),
};
 
// ── Helpers ───────────────────────────────────────────────────
function stars(n) {
  return Array.from({length:5},(_,i)=>`<span style="color:${i<n?'#e2a000':'#ddd'}">★</span>`).join('');
}
function fmt(n){ return n.toLocaleString('en-IN'); }
 
// ── Toggle sidebar section ────────────────────────────────────
function toggleSection(id, arrowId) {
  const el = document.getElementById(id);
  const arr = document.getElementById(arrowId);
  el.classList.toggle('hidden');
  arr.classList.toggle('open');
}
 
// ── Range slider sync ─────────────────────────────────────────
function rangeSlide(which) {
  let min = +document.getElementById('minRange').value;
  let max = +document.getElementById('maxRange').value;
  if (which === 'min' && min > max) { min = max; document.getElementById('minRange').value = min; }
  if (which === 'max' && max < min) { max = min; document.getElementById('maxRange').value = max; }
  document.getElementById('minPriceInput').value = min;
  document.getElementById('maxPriceInput').value = max;
  document.getElementById('rangeMin').textContent = fmt(min);
  document.getElementById('rangeMax').textContent = fmt(max);
  const pct1 = (min/10000)*100, pct2 = (max/10000)*100;
  document.getElementById('rangeTrack').style.left = pct1+'%';
  document.getElementById('rangeTrack').style.right = (100-pct2)+'%';
  state.priceMin = min; state.priceMax = max; state.page = 1; render();
}
function syncFromInput(which) {
  let min = +document.getElementById('minPriceInput').value;
  let max = +document.getElementById('maxPriceInput').value;
  if (which==='min') { min = Math.min(min, max); document.getElementById('minRange').value = min; }
  if (which==='max') { max = Math.max(max, min); document.getElementById('maxRange').value = max; }
  document.getElementById('rangeMin').textContent = fmt(min);
  document.getElementById('rangeMax').textContent = fmt(max);
  const pct1 = (min/10000)*100, pct2 = (max/10000)*100;
  document.getElementById('rangeTrack').style.left = pct1+'%';
  document.getElementById('rangeTrack').style.right = (100-pct2)+'%';
  state.priceMin = min; state.priceMax = max; state.page = 1; render();
}
 
// ── Category filter ───────────────────────────────────────────
function filterByCategory(cb, cat) {
  if (cb.checked) { if (!state.selectedCats.includes(cat)) state.selectedCats.push(cat); }
  else { state.selectedCats = state.selectedCats.filter(c=>c!==cat); }
  state.page=1; render();
}
function filterSub(cb) { state.page=1; render(); }
 
// ── Size filter ───────────────────────────────────────────────
function filterSize(cb) {
  const v = parseFloat(cb.value);
  if (cb.checked) { if (!state.selectedSizes.includes(v)) state.selectedSizes.push(v); }
  else { state.selectedSizes = state.selectedSizes.filter(s=>s!==v); }
  state.page=1; render();
}
 
// ── Stock filter ──────────────────────────────────────────────
function stockFilter(mode, btn) {
  state.showOutOfStock = (mode==='show');
  document.querySelectorAll('.stock-btn-grp button').forEach(b=>b.classList.remove('bg-amber-600','text-white'));
  btn.classList.add('bg-amber-600','text-white');
  state.page=1; render();
}
 
// ── Sort ──────────────────────────────────────────────────────
function sortProducts() {
  state.sort = document.getElementById('sortSelect').value;
  state.page=1; render();
}
 
// ── Wishlist ──────────────────────────────────────────────────
function toggleWish(id) {
  if (state.wishlist.has(id)) state.wishlist.delete(id);
  else state.wishlist.add(id);
  render();
}
 
// ── Add to cart ───────────────────────────────────────────────
function addToCart(id, btn) {
  btn.textContent = '✓ Added';
  btn.classList.add('bg-amber-600','text-white');
  setTimeout(()=>{ btn.textContent='Add to Cart'; btn.classList.remove('bg-amber-600','text-white'); }, 1500);
}
 
// ── Clear filters ─────────────────────────────────────────────
function clearAllFilters() {
  state.selectedCats=[]; state.selectedSizes=[];
  state.priceMin=0; state.priceMax=10000; state.showOutOfStock=true; state.page=1;
  document.querySelectorAll('input[type=checkbox]').forEach(cb=>cb.checked=false);
  document.getElementById('minRange').value=0; document.getElementById('maxRange').value=10000;
  document.getElementById('minPriceInput').value=0; document.getElementById('maxPriceInput').value=10000;
  document.getElementById('rangeMin').textContent='0'; document.getElementById('rangeMax').textContent='10,000';
  document.getElementById('rangeTrack').style.left='0%'; document.getElementById('rangeTrack').style.right='0%';
  render();
}
 
// ── Filter & sort products ────────────────────────────────────
function getFiltered() {
  let list = [...allProducts];
  // Price
  list = list.filter(p=>p.price>=state.priceMin && p.price<=state.priceMax);
  // Category
  if (state.selectedCats.length) list = list.filter(p=>state.selectedCats.includes(p.category));
  // Size
  if (state.selectedSizes.length) list = list.filter(p=>state.selectedSizes.includes(p.size));
  // Stock
  if (!state.showOutOfStock) list = list.filter(p=>p.inStock);
  // Sort
  if (state.sort==='price-low') list.sort((a,b)=>a.price-b.price);
  else if (state.sort==='price-high') list.sort((a,b)=>b.price-a.price);
  else if (state.sort==='newest') list.sort((a,b)=>b.id-a.id);
  else if (state.sort==='popular') list.sort((a,b)=>b.reviews-a.reviews);
  return list;
}
 
// ── Render ────────────────────────────────────────────────────
function render() {
  const filtered = getFiltered();
  const total = filtered.length;
  const totalPages = Math.ceil(total/state.perPage);
  if (state.page > totalPages) state.page = Math.max(1, totalPages);
  const start = (state.page-1)*state.perPage;
  const pageItems = filtered.slice(start, start+state.perPage);
 
  // Count
  document.getElementById('resultCount').textContent =
    total ? `Showing ${start+1}–${Math.min(start+state.perPage,total)} of ${total} results` : 'No results found';
 
  // Grid
  const grid = document.getElementById('productGrid');
  const noRes = document.getElementById('noResults');
  if (!pageItems.length) { grid.innerHTML=''; noRes.classList.remove('hidden'); }
  else {
    noRes.classList.add('hidden');
    grid.innerHTML = pageItems.map(p=>`
      <div class="product-card bg-white border border-gray-100 rounded-lg overflow-hidden relative group"
           data-id="${p.id}" data-price="${p.price}" data-instock="${p.inStock}">
        ${p.sale ? '<div class="sale-badge">SALE</div>' : ''}
        <!-- Wish -->
        <button onclick="toggleWish(${p.id})"
          class="wish-btn absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-base ${state.wishlist.has(p.id)?'active':'text-gray-400'}">
          ${state.wishlist.has(p.id)?'♥':'♡'}
        </button>
        <!-- Image -->
        <div class="overflow-hidden h-[200px] bg-gray-50">
          <img src="${p.img}" alt="${p.name}"
            class="w-full h-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy" onerror="this.src='asstes/images/Royal_Bridal.png'" />
        </div>
        <!-- Info -->
        <div class="p-3">
          <p class="text-[13px] font-medium text-gray-800 leading-snug mb-1 line-clamp-2 h-9">${p.name}</p>
          <div class="flex items-center gap-1 mb-1">
            <span class="text-xs stars">${stars(p.rating)}</span>
            <span class="text-xs text-gray-400">(${p.reviews})</span>
          </div>
          <div class="flex items-center gap-2 mb-3">
            <span class="text-base font-bold text-gray-900">₹${fmt(p.price)}</span>
            ${p.mrp>p.price ? `<span class="text-xs text-gray-400 line-through">₹${fmt(p.mrp)}</span>` : ''}
            ${p.mrp>p.price ? `<span class="text-xs text-green-600 font-medium">${Math.round((1-p.price/p.mrp)*100)}% off</span>` : ''}
          </div>
          ${!p.inStock
            ? '<p class="text-xs text-red-500 font-medium mb-2">Out of Stock</p>'
            : ''}
          <button onclick="addToCart(${p.id},this)"
            class="atc-btn w-full py-2 text-xs font-semibold rounded transition-colors ${!p.inStock?'opacity-50 cursor-not-allowed':''}"
            ${!p.inStock?'disabled':''}>
            Add to Cart
          </button>
        </div>
      </div>
    `).join('');
  }
 
  // Pagination
  renderPagination(totalPages);
}
 
function renderPagination(totalPages) {
  const pg = document.getElementById('pagination');
  if (totalPages <= 1) { pg.innerHTML=''; return; }
 
  let html = '';
  // Prev
  html += `<button class="page-btn ${state.page===1?'opacity-40 cursor-not-allowed':''}" onclick="${state.page>1?'goPage('+(state.page-1)+')':''}">‹ Prev</button>`;
 
  // Pages (smart window)
  let pages=[];
  if(totalPages<=7) { for(let i=1;i<=totalPages;i++) pages.push(i); }
  else {
    pages=[1];
    if(state.page>3) pages.push('…');
    for(let i=Math.max(2,state.page-1);i<=Math.min(totalPages-1,state.page+1);i++) pages.push(i);
    if(state.page<totalPages-2) pages.push('…');
    pages.push(totalPages);
  }
  pages.forEach(p=>{
    if(p==='…') html+=`<span class="page-btn border-0 text-gray-400">…</span>`;
    else html+=`<button class="page-btn ${p===state.page?'active':''}" onclick="goPage(${p})">${p}</button>`;
  });
 
  // Next
  html += `<button class="page-btn ${state.page===totalPages?'opacity-40 cursor-not-allowed':''}" onclick="${state.page<totalPages?'goPage('+(state.page+1)+')':''}">Next ›</button>`;
 
  pg.innerHTML = html;
}
 
function goPage(n) {
  state.page = n;
  render();
  window.scrollTo({top:0, behavior:'smooth'});
}
 
// ── Init ──────────────────────────────────────────────────────
render();