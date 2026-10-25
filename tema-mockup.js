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

const B2B = document.body.hasAttribute('data-b2b');   // catálogo de atacado: sem textos e botões do varejo
const logo = ($('.hero img') || {}).src || 'logo.png';
const top = document.createElement('div');
top.className = 'topbar';
top.innerHTML = `<button class="ib" type="button" id="tMenu" aria-label="Ir para contato">${I.menu}</button><img src="${logo}" alt="De Minas Pão de Queijaria"><button class="ib" type="button" id="tCart" aria-label="Ver pedido">${I.cart}<span class="bdg" id="tBdg" data-n="0"></span></button>`;
document.body.prepend(top);
const setTbh = () => document.documentElement.style.setProperty('--tbh', top.offsetHeight + 'px');
setTbh(); addEventListener('resize', setTbh); addEventListener('load', setTbh); setTimeout(setTbh, 600);

const ban = document.createElement('div');
ban.className = 'banner';
ban.innerHTML = B2B
  ? `<div class="in" id="banIn"><h1>Atacado para empresas e lojistas.</h1><p>${(document.body.dataset.hero || 'Pão de queijo mineiro congelado para revenda.').replace(/</g, '&lt;')}</p><button class="go" type="button" id="banGo">Ver todos os produtos</button></div>`
  : `<div class="in" id="banIn"><h1>Pão de queijo mineiro de verdade.</h1><p>Muito queijo Minas artesanal. Respeito à receita e tradição.</p><button class="go" type="button" id="banGo">Ver todos os produtos</button></div>`;
top.after(ban);

const promo = document.createElement('div');
promo.className = 'promo';
promo.innerHTML = `<div class="in" id="prIn"><b>Combos especiais</b><span>Uma seleção de sabores para cada momento.</span><button type="button" id="prGo">Ver todos os combos</button></div>`;
$('#stick').after(promo);
if (B2B) promo.style.display = 'none';

// --- NOVO: BARRA DE RECORRÊNCIA E FAVORITOS ---
const recur = document.createElement('div');
recur.style.cssText = 'max-width:1100px;margin:10px auto 0;padding:0 16px;display:flex;gap:8px;';
recur.innerHTML = `
  <button type="button" id="btnRepeat" style="flex:1;background:#fff;border:1.5px solid var(--line);border-radius:12px;padding:10px;font-size:13px;font-weight:800;color:var(--red);display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 2px 6px #3b0a1010">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> Repetir última compra
  </button>
  <button type="button" id="btnFavs" style="flex:1;background:#fff;border:1.5px solid var(--line);border-radius:12px;padding:10px;font-size:13px;font-weight:800;color:var(--red);display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 2px 6px #3b0a1010">
    ${I.heart.replace('width="24"','width="18"').replace('height="24"','height="18"')} Meus Favoritos
  </button>
`;
promo.after(recur);

const tabs = document.createElement('nav');
tabs.className = 'tabs';
tabs.setAttribute('aria-label', 'Navegação');
tabs.innerHTML = `<button type="button" class="on" data-t="home">${I.home}Início</button><button type="button" data-t="cats">${I.grid}Categorias</button><button type="button" data-t="cart">${I.cart}Carrinho<span class="bdg" id="nBdg" data-n="0"></span></button><a href="${($('#waLink') || {}).href || '#'}" target="_blank" rel="noopener">${I.wa}Pedido</a>`;
document.body.appendChild(tabs);

