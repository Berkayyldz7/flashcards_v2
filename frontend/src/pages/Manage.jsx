// // import React, { useEffect, useState, useCallback } from 'react';
// // import { fetchCards, deleteCard } from '../services/api';
// // import CardForm from '../components/CardForm';
// // import CardList from '../components/CardList';

// // export default function Manage() {
// //   const [cards, setCards] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const load = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const data = await fetchCards();
// //       setCards(data);
// //     } finally { setLoading(false); }
// //   }, []);

// //   useEffect(() => { load(); }, [load]);

// //   async function onDelete(c) {
// //     if (!window.confirm(`Silinsin mi: ${c.term}?`)) return;
// //     await deleteCard(c._id);
// //     setCards(prev => prev.filter(x => x._id !== c._id));
// //     window.dispatchEvent(new CustomEvent('cards:changed'));
// //   }

// //   return (
// //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //       <section className="rounded-xl border p-4">
// //         <h3 className="font-medium mb-3">Yeni Kart Ekle</h3>
// //         <CardForm onCreated={(c)=> { setCards(prev => [c, ...prev]); window.dispatchEvent(new CustomEvent('cards:changed')); }} />
// //       </section>

// //       <section className="rounded-xl border p-4">
// //         <div className="flex items-center justify-between mb-3">
// //           <h3 className="font-medium">Kartlar</h3>
// //           <button onClick={load} className="px-3 py-1 rounded border hover:bg-gray-50">Yenile</button>
// //         </div>
// //         {loading ? (
// //           <div className="text-gray-500">Yükleniyor…</div>
// //         ) : (
// //           <CardList cards={cards} onDelete={onDelete} />
// //         )}
// //       </section>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState, useCallback } from 'react';
// import { fetchCards, deleteCard } from '../services/api';
// import CardForm from '../components/CardForm';
// import CardList from '../components/CardList';
// import { useTopic } from '../context/TopicContext';

// export default function Manage() {
//   const { topic } = useTopic();
//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await fetchCards(topic);
//       setCards(data);
//     } finally { setLoading(false); }
//   }, [topic]);

//   useEffect(() => { load(); }, [load]);

//   async function onDelete(c) {
//     if (!window.confirm(`Silinsin mi: ${c.term}?`)) return;
//     await deleteCard(c._id);
//     setCards(prev => prev.filter(x => x._id !== c._id));
//     window.dispatchEvent(new CustomEvent('cards:changed'));
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       <section className="rounded-xl border p-4">
//         <h3 className="font-medium mb-1">Yeni Kart Ekle</h3>
//         <p className="text-xs text-gray-500 mb-3">Aktif konu: <b>{topic}</b> (formda değiştirebilirsin)</p>
//         <CardForm
//           defaultTopic={topic !== 'All' ? topic : ''}
//           onCreated={(c)=> { setCards(prev => [c, ...prev]); window.dispatchEvent(new CustomEvent('cards:changed')); }}
//         />
//       </section>

//       <section className="rounded-xl border p-4">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="font-medium">Kartlar</h3>
//           <button onClick={load} className="px-3 py-1 rounded border hover:bg-gray-50">Yenile</button>
//         </div>
//         {loading ? (
//           <div className="text-gray-500">Yükleniyor…</div>
//         ) : (
//           <CardList cards={cards} onDelete={onDelete} />
//         )}
//       </section>
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback } from 'react';
import { fetchCards, deleteCard } from '../services/api';
import CardForm from '../components/CardForm';
import CardList from '../components/CardList';
import { useTopic } from '../context/TopicContext';

export default function Manage() {
  const { topic } = useTopic();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCards(topic);
      setCards(data);
    } finally { setLoading(false); }
  }, [topic]);

  useEffect(() => { load(); }, [load]);

  async function onDelete(c) {
    if (!window.confirm(`Silinsin mi: ${c.term}?`)) return;
    await deleteCard(c._id);
    setCards(prev => prev.filter(x => x._id !== c._id));
    window.dispatchEvent(new CustomEvent('cards:changed'));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <section className="rounded-xl border p-4">
        <h3 className="font-medium mb-1">Yeni Kart Ekle</h3>
        <p className="text-xs text-gray-500 mb-3">Aktif konu: <b>{topic}</b> (formda değiştirebilirsin)</p>
        <CardForm
          defaultTopic={topic !== 'All' ? topic : ''}
          onCreated={(c)=> { setCards(prev => [c, ...prev]); window.dispatchEvent(new CustomEvent('cards:changed')); }}
        />
      </section>

      <section className="rounded-xl border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Kartlar</h3>
          <button onClick={load} className="px-3 py-1 rounded border hover:bg-gray-50">Yenile</button>
        </div>
        {loading ? (
          <div className="text-gray-500">Yükleniyor…</div>
        ) : (
          <CardList cards={cards} onDelete={onDelete} />
        )}
      </section>
    </div>
  );
}
