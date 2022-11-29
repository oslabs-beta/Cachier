import React from 'react'
import cachierlogo from '../styles/cachierlogo.png'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
      <div className='navbar bg-neutral text-neutral-content sticky top-0 NavBarContainer'>
        <div className='flex-1'>
        <img className='pl-6 h-20 w-18' src={cachierlogo}></img>
        </div>
        <div className='flex-none'>
        <ul className='menu menu-horizontal p-0'>
            <li>
            <NavLink to={'/'}>Home</NavLink>
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
    );
  };
  
  export default NavBar;