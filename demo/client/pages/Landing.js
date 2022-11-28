import React, { useState, useEffect } from 'react';
import { ReactDOM } from 'react';
import LandingContent from '../components/LandingContent';
//import Physics from './Physics';
import Testimonials from '../components/Testimonials';
import { useNavigate } from "react-router-dom";
import LandingContent2 from '../components/LandingContent2';
import logo from '../styles/logo.png'


const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='welcomeBox'>
        <img className='w-48' src={logo} ></img>
        <h1 className='welcome'>Welcome to Cachier</h1>
        <div className='py-3 px-3'>
          <p className='productDescription'>
            A lightweight open-source developer tool that leverages the pinpoint
            accuracy of GraphQL’s queries
          </p>
          <p className='productDescription'>
            and implements caching to improve your website’s query efficiency
          </p>
        </div>
        <div className='flex py-3 gap-3'>
          <button onClick={() => navigate('/demo')} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Run Demo</button>
          <button onClick={() => navigate('/documentation')} type="button" className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Documents</button>
        </div> 
      </div>
      <div className='carousel w-full'>
        <div id='slide1' className='carousel-item relative w-full'>
          <div>
            <h1 className='carouselHeadings'>Insanely Fast</h1>
          </div>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide3' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide2' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
        <div id='slide2' className='carousel-item relative w-full'>
          <div>
            <h1 className='carouselHeadings'>Regulated Data Storage</h1>
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
          <div>
            <h1 className='carouselHeadings'>Simple to use</h1>
          </div>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide2' className='btn btn-circle'>
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