const openCart = () => $('#cbOpen').click();
const fire = (v) => { const q = $('#q'); q.value = v; q.dispatchEvent(new Event('input', {bubbles: true})); };
$('#tCart').onclick = openCart;
const drawer = document.createElement('div'); drawer.className = 'drawer'; drawer.hidden = true;
drawer.innerHTML = '<div class="dr-back"></div><nav class="dr-panel" aria-label="Menu"><div class="dr-head"><span>Menu</span><button type="button" class="dr-x" aria-label="Fechar menu">×</button></div><div id="drList" style="display:flex;flex-direction:column;gap:8px"></div><a class="dr-wa" id="drWa" href="#" target="_blank" rel="noopener">Falar no WhatsApp</a></nav>';
document.body.appendChild(drawer);
const closeDr = () => { drawer.classList.remove('on'); document.body.style.overflow = ''; setTimeout(() => { drawer.hidden = true; }, 200); };
const openDr = () => {
  const list = $('#drList'); list.innerHTML = '';
  document.querySelectorAll('#chips .chip').forEach(ch => {
    const c = ch.cloneNode(true); const ic = c.querySelector('.ico'); if (ic) ic.remove();
    const b = document.createElement('button'); b.type = 'button'; b.className = 'dr-item'; b.textContent = c.textContent.trim();
    b.onclick = () => { closeDr(); setTimeout(() => ch.click(), 220); };
    list.appendChild(b);
  });
  if (EXTRA_ITEMS.length) {
    const sep = document.createElement('div'); sep.className = 'dr-sep'; list.appendChild(sep);
    EXTRA_ITEMS.forEach(x => { const b = document.createElement('button'); b.type = 'button'; b.className = 'dr-item'; b.textContent = x.l; b.onclick = () => { closeDr(); setTimeout(x.f, 240); }; list.appendChild(b); });
  }
  const wa = $('#waLink2'); if (wa) $('#drWa').href = wa.href;
  drawer.hidden = false; requestAnimationFrame(() => drawer.classList.add('on')); document.body.style.overflow = 'hidden';
};
$('#tMenu').setAttribute('aria-label', 'Abrir menu');
$('#tMenu').onclick = openDr;
drawer.addEventListener('click', e => { if (e.target.classList.contains('dr-back') || e.target.closest('.dr-x')) closeDr(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) closeDr(); });
$('#banGo').onclick = () => { fire(''); $('#catalog').scrollIntoView({behavior: 'smooth'}); };
$('#prGo').onclick = () => { fire(''); const c = document.querySelector('#catalog [data-combos]'); (c || $('#catalog')).scrollIntoView({behavior: 'smooth'}); if (!c) fire('combo'); };
tabs.onclick = e => {
  const b = e.target.closest('[data-t]'); if (!b) return;
  if (b.dataset.t === 'home') scrollTo({top: 0, behavior: 'smooth'});
  if (b.dataset.t === 'cats') openDr();
  if (b.dataset.t === 'cart') openCart();
};

{ const aPed = tabs.querySelector('a'); if (aPed) aPed.addEventListener('click', () => { const w = $('#waLink'); if (w) aPed.href = w.href; }); }
// --- NOVO: Lógica de Repetir e Favoritos ---
let showOnlyFavs = false;
$('#btnRepeat').onclick = () => {
  const last = JSON.parse(localStorage.getItem('dm_last_order') || '{}');
  if (!last || !Object.keys(last).length) { alert('Você ainda não fez nenhum pedido neste aparelho.'); return; }
  localStorage.setItem('dm_cart', JSON.stringify(last));
  sessionStorage.setItem('dm_open_cart', '1');
  location.reload();
};
$('#btnFavs').onclick = () => {
  showOnlyFavs = !showOnlyFavs;
  const btn = $('#btnFavs');
  if (showOnlyFavs) {
    btn.style.background = 'var(--red)'; btn.style.color = '#fff';
    renderFavs();
  } else {
    btn.style.background = '#fff'; btn.style.color = 'var(--red)';
    document.querySelectorAll('#catalog .card').forEach(c => c.style.display = '');
    document.querySelectorAll('#catalog section').forEach(s => s.style.display = '');
    document.querySelectorAll('#catalog .grp').forEach(s => s.style.display = '');
  }
};
function renderFavs() {
  document.querySelectorAll('#catalog .card').forEach(c => {
    c.style.display = favs.has(c.dataset.pid) ? '' : 'none';
  });
  document.querySelectorAll('#catalog .grid').forEach(g => {
    const vis = [...g.querySelectorAll('.card')].some(c => c.style.display !== 'none');
    g.style.display = vis ? '' : 'none';
    if (g.previousElementSibling && g.previousElementSibling.classList.contains('grp')) {
      g.previousElementSibling.style.display = vis ? '' : 'none';
    }
  });
  document.querySelectorAll('#catalog section').forEach(s => {
    const vis = [...s.querySelectorAll('.card')].some(c => c.style.display !== 'none');
    s.style.display = vis ? '' : 'none';
  });
}
// --------------------------------------------

