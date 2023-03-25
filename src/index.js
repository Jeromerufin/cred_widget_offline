import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CredWidget from './App';

export const init = (config) => {
  ReactDOM.render(
    <CredWidget token={config.token} />,
    document.getElementById(config.elementId || "")
  );
}
