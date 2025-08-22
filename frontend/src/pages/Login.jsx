// import React, { useState } from 'react';
// import { login, register } from '../services/auth';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const { signin } = useAuth();
//   const nav = useNavigate();
//   const [mode, setMode] = useState('login'); // 'login' | 'register'
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [err, setErr] = useState('');

//   async function submit(e) {
//     e.preventDefault();
//     setErr('');
//     try {
//       const data = mode === 'login'
//         ? await login(username, password)
//         : await register(username, password, email || undefined);
//       signin(data);
//       nav('/manage'); // giriş sonrası yönet sayfasına
//     } catch (e) {
//       setErr(e.message || 'Hata');
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700">
//       <h1 className="text-xl font-semibold mb-4">{mode === 'login' ? 'Giriş yap' : 'Kayıt ol'}</h1>

//       <form onSubmit={submit} className="space-y-3">
//         {mode === 'register' && (
//           <div>
//             <label className="block text-sm mb-1">E‑posta (opsiyonel)</label>
//             <input className="w-full rounded-lg border px-3 py-2 bg-white text-gray-900 border-gray-300 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700"
//                    value={email} onChange={e=>setEmail(e.target.value)} placeholder="berkay@example.com" />
//           </div>
//         )}
//         <div>
//           <label className="block text-sm mb-1">Kullanıcı adı</label>
//           <input className="w-full rounded-lg border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
//                  value={username} onChange={e=>setUsername(e.target.value)} required />
//         </div>
//         <div>
//           <label className="block text-sm mb-1">Şifre</label>
//           <input type="password" className="w-full rounded-lg border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
//                  value={password} onChange={e=>setPassword(e.target.value)} required />
//         </div>

//         {err ? <div className="text-sm text-red-600">{err}</div> : null}

//         <button type="submit"
//                 className="w-full mt-2 rounded-lg border px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-700">
//           {mode === 'login' ? 'Giriş' : 'Kayıt'}
//         </button>
//       </form>

//       <div className="text-sm mt-3">
//         {mode === 'login' ? (
//           <button className="underline" onClick={()=>setMode('register')}>Hesabın yok mu? Kayıt ol</button>
//         ) : (
//           <button className="underline" onClick={()=>setMode('login')}>Zaten hesabın var mı? Giriş yap</button>
//         )}
//       </div>
//     </div>
//   );
// }

// src/pages/Login.jsx
import React, { useState } from 'react';
import { login, register } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { signin } = useAuth();
  const nav = useNavigate();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (loading) return;
    setErr('');
    setLoading(true);
    try {
      const data =
        mode === 'login'
          ? await login(username, password)
          : await register(username, password, email || undefined);
      signin(data);          // token + user set edilir
      nav('/manage');        // girişten sonra yönet sayfasına
    } catch (e) {
      setErr(e.message || 'Hata');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm">
      <h1 className="text-xl font-semibold mb-4">
        {mode === 'login' ? 'Giriş yap' : 'Kayıt ol'}
      </h1>

      <form onSubmit={submit} className="space-y-3">
        {mode === 'register' && (
          <div>
            <label className="block text-sm mb-1">E‑posta (opsiyonel)</label>
            <input
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border px-3 py-2
                         bg-white text-gray-900 border-gray-300 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="berkay@example.com"
            />
          </div>
        )}

        <div>
          <label className="block text-sm mb-1">Kullanıcı adı</label>
          <input
            autoComplete="username"
            className="w-full rounded-lg border px-3 py-2
                       bg-white text-gray-900 border-gray-300 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="berkay"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Şifre</label>
          <input
            type="password"
            autoComplete="current-password"
            className="w-full rounded-lg border px-3 py-2
                       bg-white text-gray-900 border-gray-300 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••"
          />
        </div>

        {err ? <div className="text-sm text-red-600">{err}</div> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 rounded-lg px-3 py-2
                     bg-indigo-600 text-white hover:bg-indigo-700
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Gönderiliyor…' : mode === 'login' ? 'Giriş' : 'Kayıt'}
        </button>
      </form>

      <div className="text-sm mt-3">
        {mode === 'login' ? (
          <button className="underline" onClick={() => setMode('register')}>
            Hesabın yok mu? Kayıt ol
          </button>
        ) : (
          <button className="underline" onClick={() => setMode('login')}>
            Zaten hesabın var mı? Giriş yap
          </button>
        )}
      </div>
    </div>
  );
}
