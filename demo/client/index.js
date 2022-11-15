import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { BrowserRouter, NavLink } from 'react-router-dom';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(

<div className='NavBar'>
  <React.StrictMode>
    <BrowserRouter>

  <nav className='nav'>
    <ul>
      <li><NavLink to={'/'}>Demo</NavLink></li>
      <li><NavLink to={'/landing'}>Landing</NavLink></li>
    </ul>
  </nav>

      <App />
    </BrowserRouter>
  </React.StrictMode>

</div>
    
);
