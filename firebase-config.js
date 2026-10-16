// ============================================================
// firebase-config.js
// Configuração e inicialização do Firebase
// De Minas Pão de Queijaria — v15 Cloud
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// --- Credenciais do seu projeto Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyDj9wKSco9HEMNi7Iiu5xWZ1MqeZUpc5qQ",
  authDomain: "deminas-pedidos.firebaseapp.com",
  projectId: "deminas-pedidos",
  storageBucket: "deminas-pedidos.firebasestorage.app",
  messagingSenderId: "489232858438",
  appId: "1:489232858438:web:32e7bdfb10a44abb62b947"
};

// --- E-mail autorizado (só este pode entrar) ---
const ADMIN_EMAIL = "franklinrainier@gmail.com";

// --- Inicialização ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- Login persistente (não expira ao fechar navegador) ---
setPersistence(auth, browserLocalPersistence).catch(() => {});

// --- Provider Google ---
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// --- Exporta tudo que os outros módulos vão usar ---
export {
  app,
  db,
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  ADMIN_EMAIL
};
