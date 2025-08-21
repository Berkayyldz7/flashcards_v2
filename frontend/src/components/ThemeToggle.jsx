import React from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false);

  // İlk yüklemede: localStorage veya system preference
  React.useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const enabled = stored ? stored === 'dark' : prefersDark;
    setIsDark(enabled);
    root.classList.toggle('dark', enabled);
  }, []);

  // Değişimde html.class ve localStorage güncelle
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(d => !d)}
      className= "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm bg-white/60 hover:bg-white dark:bg-gray-900/60 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-700 backdrop-blur"
      aria-label="Temayı değiştir"
      title="Temayı değiştir"
    >
      {isDark ? (
        <>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21.64 13A9 9 0 1111 2.36 7 7 0 0021.64 13z"/></svg>
          <span>Koyu</span>
        </>
      ) : (
        <>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9-10v-2h-3v2h3zM6.76 19.16l-1.8 1.8 1.79 1.79 1.8-1.8-1.79-1.79zM13 1h-2v3h2V1zm7.07 3.93l-1.79-1.79-1.8 1.79 1.8 1.8 1.79-1.8zM17.24 19.16l1.79 1.79 1.8-1.79-1.8-1.8-1.79 1.8z"/></svg>
          <span>Açık</span>
        </>
      )}
    </button>
  );
}
