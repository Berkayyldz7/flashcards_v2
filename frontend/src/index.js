
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { TopicProvider } from './context/TopicContext';
import { AuthProvider } from './context/AuthContext';

const root = createRoot(document.getElementById('root'));
root.render(
  // <BrowserRouter>
  //   <TopicProvider>
  //     <App />
  //   </TopicProvider>
  // </BrowserRouter>
  <React.StrictMode>
    <AuthProvider>
      <TopicProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TopicProvider>
    </AuthProvider>
  </React.StrictMode>
);
