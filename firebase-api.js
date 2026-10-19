// ============================================================
// firebase-api.js
// Funções de leitura/gravação no Firestore
// De Minas Pão de Queijaria — v15.1 Cloud
// ============================================================

import {
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, serverTimestamp, writeBatch, onSnapshot, deleteField
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import { db, auth, googleProvider, signInWithPopup, signOut, ADMIN_EMAIL } from "./firebase-config.js";

// ------------------------------------------------------------
// AUTENTICAÇÃO
// ------------------------------------------------------------

export async function entrarComGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (user.email !== ADMIN_EMAIL) {
      await signOut(auth);
      throw new Error(`Acesso negado. Esta conta (${user.email}) não tem permissão.`);
    }
    return { ok: true, user };
  } catch (e) {
    return { ok: false, erro: e.message };
  }
}

export async function sair() {
  await signOut(auth);
}

// ------------------------------------------------------------
// PRODUTOS
// ------------------------------------------------------------

export async function carregarProdutos() {
  const snap = await getDocs(collection(db, "produtos"));
  const prods = [];
  snap.forEach(d => prods.push({ id: d.id, ...d.data() }));
  return prods;
}

export async function salvarProduto(produto) {
  const ref = doc(db, "produtos", produto.id);
  await setDoc(ref, { ...produto, atualizadoEm: serverTimestamp() }, { merge: true });
}

export async function deletarProduto(id) {
  await deleteDoc(doc(db, "produtos", id));
}

export async function salvarTodosProdutos(produtos) {
  const batch = writeBatch(db);
  produtos.forEach(p => {
    const ref = doc(db, "produtos", p.id);
    batch.set(ref, { ...p, atualizadoEm: serverTimestamp() }, { merge: true });
  });
  await batch.commit();
}

// ------------------------------------------------------------
// PEDIDOS (WhatsApp + Atacado)
// ------------------------------------------------------------

export async function criarPedido(pedido) {
  const ref = await addDoc(collection(db, "pedidos"), {
    ...pedido,
    criadoEm: serverTimestamp(),
    atualizadoEm: serverTimestamp()
  });
  return ref.id;
}

export async function atualizarPedido(id, dados) {
  await updateDoc(doc(db, "pedidos", id), {
    ...dados,
    atualizadoEm: serverTimestamp()
  });
}

export async function listarPedidos() {
  const snap = await getDocs(collection(db, "pedidos"));
  const lista = [];
  snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
  lista.sort((a, b) => String(b.data || "").localeCompare(String(a.data || "")));
  return lista;
}

export function observarPedidos(callback) {
  const q = query(collection(db, "pedidos"), orderBy("criadoEm", "desc"), limit(500));
  return onSnapshot(q, snap => {
    const lista = [];
    snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
    callback(lista);
  });
}

// ------------------------------------------------------------
// VENDAS (PDV)
// ------------------------------------------------------------

export async function criarVenda(venda) {
  const ref = await addDoc(collection(db, "vendas"), {
    ...venda,
    criadoEm: serverTimestamp()
  });
  return ref.id;
}

export async function listarVendas() {
  const snap = await getDocs(collection(db, "vendas"));
  const lista = [];
  snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
  return lista;
}

// ------------------------------------------------------------
// CLIENTES (PF)
// ------------------------------------------------------------

export async function salvarCliente(cliente) {
  const ref = doc(db, "clientes", cliente.id);
  await setDoc(ref, { ...cliente, atualizadoEm: serverTimestamp() }, { merge: true });
}

export async function listarClientes() {
  const snap = await getDocs(collection(db, "clientes"));
  const lista = [];
  snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
  return lista;
}

export async function deletarCliente(id) {
  await deleteDoc(doc(db, "clientes", id));
}

// ------------------------------------------------------------
// CLIENTES B2B
// ------------------------------------------------------------

