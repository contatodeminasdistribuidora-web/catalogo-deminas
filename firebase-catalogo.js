// ============================================================
// firebase-catalogo.js
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

window.DM_CATALOGO_PRONTO = true;
document.dispatchEvent(new CustomEvent('dm-catalogo-pronto'));
