/* De Minas — tema "app". Carregar com <script src="tema-mockup.js" defer></script> no fim do <body>. */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const I = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 7h18M3 12h18M3 17h18"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.4 11h10l2-8H6"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3a9 9 0 0 0-7.8 13.500L3 21l4.700-1.200A9 9 0 1 0 12 3Z"/><path d="M9 8.500c0 3.500 3 6.500 6.500 6.500l1-2-2-1-1 .8c-1-.4-2-1.400-2.400-2.400l.8-1-1-2z" fill="currentColor" stroke="none"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-8-5-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 9c0 6-8 11-8 11Z"/></svg>'
};
// Área do administrador oculta: o link some do rodapé; acesso só por congelados.html#admin
const al = $('#admLink'); if (al) al.remove();
if (/(^|[#?&])admin\b/.test(location.hash + location.search)) return; // admin mantém layout original

const logo = ($('.hero img') || {}).src || 'logo.jpg';
const top = document.createElement('div');
top.className = 'topbar';
top.innerHTML = `<button class="ib" type="button" id="tMenu" aria-label="Ir para contato">${I.menu}</button><img src="${logo}" alt="De Minas Pão de Queijaria"><button class="ib" type="button" id="tCart" aria-label="Ver pedido">${I.cart}<span class="bdg" id="tBdg" data-n="0"></span></button>`;
document.body.prepend(top);

const ban = document.createElement('div');
ban.className = 'banner';
ban.innerHTML = `<div class="in" id="banIn"><h1>Pão de queijo mineiro de verdade.</h1><p>Muito queijo Minas artesanal. Respeito à receita e tradição.</p><button class="go" type="button" id="banGo">Ver todos os produtos</button></div>`;
top.after(ban);

const promo = document.createElement('div');
promo.className = 'promo';
promo.innerHTML = `<div class="in"><b>Combos especiais</b><span>Uma seleção de sabores para cada momento.</span><button type="button" id="prGo">Ver todos os combos</button></div>`;
$('#stick').after(promo);

const tabs = document.createElement('nav');
tabs.className = 'tabs';
tabs.setAttribute('aria-label', 'Navegação');
tabs.innerHTML = `<button type="button" class="on" data-t="home">${I.home}Início</button><button type="button" data-t="cats">${I.grid}Categorias</button><button type="button" data-t="cart">${I.cart}Carrinho<span class="bdg" id="nBdg" data-n="0"></span></button><a href="${($('#waLink') || {}).href || '#'}" target="_blank" rel="noopener">${I.wa}Pedido</a>`;
document.body.appendChild(tabs);

const openCart = () => $('#cbOpen').click();
const fire = (v) => { const q = $('#q'); q.value = v; q.dispatchEvent(new Event('input', {bubbles: true})); };
$('#tCart').onclick = openCart;
$('#tMenu').onclick = () => $('footer').scrollIntoView({behavior: 'smooth'});
$('#banGo').onclick = () => { fire(''); $('#catalog').scrollIntoView({behavior: 'smooth'}); };
$('#prGo').onclick = () => { fire('combo'); $('#catalog').scrollIntoView({behavior: 'smooth'}); };
tabs.onclick = e => {
  const b = e.target.closest('[data-t]'); if (!b) return;
  if (b.dataset.t === 'home') scrollTo({top: 0, behavior: 'smooth'});
  if (b.dataset.t === 'cats') $('#stick').scrollIntoView({behavior: 'smooth'});
  if (b.dataset.t === 'cart') openCart();
};

const favs = new Set(JSON.parse(localStorage.getItem('dm_fav') || '[]'));
function decorate() {
  document.querySelectorAll('#catalog .card:not([data-x])').forEach(c => {
    c.dataset.x = 1;
    const id = c.dataset.pid;
    const grp = c.closest('section') && (c.parentElement.previousElementSibling || {});
    const tag = grp && grp.classList && grp.classList.contains('grp') ? grp.textContent.trim() : '';
    if (tag) c.insertAdjacentHTML('afterbegin', `<span class="tagb">${tag.replace(/</g, '&lt;')}</span>`);
    c.insertAdjacentHTML('afterbegin', `<button class="fav" type="button" aria-label="Favoritar" aria-pressed="${favs.has(id)}">${I.heart}</button>`);
    const nm = $('.nm', c); if (nm) nm.insertAdjacentHTML('afterend', '<div class="frz">❄ Congelado · Pronto para assar</div>');
  });
  const img = $('#catalog .ph img');
  if (img) $('#banIn').style.backgroundImage = `linear-gradient(90deg,#3b0a10 38%,#3b0a1066),url("${img.getAttribute('src')}")`;
}
function badge() {
  const n = (($('#cbCount') || {}).textContent || '0').match(/\d+/);
  const v = n ? +n[0] : 0;
  const on = $('#cartbar').classList.contains('on');
  ['#tBdg', '#nBdg'].forEach(s => { const e = $(s); e.dataset.n = on ? v : 0; e.textContent = on ? v : ''; });
}
document.addEventListener('click', e => {
  const f = e.target.closest('.fav'); if (!f) return;
  const id = f.closest('.card').dataset.pid;
  favs.has(id) ? favs.delete(id) : favs.add(id);
  f.setAttribute('aria-pressed', favs.has(id));
  try { localStorage.setItem('dm_fav', JSON.stringify([...favs])); } catch {}
});
new MutationObserver(decorate).observe($('#catalog'), {childList: true, subtree: true});
new MutationObserver(badge).observe($('#cartbar'), {attributes: true, childList: true, subtree: true, characterData: true});
decorate(); badge();
})();
