import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './style.css';


const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <div className='BodyDiv'>
    <App />
  </div>
);
