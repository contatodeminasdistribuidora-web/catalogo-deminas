// Service worker do ERP De Minas: o ERP sempre tenta a internet primeiro (para pegar a versão mais nova)
// e só usa a cópia guardada se estiver sem sinal. Dados e pedidos NUNCA ficam guardados aqui.
const VERSAO = 'erp-v1';
const ARQUIVOS = ['./de_minas_v15_1_cloud.html', './erp-192.png', './erp-512.png', './erp.webmanifest'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => Promise.all(ARQUIVOS.map(a => c.add(a).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  if (!/(de_minas_v15_1_cloud\.html|firebase-(api|config)\.js|erp-\d+\.png|erp\.webmanifest)$/.test(u.pathname)) return;
  e.respondWith(
    fetch(r).then(res => { if (res && res.ok) { const cp = res.clone(); caches.open(VERSAO).then(c => c.put(r, cp)); } return res; })
      .catch(() => caches.match(r, {ignoreSearch: true}).then(m => m || new Response('Sem conexão. Abra o ERP quando houver internet.', {status: 503, headers: {'Content-Type': 'text/plain; charset=utf-8'}})))
  );
});