const favs = new Set(JSON.parse(localStorage.getItem('dm_fav') || '[]'));
let EXTRA_ITEMS = [];
let SELO = {};
function setSelo(c) {
  const s = SELO[c.dataset.pid]; if (s === undefined) return;
  const t = c.querySelector('.tagb');
  if (s === '-') { if (t) t.remove(); return; }
  if (t) t.textContent = s; else c.insertAdjacentHTML('afterbegin', '<span class="tagb">' + escH(s) + '</span>');
}
const escH = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
let mdl = null;
function closeModal() { if (mdl) { mdl.hidden = true; document.body.style.overflow = ''; } }
function openModal(titulo, html) {
  if (!mdl) {
    mdl = document.createElement('div'); mdl.className = 'mdl'; mdl.hidden = true;
    mdl.innerHTML = '<div class="mdl-back"></div><div class="mdl-box" role="dialog" aria-modal="true" aria-labelledby="mdlT"><div class="mdl-head"><b id="mdlT"></b><button type="button" class="dr-x" aria-label="Fechar">×</button></div><div class="mdl-body" id="mdlB"></div></div>';
    document.body.appendChild(mdl);
    mdl.addEventListener('click', e => { if (e.target.classList.contains('mdl-back') || e.target.closest('.dr-x')) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mdl.hidden) closeModal(); });
  }
  $('#mdlT').textContent = titulo; $('#mdlB').innerHTML = html; mdl.hidden = false; document.body.style.overflow = 'hidden';
}
function indCode() {
  try { const c = JSON.parse(localStorage.getItem('dm_cust') || '{}'); const n = String(c.nome || '').trim().split(/\s+/)[0] || ''; return n.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20); } catch (e) { return ''; }
}
function compartilhar() {
  const ind = indCode();
  const url = location.origin + location.pathname.replace(/index\.html$/, '') + (ind ? '?ind=' + encodeURIComponent(ind) : '');
  const completo = !/congelados/.test(location.pathname);
  const texto = completo
    ? 'Conheça a De Minas Pão de Queijaria: pão de queijo mineiro, queijos, doces e delícias de Minas. Faça o pedido pelo catálogo:'
    : 'Conheça a De Minas Pão de Queijaria: pão de queijo mineiro congelado, é só assar. Faça o pedido pelo catálogo:';
  if (navigator.share) navigator.share({title: 'De Minas Pão de Queijaria', text: texto, url}).catch(() => {});
  else window.open('https://wa.me/?text=' + encodeURIComponent(texto + ' ' + url), '_blank', 'noopener');
}
document.addEventListener('dm-pedido-enviado', () => {
  setTimeout(() => {
    if (B2B) { openModal('Pedido de atacado enviado!', '<p>Recebemos o seu pedido. Vamos confirmar os itens, o prazo e a entrega pelo WhatsApp. Obrigado pela parceria!</p>'); return; }
    openModal('Pedido enviado!', '<p>Seu pedido foi enviado pelo WhatsApp. Obrigado por apoiar um pequeno negócio da Vila Carrão.</p><p><b>Comprou, gostou, espalhou.</b> Mande o catálogo para um amigo e ajude a De Minas a levar o melhor de Minas para mais mesas.</p><button type="button" class="btn-share" id="mdShare">Compartilhar com um amigo</button><p class="mdl-av">#EspalhaMinas</p>');
    const b = $('#mdShare'); if (b) b.onclick = compartilhar;
  }, 1200);
});
function extras(d) {
  const ct = d.conteudo || {}; const wa = String(d.whatsappAtendimento || '5511986975803').replace(/\D/g, '');
  const acts = [];
  const rolar = id => { const e = document.getElementById(id); if (e) e.scrollIntoView({behavior: 'smooth', block: 'start'}); };
  if (ct.comoAssar) { const c = ct.comoAssar; acts.push({l: c.titulo || 'Como assar', f: () => openModal(c.titulo || 'Como assar', '<p>' + escH(c.intro) + '</p>' + (c.itens || []).map(i => '<div class="mdl-it"><b>' + escH(i.t) + '</b><span>' + escH(i.d) + '</span></div>').join('') + (c.aviso ? '<p class="mdl-av">' + escH(c.aviso) + '</p>' : ''))}); }
  if (ct.alergenicos) { const c = ct.alergenicos; acts.push({l: c.titulo || 'Alergênicos', f: () => openModal(c.titulo || 'Alergênicos', (c.paragrafos || []).map(p => '<p>' + escH(p) + '</p>').join(''))}); }
  const faq = ct.faq || [], deps = ct.depoimentos || [];
  if (faq.length) acts.push({l: 'Perguntas frequentes', f: () => rolar('faq')});
  acts.push({l: 'Compartilhar o catálogo', f: compartilhar});
  const ft = document.querySelector('footer');
  if (deps.length && ft && !document.getElementById('depoimentos')) {
    const s = document.createElement('section'); s.id = 'depoimentos'; s.className = 'extsec';
    s.innerHTML = '<h2>O que os clientes dizem</h2><div class="dep-track">' + deps.map(x => '<blockquote class="dep"><p>“' + escH(x.texto) + '”</p><div class="dep-by">' + escH(x.nome) + (x.bairro ? ' · ' + escH(x.bairro) : '') + '</div></blockquote>').join('') + '</div><a class="btn-dep" target="_blank" rel="noopener" href="https://wa.me/' + wa + '?text=' + encodeURIComponent('Olá! Quero deixar meu depoimento sobre a De Minas.') + '">Enviar meu depoimento</a>';
    ft.before(s);
  }
  if (faq.length && ft && !document.getElementById('faq')) {
    const s = document.createElement('section'); s.id = 'faq'; s.className = 'extsec';
    s.innerHTML = '<h2>Perguntas frequentes</h2>' + faq.map(q => '<details><summary>' + escH(q.p) + '</summary><p>' + escH(q.r) + '</p></details>').join('');
    ft.before(s);
  }
  if (typeof recur !== 'undefined' && recur && acts.length && !document.querySelector('.infobtns')) {
    const row = document.createElement('div'); row.className = 'infobtns';
    acts.forEach(a => { const b = document.createElement('button'); b.type = 'button'; b.textContent = a.l; b.onclick = a.f; row.appendChild(b); });
    recur.after(row);
  }
  EXTRA_ITEMS = acts.concat(deps.length ? [{l: 'Depoimentos', f: () => rolar('depoimentos')}] : []);
}
let CATMAP = null;
fetch((B2B ? 'produtos-atacado.json' : 'produtos.json') + '?v=' + Date.now()).then(r => r.json()).then(d => { CATMAP = {}; (d.produtos || []).forEach(p => { CATMAP[p.id] = p.cat; if (p.selo) SELO[p.id] = p.selo; }); document.querySelectorAll('#catalog .card').forEach(c => { frz(c); setSelo(c); }); if (!B2B) extras(d); }).catch(() => {});
function frz(c) {
  if (!CATMAP || c.querySelector('.frz') || c.querySelector('.soon') || CATMAP[c.dataset.pid] !== 'congelados') return;
  const nm = $('.nm', c); if (nm) nm.insertAdjacentHTML('afterend', '<div class="frz">❄ Congelado · Pronto para assar</div>');
}
function decorate() {
  document.querySelectorAll('#catalog .card:not([data-x])').forEach(c => {
    c.dataset.x = 1;
    const id = c.dataset.pid;
    const grp = c.closest('section') && (c.parentElement.previousElementSibling || {});
    const tag = c.dataset.selo || (grp && grp.classList && grp.classList.contains('grp') ? grp.textContent.trim() : '');
    if (tag) c.insertAdjacentHTML('afterbegin', `<span class="tagb">${tag.replace(/</g, '&lt;')}</span>`);
    c.insertAdjacentHTML('afterbegin', `<button class="fav" type="button" aria-label="Favoritar" aria-pressed="${favs.has(id)}">${I.heart}</button>`);
    frz(c); setSelo(c);
  });
  carousel();
  pick();
}

