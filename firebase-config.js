// ============================================================
// firebase-config.js
// Configuração e inicialização do Firebase
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

const firebaseConfig = {
  apiKey: "AIzaSyDj9wKSco9HEMNi7Iiu5xWZ1MqeZUpc5qQ",
  authDomain: "deminas-pedidos.firebaseapp.com",
  projectId: "deminas-pedidos",
  storageBucket: "deminas-pedidos.firebasestorage.app",
  messagingSenderId: "489232858438",
  appId: "1:489232858438:web:32e7bdfb10a44abb62b947"
};

const ADMIN_EMAIL = "franklinrainier@gmail.com";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence).catch(() => {});

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

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
