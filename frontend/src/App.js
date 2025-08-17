import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Practice from './pages/Practice';
import Manage from './pages/Manage';
import ImportExport from './pages/ImportExport';

export default function App() {
  const [count, setCount] = React.useState(0);

  // toplam kart sayısını periyodik ve event ile güncelle
  React.useEffect(() => {
    async function readCount() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:5001'}/api/cards`);
        const data = await res.json();
        setCount(data.length || 0);
      } catch { /* ignore */ }
    }
    readCount();
    const t = setInterval(readCount, 1500);
    const h = () => readCount();
    window.addEventListener('cards:changed', h);
    return () => { clearInterval(t); window.removeEventListener('cards:changed', h); };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar count={count} />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/practice" replace />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/import-export" element={<ImportExport />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </main>
    </div>
  );
}