/* ---- Combos em carrossel (arrastar no celular, setas no computador) ---- */
const AR = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
function carousel() {
  document.querySelectorAll('#catalog section.cat').forEach(sec => {
    const txt = ($('h2', sec) || {}).textContent || '';
    const isCongelados = /congelad/i.test(document.body.dataset.cats || '');
    const isComboSection = /combo/i.test(txt);
    
    if (isComboSection) sec.dataset.combos = 1;
    
    sec.querySelectorAll('.grid:not([data-car])').forEach(g => {
      const prev = g.previousElementSibling;
      const grpTxt = prev && prev.classList.contains('grp') ? prev.textContent : '';
      const isComboGroup = /combo|mais pedidos/i.test(grpTxt);
      
      if (/combo/i.test(grpTxt)) prev.dataset.combos = 1;

      // Mantém o gatilho original
      if (!isCongelados && !isComboSection && !isComboGroup) return;
      if ($('#q') && $('#q').value.trim()) return;
      
      g.dataset.car = 1;
      if (g.children.length < 2) return;
      
      const w = document.createElement('div'); w.className = 'car';
      g.before(w); w.appendChild(g); g.classList.add('track');
      
      w.insertAdjacentHTML('beforeend', `<button type="button" class="cnav prev" aria-label="Anterior">${AR('m15 5-7 7 7 7')}</button><button type="button" class="cnav next" aria-label="Próximo">${AR('m9 5 7 7-7 7')}</button>`);
      
      const upd = () => { w.classList.toggle('at-start', g.scrollLeft < 8); w.classList.toggle('at-end', g.scrollLeft + g.clientWidth >= g.scrollWidth - 8); };
      
      if (!matchMedia('(prefers-reduced-motion:reduce)').matches) {
        let last = 0, hover = false, vis = false;
        const touch = () => { last = Date.now(); };
        ['pointerdown', 'touchstart', 'wheel', 'keydown', 'focusin'].forEach(ev => w.addEventListener(ev, touch, {passive: true}));
        w.addEventListener('mouseenter', () => hover = true); w.addEventListener('mouseleave', () => { hover = false; touch(); });
        new IntersectionObserver(en => { vis = en[0].isIntersecting; }, {threshold: 0.5}).observe(w);
        const tm = setInterval(() => {
          if (!w.isConnected) { clearInterval(tm); return; }
          if (!vis || hover || document.hidden || Date.now() - last < 6000) return;
          const atEnd = g.scrollLeft + g.clientWidth >= g.scrollWidth - 8;
          if (atEnd) g.scrollTo({left: 0, behavior: 'smooth'});
          else g.scrollBy({left: g.firstElementChild.offsetWidth + 12, behavior: 'smooth'});
        }, 4000);
      }
      
      g.addEventListener('scroll', upd, {passive: true}); addEventListener('resize', upd); setTimeout(upd, 300);
      w.addEventListener('click', e => {
        const b = e.target.closest('.cnav'); if (!b) return;
        g.scrollBy({left: (b.classList.contains('next') ? 1 : -1) * (g.firstElementChild.offsetWidth + 12), behavior: 'smooth'});
      });
    });
  });
}

