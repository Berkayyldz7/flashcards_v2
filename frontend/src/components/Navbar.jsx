// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useTopic, topics } from '../context/TopicContext';
// // ❌ import { ... } from "@/components/ui/select";
// // ✅
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

// export default function Navbar({ count }) {
//   const [open, setOpen] = React.useState(false);
//   const [openDropdown, setOpenDropdown] = React.useState(false);
//   const { topic, setTopic } = useTopic();

//   const linkCls = ({ isActive }) =>
//     `px-3 py-2 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-white shadow border' : 'border'}`;

//   function handleSelect(val){
//     setTopic(val);
//     setOpenDropdown(false);
//     window.dispatchEvent(new CustomEvent('cards:changed'));
//   }

//   return (
//     <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
//       <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
//         <div className="flex items-center gap-3">
//           <button
//             className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-gray-100"
//             aria-label="Menüyü aç/kapat"
//             onClick={() => setOpen(v => !v)}
//           >
//             <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
//           </button>
//           <div className="flex items-center gap-2">
//             <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">Q</span>
//             <span className="font-semibold">Quizlett Clone</span>
//           </div>
//         </div>

//         {/* Global Topic Select */}
//         <div className="relative">
//           <Select value={topic} onValueChange={handleSelect}>
//             {({ value }) => (
//               <>
//                 <SelectTrigger onClick={() => setOpenDropdown(o => !o)}>
//                   <SelectValue value={value} placeholder="Topic select" />
//                 </SelectTrigger>
//                 <SelectContent open={openDropdown}>
//                   {topics.map(t => (
//                     <SelectItem key={t} value={t} onSelect={handleSelect}>{t}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </>
//             )}
//           </Select>
//         </div>

//         <nav className="hidden md:flex items-center gap-2">
//           <NavLink to="/practice" className={linkCls}>Pratik</NavLink>
//           <NavLink to="/manage" className={linkCls}>Yönet</NavLink>
//           <NavLink to="/import-export" className={linkCls}>İçe/Dışa Aktarım</NavLink>
//         </nav>

//         <div className="text-sm text-gray-600 whitespace-nowrap">
//           Toplam kart: <span className="font-semibold">{count ?? 0}</span>
//         </div>
//       </div>

//       {open && (
//         <div className="md:hidden border-t">
//           <div className="mx-auto max-w-5xl px-4 py-2 flex flex-col gap-2">
//             <NavLink to="/practice" className={linkCls} onClick={() => setOpen(false)}>Pratik</NavLink>
//             <NavLink to="/manage" className={linkCls} onClick={() => setOpen(false)}>Yönet</NavLink>
//             <NavLink to="/import-export" className={linkCls} onClick={() => setOpen(false)}>İçe/Dışa Aktarım</NavLink>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }




// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useTopic, topics } from '../context/TopicContext';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

// export default function Navbar({ count }) {
//   const [open, setOpen] = React.useState(false);
//   const [openDropdown, setOpenDropdown] = React.useState(false);
//   const { topic, setTopic } = useTopic();

//   const linkCls = ({ isActive }) =>
//     `px-3 py-2 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-white shadow border' : 'border'}`;

//   function handleSelect(val){
//     // Sadece state'i güncelle; fetch'i sayfalar topic değişimini dinleyerek yapacak.
//     setTopic(val);
//     setOpenDropdown(false);
//   }

//   return (
//     <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
//       <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
//         <div className="flex items-center gap-3">
//           <button
//             className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-gray-100"
//             aria-label="Menüyü aç/kapat"
//             onClick={() => setOpen(v => !v)}
//           >
//             <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
//           </button>
//           <div className="flex items-center gap-2">
//             <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">Q</span>
//             <span className="font-semibold">Quizlett Clone</span>
//           </div>
//         </div>

//         {/* Global Topic Select */}
//         <div className="relative">
//           <Select value={topic} onValueChange={handleSelect}>
//             {({ value }) => (
//               <>
//                 <SelectTrigger onClick={() => setOpenDropdown(o => !o)}>
//                   <SelectValue value={value} placeholder="Topic select" />
//                 </SelectTrigger>
//                 <SelectContent open={openDropdown}>
//                   {topics.map(t => (
//                     <SelectItem key={t} value={t} onSelect={handleSelect}>{t}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </>
//             )}
//           </Select>
//         </div>

