import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routing/AppRoutes'; // ✅ gunakan AppRoutes

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes /> {/* ✅ gunakan AppRoutes di sini */}
  </React.StrictMode>
);
