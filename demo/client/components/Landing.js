import React, { useState, useEffect } from 'react';
import { ReactDOM } from 'react';
import Physics from './Physics';

const Landing = () => {
  return (
    <div>
      <div className='welcomeBox'>
        <h1 className='welcome'>Welcome to Cachier</h1>
        <p className='productDescription '>
          A lightweight open-source developer tool that leverages the pinpoint
          accuracy of GraphQL’s queries
        </p>
        <p className='productDescription'>
          and implements caching to improve your website’s query efficiency
        </p>
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
    </div>
  );
};

export default Landing;
