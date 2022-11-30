import React from 'react';
import ReactDOM from 'react-dom/client';
//import { render } from 'react-dom';
import App from './App.js';
import './style.css';


const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <div className='BodyDiv'>
    <App />
  </div>
);

//render(<App />, document.getElementById('root'));