/* ---- Banners: usa banner.jpg / combos.jpg se existirem; senão, as fotos mais nítidas do catálogo ---- */
const fade = 'linear-gradient(90deg,#3b0a10 0%,#3b0a10ee 30%,#3b0a1000 80%)';
const fixed = {};
function paint(el, src) { el.style.backgroundImage = `${fade},url("${src}")`; }
function tryFile(name, el) {
  const t = new Image();
  t.onload = () => { fixed[name] = 1; paint(el, name); };
  t.src = name + '?v=' + Date.now();
}
function pick() {
  const ok = /p[aã]o de queijo|chipa|broa|recheado|biscoito de queijo|dadinho/i;
  const imgs = [...document.querySelectorAll('#catalog .card')].filter(c => ok.test(($('.nm', c) || {}).textContent || ''))
    .map(c => $('.ph img', c)).filter(i => i && i.complete && i.naturalWidth > 200)
    .sort((a, b) => b.naturalWidth * b.naturalHeight - a.naturalWidth * a.naturalHeight);
  if (!fixed['banner.jpg'] && imgs[0]) paint($('#banIn'), imgs[0].getAttribute('src'));
  if (!fixed['combos.jpg'] && imgs[1]) paint($('#prIn'), imgs[1].getAttribute('src'));
}
tryFile('banner.jpg', $('#banIn'));
tryFile('combos.jpg', $('#prIn'));
addEventListener('load', () => { pick(); setTimeout(pick, 1500); });