//         <nav className="hidden md:flex items-center gap-2">
//           <NavLink to="/practice" className={linkCls}>Pratik</NavLink>
//           <NavLink to="/manage" className={linkCls}>Yönet</NavLink>
//           <NavLink to="/import-export" className={linkCls}>İçe/Dışa Aktarım</NavLink>
//         </nav>

//         <div className="text-sm text-gray-600 whitespace-nowrap">
//           Toplam kart: <span className="font-semibold">{count ?? 0}</span>
//         </div>
//       </div>

//       {open && (
//         <div className="md:hidden border-t">
//           <div className="mx-auto max-w-5xl px-4 py-2 flex flex-col gap-2">
//             <NavLink to="/practice" className={linkCls} onClick={() => setOpen(false)}>Pratik</NavLink>
//             <NavLink to="/manage" className={linkCls} onClick={() => setOpen(false)}>Yönet</NavLink>
//             <NavLink to="/import-export" className={linkCls} onClick={() => setOpen(false)}>İçe/Dışa Aktarım</NavLink>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTopic, topics } from '../context/TopicContext';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar({ count }) {
  const { user, signout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const { topic, setTopic } = useTopic();

  const linkCls = ({ isActive }) =>
    `px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? 'bg-white/90 dark:bg-gray-900/80 shadow border border-gray-300 dark:border-gray-700' : 'border border-gray-300 dark:border-gray-700'}`;

  function handleSelect(val){
    setTopic(val); // event tetiklemiyoruz (race yok)
    setOpenDropdown(false);
  }

  return (
    <header className="sticky top-0 z-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-5xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Menüyü aç/kapat"
            onClick={() => setOpen(v => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">Q</span>
            <span className="font-semibold">Quizlett Clone</span>
          </div>
        </div>

        {/* Global Topic Select */}
        <div className="relative w-full sm:w-auto">
          <Select className="w-36 sm:w-40 rounded-lg border px-2 py-2 border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100" value={topic} onValueChange={handleSelect}>
            {({ value }) => (
              <>
                <SelectTrigger onClick={() => setOpenDropdown(o => !o)} className=" w-full sm:w-48 border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 hover:bg-white dark:hover:bg-gray-800">
                  <SelectValue value={value} placeholder="Topic select" />
                </SelectTrigger>
                <SelectContent open={openDropdown}>
                  <div className="rounded-md border dark:border-gray-700 bg-white dark:bg-gray-900 shadow">
                    {topics.map(t => (
                      <SelectItem key={t} value={t} onSelect={handleSelect} className="cursor-pointer focus:bg-indigo-500 focus:text-white dark:focus:bg-indigo-600 dark:focus:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="block px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">{t}</span>
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </>
            )}
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/practice" className={linkCls}>Pratik</NavLink>
            <NavLink to="/manage" className={linkCls}>Yönet</NavLink>
            <NavLink to="/import-export" className={linkCls}>İçe/Dışa Aktarım</NavLink>
          </nav>
          <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
            Toplam: <span className="font-semibold">{count ?? 0}</span>
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">👤 {user.username}</span>
              <button onClick={signout} className="rounded-lg border px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">Çıkış</button>
            </div>
          ) : (
            <Link to="/login" className="rounded-lg border px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">Giriş</Link>
          )}
          <ThemeToggle />
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t dark:border-gray-800">
          <div className="mx-auto max-w-5xl px-4 py-2 flex flex-col gap-2">
            <NavLink to="/practice" className={linkCls} onClick={() => setOpen(false)}>Pratik</NavLink>
            <NavLink to="/manage" className={linkCls} onClick={() => setOpen(false)}>Yönet</NavLink>
            <NavLink to="/import-export" className={linkCls} onClick={() => setOpen(false)}>İçe/Dışa Aktarım</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

