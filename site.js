/* De Minas Pão de Queijaria: comportamentos comuns a todas as páginas do site */
(() => {
  'use strict';
  const qs = new URLSearchParams(location.search), ind = (qs.get('ind') || '').slice(0, 40);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const fmt = (l) => String(l).replace(/^(\d+(?:[.,]\d+)?)\s*(kgs?|g)\b/i, (m, n, u) => n + ' ' + (/^kg/i.test(u) ? 'kg' : 'g'));
  const comInd = (href) => { if (!ind || /^(https?:|tel:|mailto:)/.test(href)) return href; const [p, h] = href.split('#'); return p + (p.includes('?') ? '&' : '?') + 'ind=' + encodeURIComponent(ind) + (h ? '#' + h : ''); };
  const norm = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const carregaProdutos = (() => { let p; return () => p || (p = (window.__DADOS ? Promise.resolve(window.__DADOS) : fetch('produtos.json', {cache: 'no-cache'}).then(r => r.json()))); })();
  window.DM = {ind, esc, fmt, comInd, norm, carregaProdutos};

  const propaga = (raiz) => {
    raiz.querySelectorAll('a[data-int]').forEach(a => a.setAttribute('href', comInd(a.getAttribute('href'))));
    if (ind) raiz.querySelectorAll('a[data-wa]').forEach(a => { try { const u = new URL(a.href); u.searchParams.set('text', (u.searchParams.get('text') || '') + ' (origem: ' + ind + ')'); a.href = u.toString(); } catch (e) {} });
  };
  propaga(document);

  const topo = document.querySelector('.top');
  if (topo) { const sc = () => topo.classList.toggle('sc', window.scrollY > 8); sc(); addEventListener('scroll', sc, {passive: true}); }

  /* ---------- menu de três traços, com busca ---------- */
  const NAV = [['Início', './'], ['Pão de queijo (catálogo)', 'pao-de-queijo.html'], ['Empório Mineiro', 'emporio-mineiro.html'], ['Nossos pães de queijo', 'nossos-paes-de-queijo.html'], ['Como assar', 'como-assar.html'], ['Nossa história e receita', 'nossa-historia.html'], ['Conheça Minas', 'conheca-minas.html'], ['Atacado', 'atacado.html'], ['Entrega', './#entrega'], ['Dúvidas', './#duvidas'], ['Contato', './#contato']];
  const PAGINAS = [
    ['Catálogo de pão de queijo', 'pao-de-queijo.html', 'catalogo pedido comprar pao de queijo congelado'],
    ['Empório Mineiro', 'emporio-mineiro.html', 'queijo doce mel mercearia emporio biscoito'],
    ['Nossos pães de queijo', 'nossos-paes-de-queijo.html', 'tradicional coquetel lanche super chipa broa dadinho tamanhos linha sabores'],
    ['Como assar', 'como-assar.html', 'forno airfryer assar tempo temperatura descongelar passo a passo'],
    ['Nossa história', 'nossa-historia.html', 'historia nossa franklin origem'],
    ['A receita: nove ingredientes', 'nossa-historia.html#receita', 'receita ingredientes polvilho queijo leite ovos oleo sal agua'],
    ['Monte a sua mesa de café mineira', 'nossa-historia.html#mesa-de-cafe', 'cafe da manha mesa cafezim'],
    ['História do pão de queijo', 'conheca-minas.html#historia', 'historia origem pao de queijo seculo'],
    ['Rota dos queijos de Minas', 'conheca-minas.html#queijos', 'regioes queijeiras canastra serro araxa cerrado salitre queijo minas artesanal'],
    ['Doces de Minas', 'conheca-minas.html#doces', 'doce de leite goiabada vicosa sao bartolomeu ponte nova'],
    ['Cidades históricas', 'conheca-minas.html#cidades', 'ouro preto mariana tiradentes sao joao del rei congonhas diamantina sabara'],
    ['Mineiros que fizeram história', 'conheca-minas.html#mineiros', 'tiradentes aleijadinho drummond guimaraes rosa santos dumont jk pele'],
    ['Causos de Minas', 'conheca-minas.html#causos', 'causo historia piada jaca'],
    ['Dicionário do Pingo (mineirês)', 'conheca-minas.html#dicionario', 'mineires uai trem cafezim benzadeus garrado saudadoce corgo'],
    ['Atacado para empresas', 'atacado.html', 'atacado revender revenda cnpj padaria restaurante mercado conveniencia'],
    ['Entrega e retirada', './#entrega', 'entrega frete bairro retirar horario'],
    ['Perguntas frequentes', './#duvidas', 'duvidas perguntas faq pagamento pix prazo'],
    ['Contato e endereço', './#contato', 'contato telefone whatsapp endereco mapa vila carrao']];
  const pagina = location.pathname.split('/').pop() || 'index.html';
  const atual = (u) => { const f = u.split('#')[0].replace('./', 'index.html'); return f && !u.includes('#') && (f === pagina || (f === 'index.html' && (pagina === '' || pagina === 'index.html'))); };

  const burger = document.createElement('button');
  burger.type = 'button'; burger.className = 'burger'; burger.setAttribute('aria-label', 'Abrir o menu'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-controls', 'drawer');
  burger.innerHTML = '<i></i><i></i><i></i>';
  const wrapTopo = document.querySelector('.top .wrap'); if (wrapTopo) wrapTopo.appendChild(burger);

  const dr = document.createElement('div'); dr.className = 'drawer'; dr.id = 'drawer'; dr.setAttribute('role', 'dialog'); dr.setAttribute('aria-modal', 'true'); dr.setAttribute('aria-label', 'Menu do site');
  dr.innerHTML = '<div class="bk" data-x></div><div class="pn"><div class="hd"><img src="logo.png" alt="De Minas Pão de Queijaria" width="720" height="229"><button type="button" class="x" aria-label="Fechar o menu" data-x>×</button></div>' +
    '<div class="sbox"><label class="sr" for="dsq" style="position:absolute;left:-999px">Buscar no site</label><input id="dsq" type="search" placeholder="Buscar produto ou assunto…" autocomplete="off" enterkeyhint="search"></div>' +
    '<div class="res" id="dres" aria-live="polite"></div>' +
    '<nav class="lst" id="dlst" aria-label="Páginas do site">' + NAV.map(([t, u]) => `<a href="${u}" data-int${atual(u) ? ' aria-current="page"' : ''}>${esc(t)}</a>`).join('') + '</nav>' +
    '<div class="ft"><a class="btn btn-wa" href="https://wa.me/5511940507018?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20De%20Minas%20e%20quero%20fazer%20um%20pedido." data-wa>Pedir pelo WhatsApp</a><a class="btn btn-gold" href="pao-de-queijo.html" data-int>Fazer pedido no catálogo</a></div></div>';
  document.body.appendChild(dr); propaga(dr);
  const inp = dr.querySelector('#dsq'), res = dr.querySelector('#dres'), lst = dr.querySelector('#dlst');
  const abre = () => { dr.classList.add('open'); document.body.classList.add('noscroll'); burger.setAttribute('aria-expanded', 'true'); setTimeout(() => inp.focus(), 120); };
  const fecha = () => { dr.classList.remove('open'); document.body.classList.remove('noscroll'); burger.setAttribute('aria-expanded', 'false'); burger.focus(); };
  burger.addEventListener('click', abre);
  dr.addEventListener('click', e => { if (e.target.closest('[data-x]')) fecha(); else if (e.target.closest('a')) { document.body.classList.remove('noscroll'); } });
  addEventListener('keydown', e => { if (e.key === 'Escape' && dr.classList.contains('open')) fecha(); });

  let temp;
  const busca = async () => {
    const t = norm(inp.value).trim(); if (!t) { res.innerHTML = ''; lst.style.display = ''; return; }
    lst.style.display = 'none'; const toks = t.split(/\s+/).filter(Boolean);
    const pags = PAGINAS.filter(([ti, u, k]) => { const h = norm(ti + ' ' + k); return toks.every(x => h.includes(x)); }).slice(0, 5);
    let prods = [];
    try { const D = await carregaProdutos(); prods = (D.produtos || []).filter(p => p.disponivel !== false && toks.every(x => norm(p.nome + ' ' + (p.grupo || '') + ' ' + p.codigo).includes(x))).slice(0, 7); } catch (e) {}
    let h = '';
    if (prods.length) h += '<div class="tt">Produtos</div>' + prods.map(p => { const cat = p.cat === 'congelados' ? 'pao-de-queijo.html' : 'emporio-mineiro.html'; return `<a href="${comInd(cat + '?busca=' + encodeURIComponent(p.nome))}">${esc(p.nome)}<small>${esc(p.grupo || '')}${p.cat === 'congelados' ? ' · catálogo de pão de queijo' : ' · Empório Mineiro'}</small></a>`; }).join('');
    if (pags.length) h += '<div class="tt">Páginas e assuntos</div>' + pags.map(([ti, u]) => `<a href="${comInd(u)}">${esc(ti)}</a>`).join('');
    if (!h) h = '<p class="vz">Não achei nada com essa busca. Tente outra palavra, ou chame a gente no WhatsApp.</p>';
    res.innerHTML = h;
  };
  inp.addEventListener('input', () => { clearTimeout(temp); temp = setTimeout(busca, 160); });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') { const a = res.querySelector('a'); if (a) location.href = a.getAttribute('href'); } });
  inp.addEventListener('focus', () => carregaProdutos().catch(() => {}), {once: true});

  /* ---------- dica de deslizar nos carrosséis do celular ---------- */
  document.querySelectorAll('.car').forEach(c => { const p = document.createElement('p'); p.className = 'hint'; p.textContent = 'Deslize para ver mais →'; c.parentNode.insertBefore(p, c); });

  /* ---------- aparecer ao rolar ---------- */
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold: .08});
    document.querySelectorAll('section:not(.slider):not(.cmtabs) .wrap > *').forEach(el => { el.classList.add('rv'); io.observe(el); });
  }
})();