/* ---- Ícones por categoria ---- */
const P = {
  gift: '<rect x="4" y="10" width="16" height="10" rx="1.5"/><path d="M3 7h18v3H3zM12 7v13M12 7c-2-3.500-5-3-5-1s3 1 5 1zM12 7c2-3.500 5-3 5-1s-3 1-5 1z"/>',
  bread: '<path d="M4 13h16a8 6 0 0 1-16 0z"/><circle cx="9" cy="9.500" r="3"/><circle cx="15" cy="9.500" r="3"/>',
  cheese: '<path d="M3 9l9-4 9 4v8H3z"/><circle cx="8" cy="13" r="1.200"/><circle cx="13.500" cy="12" r="1"/><circle cx="17" cy="15" r="1.200"/>',
  candy: '<circle cx="12" cy="12" r="4"/><path d="M8.500 10 3 7v10l5.500-3M15.500 10 21 7v10l-5.500-3"/>',
  honey: '<rect x="6" y="8" width="12" height="12" rx="3"/><path d="M8 8V5h8v3M9 13h6M9 16h6"/>',
  basket: '<path d="M3 10h18l-2 10H5zM8 10l3-6M16 10l-3-6"/>',
  cookie: '<circle cx="12" cy="12" r="8"/><circle cx="9" cy="10" r="1"/><circle cx="14.500" cy="9" r="1"/><circle cx="12" cy="14" r="1"/><circle cx="16" cy="14" r="1"/>',
  zero: '<rect x="5" y="8" width="11" height="11" rx="2"/><path d="M16 8l3-3v11l-3 3M5 8l3-3h11M3 21 21 3"/>',
  star: '<path d="m12 3 2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z"/>',
  all: '<rect x="4" y="4" width="6" height="6" rx="1.500"/><rect x="14" y="4" width="6" height="6" rx="1.500"/><rect x="4" y="14" width="6" height="6" rx="1.500"/><rect x="14" y="14" width="6" height="6" rx="1.500"/>'
};
function iconFor(t) {
  t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (/combo|kit|cesta/.test(t)) return P.gift;
  if (/especiais|sabores/.test(t)) return P.cheese;
  if (/dadinho|tapioca/.test(t)) return P.cookie;
  if (/breve/.test(t)) return P.gift;
  if (/mais pedidos/.test(t)) return P.cookie;
  if (/zero|diet/.test(t)) return P.zero;
  if (/pao de queijo|chipa|broa|tradicional|recheado/.test(t)) return P.bread;
  if (/queijo/.test(t)) return P.cheese;
  if (/doce|goiabada|compota|cocada|bala/.test(t)) return P.candy;
  if (/mel|melado/.test(t)) return P.honey;
  if (/mercearia|cafe|graos|geleia/.test(t)) return P.basket;
  if (/biscoito|petisco|bolacha/.test(t)) return P.cookie;
  if (/todos/.test(t)) return P.all;
  return null;
}
const ini = t => { const w = t.replace(/[^\p{L}\p{N} ]/gu, '').trim().split(/\s+/).filter(x => x.length > 2 || /^\d/.test(x)); return ((w[0] || t)[0] + ((w[1] || '')[0] || (w[0] || '').slice(1, 2))).toUpperCase(); }
function iconize() {
  document.querySelectorAll('#chips .chip:not(:has(.ico))').forEach(b => {
    const t = b.textContent, d = iconFor(t);
    b.insertAdjacentHTML('afterbegin', d
      ? `<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg></span>`
      : `<span class="ico mono">${/congelad/i.test(document.body.dataset.cats || '') ? ini(t).replace(/</g, '') : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${P.star}</svg>`}</span>`);
  });
}
new MutationObserver(iconize).observe($('#chips'), {childList: true});
iconize();
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
  if (showOnlyFavs) renderFavs();
});
new MutationObserver(decorate).observe($('#catalog'), {childList: true, subtree: true});
new MutationObserver(badge).observe($('#cartbar'), {attributes: true, childList: true, subtree: true, characterData: true});
decorate(); badge();
if (sessionStorage.getItem('dm_open_cart')) {
  sessionStorage.removeItem('dm_open_cart');
  let n = 0; const t = setInterval(() => { const cb = $('#cartbar'); if (cb && cb.classList.contains('on')) { clearInterval(t); $('#cbOpen').click(); } else if (++n > 40) clearInterval(t); }, 250);
}
})();

// foto que não carregou (arquivo ainda não enviado ao GitHub): mostra a logo suave em vez do ícone quebrado
document.addEventListener('error', function (e) {
  var im = e.target;
  if (!im || im.tagName !== 'IMG' || im.dataset.semFoto) return;
  if (!im.closest('.card, .sug, .cartmodal, .modal, #catalog, [class*="card"]')) return;
  im.dataset.semFoto = '1';
  im.removeAttribute('srcset'); im.alt = '';
  im.src = 'logo.png';
  im.style.objectFit = 'contain'; im.style.padding = '18%'; im.style.opacity = '.35'; im.style.background = '#f3ead8';
}, true);
