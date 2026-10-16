// ============================================================
// firebase-catalogo.js
// Envia pedidos do catálogo público para o Firestore.
// Falhar aqui NUNCA bloqueia o WhatsApp.
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore, doc, setDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const app = initializeApp({
  apiKey: "AIzaSyDj9wKSco9HEMNi7Iiu5xWZ1MqeZUpc5qQ",
  authDomain: "deminas-pedidos.firebaseapp.com",
  projectId: "deminas-pedidos",
  storageBucket: "deminas-pedidos.firebasestorage.app",
  messagingSenderId: "489232858438",
  appId: "1:489232858438:web:32e7bdfb10a44abb62b947"
});

const fdb = getFirestore(app);

/**
 * Envia um pedido do catálogo para o Firestore.
 * O id é determinístico (baseado em timestamp + random)
 * para evitar duplicar se o usuário clicar 2x.
 */
window.DM_enviarPedido = async function (pedido) {
  const id = 'cat_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

  // Remove undefined (Firestore rejeita)
  const limpo = JSON.parse(JSON.stringify(pedido));

  await setDoc(doc(fdb, 'pedidosCatalogo', id), {
    ...limpo,
    id,
    status: 'novo',
    origem: 'catalogo',
    criadoEm: serverTimestamp()
  });

  return id;
};

// Sinaliza que está pronto
window.DM_CATALOGO_PRONTO = true;
document.dispatchEvent(new CustomEvent('dm-catalogo-pronto'));
