import React from 'react';
import { createRoot } from 'react-dom/client'; // Импортируем createRoot
import { BrowserRouter } from 'react-router-dom'; // Импортируем BrowserRouter из 'react-router-dom'
import { StrictMode } from 'react'; // Импортируем StrictMode

import './index.css';
import App from './App.tsx';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
