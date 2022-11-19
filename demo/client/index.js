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
        <div className='navbar bg-base-100'>
          <div className='flex-1'>
            <a className='btn btn-ghost normal-case text-xl'>daisyUI</a>
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
                  Parent
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
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
        </div>
        <nav className='NavBar'>
          <div className='logoDiv'>
            <img className='logo' src={logo}></img>
          </div>
          <div className='listDiv'>
            <ul className='list'>
              <li>
                <a>
                  <NavLink to={'/'}>Home</NavLink>
                </a>
              </li>
              <li>
                <a>
                  <NavLink to={'/demo'}>Demo</NavLink>
                </a>
              </li>
              <li>
                <a>
                  <NavLink to={'/documentation'}>Docs</NavLink>
                </a>
              </li>
              <li>
                <a>
                  <NavLink to={'/about'}>About</NavLink>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <App />
      </BrowserRouter>
    </React.StrictMode>
  </div>
);
