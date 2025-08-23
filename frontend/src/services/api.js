import { getToken } from "./auth";
// const BASE = process.env.REACT_APP_API_BASE || 'http://192.168.1.29:5001';
import { API_BASE } from "../lib/apiBase";

export async function fetchCards(topic) {
  const q = topic && topic !== 'All' ? `?topic=${encodeURIComponent(topic)}` : '';
  const res = await fetch(`${API_BASE}/api/cards${q}`);
  if (!res.ok) throw new Error('Kartlar alınamadı');
  return res.json();
}


export async function createCard(data) {
  const res = await fetch(`${API_BASE}/api/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,      // <-- ÖNEMLİ
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Kart eklenemedi');
  return res.json();
}

export async function updateCard(id, data) {
  const res = await fetch(`${API_BASE}/api/cards/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,      // <-- ÖNEMLİ
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Kart güncellenemedi');
  return res.json();
}

export async function deleteCard(id) {
  const res = await fetch(`${API_BASE}/api/cards/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` }, // <-- ÖNEMLİ
  });
  if (!res.ok) throw new Error((await res.json().catch(()=>({}))).error || 'Delete failed');
  return res.json();
}

export async function importCards(items) {
  const res = await fetch(`${API_BASE}/api/cards/import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,      // <-- ÖNEMLİ
    },
    body: JSON.stringify(items),
  });
  if (!res.ok) throw new Error('Import başarısız');
  return res.json();
}

export async function exportCards(format = 'json') {
  const res = await fetch(`${API_BASE}/api/cards/export?format=${format}`, {
    headers: { Authorization: `Bearer ${getToken()}` }, // <-- ÖNEMLİ
  });
  if (!res.ok) throw new Error((await res.json().catch(()=>({}))).error || 'Export failed');
  return res.text(); // csv ise text, json ise string olarak döner
}