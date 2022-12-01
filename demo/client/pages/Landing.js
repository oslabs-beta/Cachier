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

      <div className='carousel w-full'>
        <div id='slide1' className='carousel-item relative w-full'>
          <div className='imageContainer'>
            <img
              src={FastIcon}
              alt='fast icon'
              className='w-full'
              style={{ width: '175px', height: '175px' }}
            />
            <p>Have a blazing fast app by mitigating unnecessary API calls</p>
          </div>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide4' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide2' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
        <div id='slide2' className='carousel-item relative w-full'>
          <div className='imageContainer'>
            <img
              src={memoryIcon}
              alt='memory icon'
              className='w-full'
              style={{ width: '175px', height: '175px' }}
            />
            <p>Unlock advanced memory efficiency</p>
          </div>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide1' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide3' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
        <div id='slide3' className='carousel-item relative w-full'>
          <div className='imageContainer'>
            <img
              src={customizableIcon}
              alt='customizable icon'
              className='w-full'
              style={{ width: '175px', height: '175px' }}
            />
            <p>Customizable and developer friendly</p>
          </div>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide2' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide4' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
        <div id='slide4' className='carousel-item relative w-full'>
          <div className='imageContainer'>
            <img
              src={demoIcon}
              alt='demo icon'
              className='w-full'
              style={{ width: '175px', height: '175px' }}
            />
            <p>Test out our efficacy with the Demo</p>
          </div>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide3' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide1' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
      </div>

      <LandingContent2 />
      <LandingContent />
      <Testimonials />
    </div>
  );
};

export default Landing;
