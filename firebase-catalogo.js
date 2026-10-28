// ============================================================
// firebase-catalogo.js
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const app = initializeApp({
  apiKey: "AIzaSyDj9wKSco9HEMNi7Iiu5xWZ1MqeZUpc5qQ",
  authDomain: "deminas-pedidos.firebaseapp.com",
  projectId: "deminas-pedidos",
  storageBucket: "deminas-pedidos.firebasestorage.app",
  messagingSenderId: "489232858438",
  appId: "1:489232858438:web:32e7bdfb10a44abb62b947"
});

const fdb = getFirestore(app);

window.DM_enviarPedido = async function (pedido) {
  const id = pedido.codigo || ('DM-' + Date.now().toString(36).toUpperCase());
  const limpo = JSON.parse(JSON.stringify(pedido));

  // Grava em "pedidosCatalogo": é a coleção que o ERP lê na aba Novos Pedidos
  await setDoc(doc(fdb, 'pedidosCatalogo', id), {
    ...limpo,
    id,
    status: 'novo',
    origem: 'catalogo',
    criadoEm: serverTimestamp()
  });

  return id;
};


// Pedido de acesso ao atacado (cadastro com CNPJ ou CPF): fica pendente até o administrador aprovar
window.DM_solicitarAcessoAtacado = async function (dados) {
  const id = 'SA-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
  const d = JSON.parse(JSON.stringify(dados));
  await setDoc(doc(fdb, 'solicitacoesAtacado', id), {
    nome: String(d.nome || '').slice(0, 120), doc: String(d.doc || '').replace(/\D/g, '').slice(0, 14),
    whatsapp: String(d.whatsapp || '').replace(/\D/g, '').slice(0, 20),
    tipoNegocio: String(d.tipoNegocio || '').slice(0, 60), obs: String(d.obs || '').slice(0, 300),
    status: 'pendente', criadoEm: serverTimestamp()
  });
  return id;
};

// Lê o acesso do cliente pelo código do link (traz os preços de atacado dele)
window.DM_lerAcessoAtacado = async function (codigo) {
  const c = String(codigo || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 40);
  if (!c) return null;
  const snap = await getDoc(doc(fdb, 'atacadoAcessos', c));
  return snap.exists() ? snap.data() : null;
};

window.DM_CATALOGO_PRONTO = true;
document.dispatchEvent(new CustomEvent('dm-catalogo-pronto'));
