// src/components/Card.jsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * props:
 *  - cards: []
 *  - mode: 'sequential' | 'random'
 *  - direction: 'EN_TR' | 'TR_EN' | 'MIXED'
 *  - onScore(card, score)
 */
export default function Card({ cards, mode = 'sequential', direction = 'EN_TR', onScore }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [frontIsEN, setFrontIsEN] = useState(true); // MIXED için kart bazlı state

  // Sıralama
  const order = useMemo(() => {
    if (!Array.isArray(cards)) return [];
    if (mode === 'random') {
      const s = [...cards];
      for (let i = s.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [s[i], s[j]] = [s[j], s[i]];
      }
      return s;
    }
    return cards;
  }, [cards, mode]);

  const card = order[index];

  // Yön ayarı: her kart değiştiğinde ön yüz hangi dil?
  useEffect(() => {
    if (!card) return;
    if (direction === 'EN_TR') setFrontIsEN(true);
    else if (direction === 'TR_EN') setFrontIsEN(false);
    else setFrontIsEN(Math.random() < 0.5); // MIXED
  }, [index, direction, card]);

  const flip = useCallback(() => setFlipped(f => !f), []);
  const next = useCallback(() => {
    setFlipped(false);
    setIndex(i => (i + 1) % (order.length || 1));
  }, [order.length]);

  // Klavye kısayolları
  useEffect(() => {
    function onKey(e) {
      if (!order.length) return;
      if (e.code === 'Space') { e.preventDefault(); flip(); }
      if (e.key === 'n' || e.key === 'N') next();
      if (['1','2','3','4'].includes(e.key)) {
        const score = ({ '1':'again', '2':'hard', '3':'good', '4':'easy' })[e.key];
        if (onScore && card) {
          const p = onScore(card, score);
          if (p && typeof p.finally === 'function') p.finally(() => next());
          else next();
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [order.length, onScore, card, flip, next]);

  if (!order.length) {
    return (
      <div className="rounded-xl border p-8 text-center text-gray-500">
        Henüz kart yok. Yönet sayfasından kart ekleyebilir veya JSON import yapabilirsin.
      </div>
    );
  }

  // İçerik blokları
  const FrontBlock = () => {
    if (frontIsEN) {
      return (
        <>
          <div className="text-xs uppercase tracking-wide text-indigo-700/80 mb-2">{card?.partOfSpeech || 'term'}</div>
          <div className="text-2xl sm:text-3xl font-semibold break-words">{card?.term || '—'}</div>
          <div className="mt-2 text-gray-700 dark:text-gray-200 break-words">{card?.definitionEn || '—'}</div>
          {card?.ipa ? <div className="mt-1 text-sm text-gray-500">{card.ipa}</div> : null}
          {card?.collocations?.length ? (
            <div className="mt-3">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Collocations</div>
              <div className="flex flex-wrap gap-2">
                {card.collocations.slice(0, 6).map((c, i) => (
                  <span key={i} className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-200 dark:border-indigo-800">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </>
      );
    }
    // TR ön yüz
    return (
      <>
        <div className="text-xs uppercase tracking-wide text-emerald-700/80 mb-2">TR Anlam</div>
        <div className="text-2xl sm:text-3xl font-semibold">{card?.definitionTr || '—'}</div>
        <div className="mt-2 text-gray-600 text-sm">("Çevir" ile İngilizcesini gör)</div>
      </>
    );
  };

  const BackBlock = () => {
    if (frontIsEN) {
      // arka: TR
      return (
        <>
          <div className="text-xs uppercase tracking-wide text-emerald-700/80 mb-2">TR Anlam</div>
          <div className="text-2xl sm:text-3xl font-semibold">{card?.definitionTr || '—'}</div>
          {card?.examples?.length ? (
            <div className="mt-4 space-y-2">
              <div className="text-xs font-medium text-gray-500">Örnekler</div>
              {card.examples.slice(0, 2).map((ex, i) => (
                <div key={i} className="text-sm">
                  <div className="text-gray-800">• {ex.en}</div>
                  {ex.tr ? <div className="text-gray-500">— {ex.tr}</div> : null}
                </div>
              ))}
            </div>
          ) : null}
        </>
      );
    }
    // arka: EN (TR ön yüzken)
    return (
      <>
        <div className="text-xs uppercase tracking-wide text-indigo-700/80 mb-2">{card?.partOfSpeech || 'term'}</div>
        <div className="text-2xl sm:text-3xl font-semibold">{card?.term || '—'}</div>
        <div className="mt-2 text-gray-700 dark:text-gray-200">{card?.definitionEn || '—'}</div>
        {card?.ipa ? <div className="mt-1 text-sm text-gray-500">{card.ipa}</div> : null}
        {card?.examples?.length ? (
          <div className="mt-4 space-y-2">
            <div className="text-xs font-medium text-gray-500">Örnekler</div>
            {card.examples.slice(0, 2).map((ex, i) => (
              <div key={i} className="text-sm">
                <div className="text-gray-800">• {ex.en}</div>
                {ex.tr ? <div className="text-gray-500">— {ex.tr}</div> : null}
              </div>
            ))}
          </div>
        ) : null}
      </>
    );
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="relative h-72 sm:h-80 px-3 sm:px-0" style={{ perspective: 1000 }}>
        <div
          // className={`absolute inset-0 rounded-2xl shadow-xl border bg-white transition-transform duration-500 [transform-style:preserve-3d] ${
          //   flipped ? '[transform:rotateY(180deg)]' : ''
          // }`}
          // className={`absolute inset-0 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/95 transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
          className={`absolute inset-0 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/95 transition-transform duration-500 card3d ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
          aria-live="polite"
        >
          {/* front */}
          <div className="absolute inset-0 p-6 sm:p-8 backface-hidden flex flex-col justify-between">
            <div><FrontBlock /></div>
            <div className="flex items-center justify-between">
              <button className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={flip} aria-label="Kartı çevir (Space)">
                Ön/Arka (Space)
              </button>
              <div className="text-sm text-gray-500 dark:text-gray-400">{index + 1} / {order.length}</div>
            </div>
          </div>

          {/* back */}
          <div className="absolute inset-0 p-6 sm:p-8 backface-hidden [transform:rotateY(180deg)] flex flex-col justify-between">
            <div><BackBlock /></div>
            <div className="flex gap-2 justify-between items-center">
              <div className="flex gap-2">
                <button className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={flip}>Ön Yüz</button>
                <button className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={next} aria-label="Sonraki (N)">Sonraki (N)</button>
              </div>
              <div className="flex gap-2">
                <ScoreButton onClick={() => onScore && onScore(card, 'again')} label="Again" k="1" />
                <ScoreButton onClick={() => onScore && onScore(card, 'hard')}  label="Hard"  k="2" />
                <ScoreButton onClick={() => onScore && onScore(card, 'good')}  label="Good"  k="3" />
                <ScoreButton onClick={() => onScore && onScore(card, 'easy')}  label="Easy"  k="4" />
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="mt-3 text-xs text-gray-500">Kısayollar: Space=çevir, 1–4=puan, N=sonraki</div>
    </div>
  );
}

function ScoreButton({ onClick, label, k }) {
  return (
    <button
      className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg border hover:bg-gray-50"
      onClick={onClick}
      aria-label={`${label} (${k})`}
      title={`${label} (${k})`}
    >
      {label}
    </button>
  );
}