export async function salvarAtCli(cliente) {
  const ref = doc(db, "atacado_clientes", cliente.id);
  await setDoc(ref, { ...cliente, atualizadoEm: serverTimestamp() }, { merge: true });
}

export async function listarAtClis() {
  const snap = await getDocs(collection(db, "atacado_clientes"));
  const lista = [];
  snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
  return lista;
}

// ------------------------------------------------------------
// PEDIDOS B2B
// ------------------------------------------------------------

export async function criarAtPed(pedido) {
  const ref = await addDoc(collection(db, "atacado_pedidos"), {
    ...pedido,
    criadoEm: serverTimestamp(),
    atualizadoEm: serverTimestamp()
  });
  return ref.id;
}

export async function listarAtPeds() {
  const snap = await getDocs(collection(db, "atacado_pedidos"));
  const lista = [];
  snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
  return lista;
}

// ------------------------------------------------------------
// FORNECEDORES
// ------------------------------------------------------------

export async function salvarFornecedor(forn) {
  const ref = doc(db, "fornecedores", forn.id);
  await setDoc(ref, { ...forn, atualizadoEm: serverTimestamp() }, { merge: true });
}

export async function listarFornecedores() {
  const snap = await getDocs(collection(db, "fornecedores"));
  const lista = [];
  snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
  return lista;
}

// ------------------------------------------------------------
// VENDEDORES
// ------------------------------------------------------------

export async function salvarVendedor(v) {
  const ref = doc(db, "vendedores", v.id);
  await setDoc(ref, { ...v, atualizadoEm: serverTimestamp() }, { merge: true });
}

export async function listarVendedores() {
  const snap = await getDocs(collection(db, "vendedores"));
  const lista = [];
  snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
  return lista;
}

// ------------------------------------------------------------
// FINANCEIRO
// ------------------------------------------------------------

export async function salvarAP(conta) {
  const ref = doc(db, "financeiro_ap", conta.id);
  await setDoc(ref, { ...conta, atualizadoEm: serverTimestamp() }, { merge: true });
}

export async function listarAP() {
  const snap = await getDocs(collection(db, "financeiro_ap"));
  const lista = [];
  snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
  return lista;
}

export async function salvarAR(conta) {
  const ref = doc(db, "financeiro_ar", conta.id);
  await setDoc(ref, { ...conta, atualizadoEm: serverTimestamp() }, { merge: true });
}

export async function listarAR() {
  const snap = await getDocs(collection(db, "financeiro_ar"));
  const lista = [];
  snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
  return lista;
}

export async function salvarDespesa(d) {
  const ref = doc(db, "financeiro_despesas", d.id);
  await setDoc(ref, { ...d, atualizadoEm: serverTimestamp() }, { merge: true });
}

export async function listarDespesas() {
  const snap = await getDocs(collection(db, "financeiro_despesas"));
  const lista = [];
  snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
  return lista;
}

// ------------------------------------------------------------
// CONFIG
// ------------------------------------------------------------

