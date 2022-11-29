import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { BrowserRouter, NavLink } from 'react-router-dom';
import './style.css';
import Footer from './components/Footer.js';
import cachierlogo from '../client/styles/cachierlogo.png'


const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <div className='BodyDiv'>
    <React.StrictMode>
        <App />
        {/* <Footer /> */}
    </React.StrictMode>
  </div>
);

// render(<App />, document.getElementById('root'));