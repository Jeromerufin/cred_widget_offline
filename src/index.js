import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CredWidget from './App';

const widgetContainer = document.getElementById('my-widget-container');
if (widgetContainer) {
  const address = widgetContainer.getAttribute('data-address');
  const token = widgetContainer.getAttribute('data-token');
  ReactDOM.render(
    <CredWidget address={address} token={token} />,
    widgetContainer
  );
}