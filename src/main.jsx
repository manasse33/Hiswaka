import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 1. Importation des styles globaux
import './index.css'; // Tes styles Tailwind et custom properties
import 'leaflet/dist/leaflet.css'; // Essentiel pour que la carte s'affiche correctement

// 2. Initialisation de l'internationalisation
import './i18n/config';

// 3. Rendu de l'application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);