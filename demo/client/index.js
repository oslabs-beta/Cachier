import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { BrowserRouter, NavLink } from 'react-router-dom';
import './style.css';
import logo from '../client/styles/logo.png';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <div className='BodyDiv'>
    <React.StrictMode>
      <BrowserRouter>
        <div className='navbar bg-neutral text-neutral-content sticky top-0 '>
          <div className='flex-1'>
            <img className='h-16 w-18' src={logo}></img>
            <a className='btn btn-ghost normal-case text-xl'>Cachier</a>
          </div>
          <div className='flex-none'>
            <ul className='menu menu-horizontal p-0'>
              <li>
                <a>
                  <NavLink to={'/'}>Home</NavLink>
                </a>
              </li>
              <li tabIndex={0}>
                <a>
                  Product
                  <svg
                    className='fill-current'
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                  >
                    <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
                  </svg>
                </a>
                <ul className='p-2 bg-base-100'>
                  <li>
                    <NavLink to={'/demo'}>Demo</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/documentation'}>Docs</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to={'/about'}>Developers</NavLink>
              </li>
            </ul>
          </div>
        </div>

        <App />
      </BrowserRouter>
    </React.StrictMode>
  </div>
);