export async function carregarConfig() {
  const ref = doc(db, "config", "loja");
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function salvarConfig(cfg) {
  const ref = doc(db, "config", "loja");
  const { pin, ...resto } = cfg || {};
  await setDoc(ref, { ...resto, pin: deleteField(), atualizadoEm: serverTimestamp() }, { merge: true });
}

// ------------------------------------------------------------
// MIGRAÇÃO
// ------------------------------------------------------------

export async function migrarTudoParaNuvem(dbLocal) {
  const mapa = {
    prods: "produtos", peds: "pedidos", vendas: "vendas", clis: "clientes",
    atClis: "atacado_clientes", atPeds: "atacado_pedidos", forns: "fornecedores",
    vends: "vendedores", ap: "financeiro_ap", ar: "financeiro_ar", desps: "financeiro_despesas"
  };
  const TAM_LOTE = 400;
  const resultados = {};
  for (const [chaveLocal, nomeColecao] of Object.entries(mapa)) {
    const lista = dbLocal[chaveLocal] || [];
    if (!lista.length) { resultados[nomeColecao] = 0; continue; }
    try {
      let enviados = 0;
      for (let i = 0; i < lista.length; i += TAM_LOTE) {
        const batch = writeBatch(db);
        lista.slice(i, i + TAM_LOTE).forEach(item => {
          const limpo = JSON.parse(JSON.stringify(item));
          const id = String(limpo.id || `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`).replace(/\//g, "_");
          const ref = doc(db, nomeColecao, id);
          batch.set(ref, { ...limpo, id, migradoEm: serverTimestamp() }, { merge: true });
        });
        await batch.commit();
        enviados += Math.min(TAM_LOTE, lista.length - i);
      }
      resultados[nomeColecao] = enviados;
    } catch (e) { resultados[nomeColecao] = `ERRO: ${e.message}`; }
  }
  return resultados;
}

// ------------------------------------------------------------
// CATÁLOGO PÚBLICO
// ------------------------------------------------------------

export async function listarPedidosCatalogo() {
  const snap = await getDocs(collection(db, "pedidosCatalogo"));
  const lista = [];
  snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
  lista.sort((a, b) => {
    const ta = a.criadoEm?.seconds || 0;
    const tb = b.criadoEm?.seconds || 0;
    return tb - ta;
  });
  return lista;
}

// Tempo real: chama o callback sempre que mudar a lista de pedidos NOVOS do catálogo
export function observarPedidosCatalogo(callback, onError) {
  const q = query(collection(db, "pedidosCatalogo"), where("status", "==", "novo"));
  return onSnapshot(q, snap => {
    const lista = [];
    snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
    lista.sort((a, b) => (b.criadoEm?.seconds || Date.now() / 1000) - (a.criadoEm?.seconds || Date.now() / 1000));
    callback(lista);
  }, err => { if (onError) onError(err); else console.error(err); });
}

export async function atualizarPedidoCatalogo(id, dados) {
  await updateDoc(doc(db, "pedidosCatalogo", id), { ...dados, atualizadoEm: serverTimestamp() });
}

export async function deletarPedidoCatalogo(id) {
  await deleteDoc(doc(db, "pedidosCatalogo", id));
}

// ------------------------------------------------------------
// EXCLUSÕES
// ------------------------------------------------------------

const MAPA_COL = {
  prods: "produtos", peds: "pedidos", vendas: "vendas", clis: "clientes",
  atClis: "atacado_clientes", atPeds: "atacado_pedidos", forns: "fornecedores",
  vends: "vendedores", ap: "financeiro_ap", ar: "financeiro_ar", desps: "financeiro_despesas"
};
const _idSeguro = id => String(id).replace(/\//g, "_");

export async function registrarExclusoes(lista) {
  const itens = (lista || []).filter(e => e && MAPA_COL[e.c] && e.id != null);
  const TAM = 200;
  for (let i = 0; i < itens.length; i += TAM) {
    const batch = writeBatch(db);
    itens.slice(i, i + TAM).forEach(e => {
      const id = _idSeguro(e.id);
      batch.delete(doc(db, MAPA_COL[e.c], id));
      batch.set(doc(db, "excluidos", `${e.c}__${id}`), { c: e.c, id: String(e.id), em: e.em || Date.now() });
    });
    await batch.commit();
  }
}

export async function listarExclusoes() {
  const snap = await getDocs(collection(db, "excluidos"));
  const lista = [];
  snap.forEach(d => lista.push(d.data()));
  return lista;
}

export async function apagarDocs(lista) {
  const itens = (lista || []).filter(e => e && MAPA_COL[e.c] && e.id != null);
  const TAM = 400;
  for (let i = 0; i < itens.length; i += TAM) {
    const batch = writeBatch(db);
    itens.slice(i, i + TAM).forEach(e => batch.delete(doc(db, MAPA_COL[e.c], _idSeguro(e.id))));
    await batch.commit();
  }
}
