import React from 'react';
import ReactDOM from 'react-dom/client';
//import { render } from 'react-dom';
import App from './App.js';
import './style.css';
import Footer from './components/Footer.js';
import cachierlogo from '../client/styles/CachierNavBar(1).png';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <div className='BodyDiv'>
    <App />
  </div>
);
