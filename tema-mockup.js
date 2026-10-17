/* De Minas — tema "app" (sobrescreve o CSS do congelados.html). Carregar DEPOIS do <style>. */
:root{--cream:#fbf5ea;--cream2:#f3e7d0;--card:#fffdf8;--line:#ead9b8;--red:#7a1020;--red-d:#5a0a16;--brown:#3b0a10;--brown2:#6a2a30;--gold:#b8860b;--gold-d:#8a6006;--gold-l:#e9c46a}
body{padding-bottom:150px;background:var(--cream)}
.hero{display:none}

/* topo */
.topbar{display:grid;grid-template-columns:48px 1fr 48px;align-items:center;padding:10px 12px 6px;background:var(--cream);max-width:1100px;margin:0 auto}
.topbar img{height:62px;width:auto;margin:0 auto;display:block}
.ib{position:relative;width:44px;height:44px;border:0;background:transparent;color:var(--red);display:grid;place-items:center;border-radius:50%}
.ib svg{width:28px;height:28px}
.bdg{position:absolute;top:2px;right:0;min-width:20px;height:20px;border-radius:10px;background:var(--red);color:#fff;font:800 12px/20px 'Nunito Sans',sans-serif;text-align:center;padding:0 5px}
.bdg:empty,.bdg[data-n="0"]{display:none}

/* banner principal */
.banner{max-width:1100px;margin:0 auto;padding:10px 16px 0}
.banner .in{border-radius:18px;padding:26px 22px;min-height:210px;color:#fff;background:linear-gradient(90deg,#3b0a10 38%,#3b0a1080),#3b0a10 center/cover;display:flex;flex-direction:column;justify-content:center;gap:10px}
.banner h1{margin:0;font:italic 600 30px/1.1 'Fraunces',Georgia,serif;max-width:12ch}
.banner p{margin:0;font-size:15px;max-width:26ch;opacity:.92}
.banner .go{align-self:flex-start;border:1.5px solid var(--gold-l);background:#7a1020cc;color:#fff;border-radius:999px;height:42px;padding:0 20px;font-weight:800;font-size:13px;letter-spacing:.04em;text-transform:uppercase}

/* busca + categorias (ícones redondos) */
#stick{background:var(--cream);box-shadow:0 2px 10px #3b0a1016}
.search input{background:#fff;border:1.5px solid var(--line);color:var(--ink)}
.search svg{color:var(--red)}
.chips{gap:6px;padding:8px 12px 12px}
.chip{display:flex;flex-direction:column;align-items:center;gap:6px;border:0;background:transparent;color:var(--brown2);font-weight:700;font-size:12.5px;line-height:1.15;white-space:normal;width:84px;padding:0;text-align:center}
.chip::before{content:"";width:58px;height:58px;border-radius:50%;background:#fff var(--ic) center/28px no-repeat;border:1px solid var(--line);--ic:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237a1020' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='8'/%3E%3Cpath d='M8 10c1-2 3-2.500 4-1.500M12 15c1.500 1 3.500.500 4-1'/%3E%3C/svg%3E")}
.chip[aria-current="true"]{background:transparent;color:var(--red);border:0}
.chip[aria-current="true"]::before{background-color:var(--red);border-color:var(--red);--ic:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='8'/%3E%3Cpath d='M8 10c1-2 3-2.500 4-1.500M12 15c1.500 1 3.500.500 4-1'/%3E%3C/svg%3E")}

/* faixa de combos */
.promo{max-width:1100px;margin:14px auto 0;padding:0 16px}
.promo .in{border-radius:16px;background:linear-gradient(100deg,#4a0b13,#6b1220);color:#fff;padding:18px 20px;display:flex;flex-direction:column;gap:8px}
.promo b{font:800 12px 'Nunito Sans',sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--gold-l)}
.promo span{font:600 21px/1.2 'Fraunces',Georgia,serif;max-width:20ch}
.promo button{align-self:flex-start;border:1.5px solid var(--gold-l);background:transparent;color:var(--gold-l);border-radius:999px;height:38px;padding:0 18px;font-weight:800;font-size:13px}

/* títulos de seção */
section.cat>h2{font-size:24px;color:var(--brown)}
section.cat>h2 svg{display:none}
.grp{color:var(--brown);font:700 20px 'Fraunces',Georgia,serif;letter-spacing:0;text-transform:none}
.grp::after{background:var(--line)}

/* cards verticais */
.grid{grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:12px}
.card{flex-direction:column;padding:0;gap:0;overflow:hidden;position:relative;border-radius:14px;box-shadow:0 2px 8px #3b0a1014}
.ph{width:100%;height:auto;aspect-ratio:4/3;border-radius:0}
.cbody{width:100%;padding:10px 12px 12px}
.nm{font-size:16px;margin:0 0 4px}
.cod{display:none}
.frz{font-size:11.5px;color:var(--muted);margin:0 0 6px}
.tagb{position:absolute;top:8px;left:8px;z-index:2;background:var(--red);color:#fff;border-radius:999px;font:800 10.5px/1 'Nunito Sans',sans-serif;letter-spacing:.05em;text-transform:uppercase;padding:6px 10px;max-width:70%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.fav{position:absolute;top:6px;right:6px;z-index:2;width:34px;height:34px;border:0;border-radius:50%;background:#fffc;color:var(--red);display:grid;place-items:center}
.fav svg{width:20px;height:20px}
.fav[aria-pressed="true"] svg{fill:var(--red)}
.opt{flex-direction:column;align-items:stretch;gap:8px}
.opt .lb{display:inline;font-size:13px;margin-right:6px}
.opt .pr{font-size:19px;color:var(--red)}
.opt .add,.opt .step{width:100%;justify-content:space-between}
.opt .add{display:flex;align-items:center;justify-content:center;gap:6px}
.opt .add::before{content:"";width:16px;height:16px;background:currentColor;-webkit-mask:var(--cart) center/contain no-repeat;mask:var(--cart) center/contain no-repeat;--cart:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 4h2l2.400 11h10l2-8H6'/%3E%3Ccircle cx='9' cy='20' r='1.500'/%3E%3Ccircle cx='17' cy='20' r='1.500'/%3E%3C/svg%3E")}
.step{background:var(--red);border-color:var(--red);color:#fff}
.step button{color:#fff}
.step output{color:#fff}

/* barra do carrinho + navegação inferior */
.cartbar{bottom:calc(76px + env(safe-area-inset-bottom));background:var(--red)}
.btn.gold{background:var(--gold-l);color:var(--brown)}
.tabs{position:fixed;left:0;right:0;bottom:0;z-index:45;background:#fffdf8;border-top:1px solid var(--line);display:flex;justify-content:space-around;padding:6px 4px calc(6px + env(safe-area-inset-bottom))}
.tabs a,.tabs button{position:relative;flex:1;max-width:120px;border:0;background:transparent;color:var(--muted);font:700 11.5px 'Nunito Sans',sans-serif;display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px 0;text-decoration:none}
.tabs svg{width:26px;height:26px}
.tabs .on{color:var(--red)}
.tabs .bdg{top:-2px;right:calc(50% - 22px)}
footer{background:var(--brown)}
.toast{bottom:150px}

/* Área do administrador oculta (sem link visível; acesso só por #admin) */
#admLink{display:none!important}
