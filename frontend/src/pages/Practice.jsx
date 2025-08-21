// // import React, { useEffect, useState, useCallback } from 'react';
// // import { fetchCards, updateCard } from '../services/api';
// // import Card from '../components/Card';

// // export default function Practice() {
// //   const [cards, setCards] = useState([]);
// //   const [orderMode, setOrderMode] = useState('sequential'); // 'sequential' | 'random'
// //   const [direction, setDirection] = useState('EN_TR');       // 'EN_TR' | 'TR_EN' | 'MIXED'
// //   const [loading, setLoading] = useState(true);

// //   const load = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const data = await fetchCards();
// //       setCards(data);
// //     } finally { setLoading(false); }
// //   }, []);

// //   useEffect(() => { load(); }, [load]);
// //   useEffect(() => {
// //     const h = () => load();
// //     window.addEventListener('cards:changed', h);
// //     return () => window.removeEventListener('cards:changed', h);
// //   }, [load]);

// //   async function onScore(card, score) {
// //     const patch = { reps: (card.reps || 0) + 1 };
// //     if (score === 'again') patch.box = 1;
// //     const updated = await updateCard(card._id, patch);
// //     setCards(prev => prev.map(x => x._id === card._id ? updated : x));
// //   }

// //   return (
// //     <div className="space-y-4">
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
// //         <h2 className="text-lg font-semibold">Pratik</h2>
// //         <div className="flex flex-wrap items-center gap-3">
// //           <label className="text-sm text-gray-600">Sıra:</label>
// //           <select value={orderMode} onChange={e=>setOrderMode(e.target.value)} className="rounded-lg border px-2 py-1">
// //             <option value="sequential">Sıralı</option>
// //             <option value="random">Rastgele</option>
// //           </select>

// //           <label className="text-sm text-gray-600 ml-2">Yön:</label>
// //           <select value={direction} onChange={e=>setDirection(e.target.value)} className="rounded-lg border px-2 py-1">
// //             <option value="EN_TR">EN → TR</option>
// //             <option value="TR_EN">TR → EN</option>
// //             <option value="MIXED">Karışık</option>
// //           </select>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div className="rounded-xl border p-8 text-center text-gray-500">Yükleniyor…</div>
// //       ) : (
// //         <Card cards={cards} mode={orderMode} direction={direction} onScore={onScore} />
// //       )}
// //     </div>
// //   );
// // }

// import React, { useEffect, useState, useCallback } from 'react';
// import { fetchCards, updateCard } from '../services/api';
// import Card from '../components/Card';
// import { useTopic } from '../context/TopicContext';

// export default function Practice() {
//   const { topic } = useTopic();
//   const [cards, setCards] = useState([]);
//   const [orderMode, setOrderMode] = useState('sequential');
//   const [direction, setDirection] = useState('EN_TR');
//   const [loading, setLoading] = useState(true);

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await fetchCards(topic); // << topic
//       setCards(data);
//     } finally { setLoading(false); }
//   }, [topic]);

//   useEffect(() => { load(); }, [load]);
//   useEffect(() => {
//     const h = () => load();
//     window.addEventListener('cards:changed', h);
//     return () => window.removeEventListener('cards:changed', h);
//   }, [load]);

//   async function onScore(card, score) {
//     const patch = { reps: (card.reps || 0) + 1 };
//     if (score === 'again') patch.box = 1;
//     const updated = await updateCard(card._id, patch);
//     setCards(prev => prev.map(x => x._id === card._id ? updated : x));
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//         <h2 className="text-lg font-semibold">Pratik <span className="text-gray-500 text-sm">({topic})</span></h2>
//         <div className="flex flex-wrap items-center gap-3">
//           <label className="text-sm text-gray-600">Sıra:</label>
//           <select value={orderMode} onChange={e=>setOrderMode(e.target.value)} className="rounded-lg border px-2 py-1">
//             <option value="sequential">Sıralı</option>
//             <option value="random">Rastgele</option>
//           </select>
//           <label className="text-sm text-gray-600">Yön:</label>
//           <select value={direction} onChange={e=>setDirection(e.target.value)} className="rounded-lg border px-2 py-1">
//             <option value="EN_TR">EN → TR</option>
//             <option value="TR_EN">TR → EN</option>
//             <option value="MIXED">Karışık</option>
//           </select>
//         </div>
//       </div>

//       {loading ? (
//         <div className="rounded-xl border p-8 text-center text-gray-500">Yükleniyor…</div>
//       ) : (
//         <Card cards={cards} mode={orderMode} direction={direction} onScore={onScore} />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback } from 'react';
import { fetchCards, updateCard } from '../services/api';
import Card from '../components/Card';
import { useTopic } from '../context/TopicContext';

export default function Practice() {
  const { topic } = useTopic();
  const [cards, setCards] = useState([]);
  const [orderMode, setOrderMode] = useState('sequential'); // 'sequential' | 'random'
  const [direction, setDirection] = useState('EN_TR');       // 'EN_TR' | 'TR_EN' | 'MIXED'
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCards(topic);
      setCards(data);
    } finally { setLoading(false); }
  }, [topic]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const h = () => load(); // import/silme sonrası manuel yenilemeler
    window.addEventListener('cards:changed', h);
    return () => window.removeEventListener('cards:changed', h);
  }, [load]);

  async function onScore(card, score) {
    const patch = { reps: (card.reps || 0) + 1 };
    if (score === 'again') patch.box = 1;
    const updated = await updateCard(card._id, patch);
    setCards(prev => prev.map(x => x._id === card._id ? updated : x));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg font-semibold">Pratik <span className="text-gray-500 text-sm">({topic})</span></h2>
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-gray-600">Sıra:</label>
          {/* <select value={orderMode} onChange={e=>setOrderMode(e.target.value)} className="rounded-lg border px-2 py-1">
            <option value="sequential">Sıralı</option>
            <option value="random">Rastgele</option>
          </select>

          <label className="text-sm text-gray-600 ml-2">Yön:</label>
          <select value={direction} onChange={e=>setDirection(e.target.value)} className="rounded-lg border px-2 py-1">
            <option value="EN_TR">EN → TR</option>
            <option value="TR_EN">TR → EN</option>
            <option value="MIXED">Karışık</option>
          </select> */}

          <select
            value={orderMode}
            onChange={e => setOrderMode(e.target.value)}
            className="
              rounded-lg border px-2 py-1
              border-gray-300 bg-white text-gray-900 hover:bg-gray-50
              dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-800
              transition-colors
            "
          >
            <option value="sequential">Sıralı</option>
            <option value="random">Rastgele</option>
          </select>


          <select
            value={direction}
            onChange={e => setDirection(e.target.value)}
            className="
              rounded-lg border px-2 py-1
              border-gray-300 bg-white text-gray-900 hover:bg-gray-50
              dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-800
              transition-colors
            "
          >
            <option value="EN_TR">EN → TR</option>
            <option value="TR_EN">TR → EN</option>
            <option value="MIXED">Karışık</option>
          </select>

        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border p-8 text-center text-gray-500 dark:text-gray-400">Yükleniyor…</div>
      ) : (
        <Card cards={cards} mode={orderMode} direction={direction} onScore={onScore} />
      )}
    </div>
  );
}
