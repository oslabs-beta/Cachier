import React from 'react';
import LandingContent from '../components/LandingContent';
import Testimonials from '../components/Testimonials';
import { useNavigate } from 'react-router-dom';
import LandingContent2 from '../components/LandingContent2';
import logo from '../styles/logo.png';
import installIcon from '../styles/installIcon.png';
import FastIcon from '../styles/FastIcon.png';
import customizableIcon from '../styles/customizableIcon.png';
import memoryIcon from '../styles/memoryIcon.png';
import demoIcon from '../styles/Demo.png';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='welcomeBox'>
        <img className='w-48' src={logo}></img>
        <h1 className='welcome'>Welcome to Cachier</h1>
        <div className='py-3 px-3'>
          <p className='productDescription'>
            A highly customizable, lightweight, open-source GraphQL caching tool
          </p>
          <p className='productDescription'>
            that intelligently manages and delivers data at lightning speeds.
          </p>
        </div>
        <div className='flex py-3 gap-3'>
          <button
            onClick={() => navigate('/demo')}
            type='button'
            className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          >
            Run Demo
          </button>
          <button
            onClick={() => navigate('/documentation')}
            type='button'
            className='inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out'
          >
            Documents
          </button>
        </div>
      </div>

      <LandingContent2 />
      <LandingContent />
      <Testimonials />
    </div>
  );
};

export default Landing;
