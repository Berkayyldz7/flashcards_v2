// import React from 'react';

// export default function CardList({ cards, onEdit, onDelete }) {
//   if (!cards?.length) {
//     return <div className="text-gray-500">Kart yok.</div>;
//   }
//   return (
//     <ul className="divide-y rounded-lg border">
//       {cards.map(card => (
//         <li key={card._id} className="p-3 flex items-start justify-between gap-3">
//           <div>
//             <div className="font-medium">{card.term}</div>
//             <div className="text-sm text-gray-600">{card.definitionTr}</div>
//             <div className="text-xs text-gray-500">{card.definitionEn}</div>
//           </div>
//           <div className="flex gap-2">
//             <button onClick={() => onEdit?.(card)} className='px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 transition-colors'>Düzenle</button>
//             <button onClick={() => onDelete?.(card)} className="px-2.5 py-1.5 rounded-md border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-700/50 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30 transition-colors">Sil</button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }

// src/components/CardList.jsx
import React from 'react';

export default function CardList({ cards, onEdit, onDelete }) {
  if (!cards?.length) {
    return (
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-gray-600 dark:text-gray-300">
        Kart yok.
      </div>
    );
  }

  return (
    <ul
      className="
        rounded-lg
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900
        divide-y divide-gray-200 dark:divide-gray-800
      "
    >
      {cards.map((card) => (
        <li
          key={card._id}
          className="p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
        >
          {/* Sol taraf: metinler */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="font-medium break-words">{card.term}</div>
              {card.partOfSpeech ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded border
                                  border-gray-300 bg-gray-50 text-gray-600
                                  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {card.partOfSpeech}
                </span>
              ) : null}
              {card.topic ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded border
                                  border-indigo-200 bg-indigo-50 text-indigo-700
                                  dark:border-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-200">
                  {card.topic}
                </span>
              ) : null}
            </div>

            <div className="text-sm text-gray-700 dark:text-gray-200 break-words">
              {card.definitionTr}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 break-words">
              {card.definitionEn}
            </div>
          </div>

          {/* Sağ taraf: aksiyonlar */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => onEdit?.(card)}
              className="
                px-3 py-1.5 rounded-md
                border border-gray-300 bg-white text-gray-900 hover:bg-gray-50
                dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700
                transition-colors
              "
              aria-label="Kartı düzenle"
              title="Düzenle"
            >
              Düzenle
            </button>

            <button
              type="button"
              onClick={() => onDelete?.(card)}
              className="
                px-2.5 py-1.5 rounded-md
                border border-red-300 bg-red-50 text-red-700 hover:bg-red-100
                dark:border-red-700/50 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30
                transition-colors
              "
              aria-label="Kartı sil"
              title="Sil"
            >
              Sil
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

