import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CredWidget from './App';

export const init = (config) => {
  const root = ReactDOM.createRoot(document.getElementById(config.elementId || ""));
  root.render(
    <CredWidget token={config.token} />
  );
}
