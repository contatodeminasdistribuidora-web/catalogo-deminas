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
 * O id do documento é o próprio código do pedido (ex.: DM-261017-A3F9),
 * o mesmo que o cliente vê no WhatsApp. Se o cliente clicar 2x, o segundo
 * envio é recusado pelas regras (só admin pode alterar) e não duplica.
 */
window.DM_enviarPedido = async function (pedido) {
  const id = pedido.codigo || ('DM-' + Date.now().toString(36).toUpperCase());

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
