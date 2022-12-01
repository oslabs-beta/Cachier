import React, { useState } from 'react';

const Docs = () => {
  let menuArray = [true, false, false];
  const [menu, setMenu] = useState(menuArray);
  const [show, setShow] = useState(true);

  const setMenuValue = (props) => {
    let newArr = [...menu];
    newArr[props] = !newArr[props];
    setMenu(newArr);
  };

  return (
    <div className='flex' style={{ scrollBehavior: 'smooth' }}>
      <div className='h-screen left-0 top-0 sticky'>
        <div
          id='Main'
          className={`${
            show ? 'translate-x-0' : '-translate-x-full'
          } left-0 xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-gray-900 flex-col`}
        >
          <div className='mt-12 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-3 pb-5 '>
            <button className='flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded '>
              <svg
                className='fill-stroke'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <p className='text-base leading-4 font-sans'>Documentation</p>
            </button>
          </div>
          <div className='flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  '>
            <button
              onClick={() => setMenuValue(0)}
              className='focus:outline-none focus:text-indigo-400  text-white flex justify-between items-center w-full py-5 space-x-14  '
            >
              <p className='text-sm leading-5  uppercase'>Table of Contents</p>
              <svg
                id='icon1'
                className={`${
                  menu[0] ? '' : 'rotate-180'
                } transform duration-100`}
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M18 15L12 9L6 15'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <div
              id='menu1'
              className={`${
                menu[0] ? 'flex' : 'hidden'
              } justify-start  flex-col w-full md:w-auto items-start pb-1 `}
            >
              <a href='#intro'>
                <button className='flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
                  <svg
                    className='fill-stroke'
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <p>Introduction</p>
                </button>
              </a>
              <a href='#prereq'>
                <button className='flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
                  <svg
                    className='fill-stroke'
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <p>Prerequisites</p>
                </button>
              </a>
              <a href='#getStarted'>
                <button className='flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52'>
                  <svg
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M14 8.00002C15.1046 8.00002 16 7.10459 16 6.00002C16 4.89545 15.1046 4.00002 14 4.00002C12.8954 4.00002 12 4.89545 12 6.00002C12 7.10459 12.8954 8.00002 14 8.00002Z'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M4 6H12'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M16 6H20'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M4 12H6'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M10 12H20'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M17 20C18.1046 20 19 19.1046 19 18C19 16.8955 18.1046 16 17 16C15.8954 16 15 16.8955 15 18C15 19.1046 15.8954 20 17 20Z'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M4 18H15'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M19 18H20'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <p className='text-base leading-4  '>Get Started</p>
                </button>
              </a>

              <a href='#withRedis'>
                <button className='flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
                  <svg
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M17 10C18.6569 10 20 8.65685 20 7C20 5.34314 18.6569 4 17 4C15.3431 4 14 5.34314 14 7C14 8.65685 15.3431 10 17 10Z'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <p className='text-base leading-4  '>With Redis</p>
                </button>
              </a>

              <a href='#noRedis'>
                <button className='flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
                  <svg
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M17 11H7C5.89543 11 5 11.8955 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8955 18.1046 11 17 11Z'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <p className='text-base leading-4  '>Without Redis</p>
                </button>
              </a>
              <a href='#techstack'>
                <button className='flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
                  <svg
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M8 21H12'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M10 21V3'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M10 4L19 8L10 12'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <p className='text-base leading-4  '>Technology Stack</p>
                </button>
              </a>
            </div>
          </div>
          <div className='flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  '>
            <div className='hidden flex justify-start flex-col items-start pb-5 '>
              <button className='flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
                <svg
                  className='fill-stroke'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <p className='text-base leading-4  '>Messages</p>
              </button>
              <button className='flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
                <svg
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8 19C10.2091 19 12 17.2091 12 15C12 12.7909 10.2091 11 8 11C5.79086 11 4 12.7909 4 15C4 17.2091 5.79086 19 8 19Z'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M10.85 12.15L19 4'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M18 5L20 7'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M15 8L17 10'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <p className='text-base leading-4  '>Security</p>
              </button>
              <button className='flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52'>
                <svg
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M14 8.00002C15.1046 8.00002 16 7.10459 16 6.00002C16 4.89545 15.1046 4.00002 14 4.00002C12.8954 4.00002 12 4.89545 12 6.00002C12 7.10459 12.8954 8.00002 14 8.00002Z'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M4 6H12'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M16 6H20'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M4 12H6'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M10 12H20'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M17 20C18.1046 20 19 19.1046 19 18C19 16.8955 18.1046 16 17 16C15.8954 16 15 16.8955 15 18C15 19.1046 15.8954 20 17 20Z'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M4 18H15'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M19 18H20'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <p className='text-base leading-4  '>Settings</p>
              </button>
              <button className='flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
                <svg
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14'
                    stroke='#9CA3AF'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M17 10C18.6569 10 20 8.65685 20 7C20 5.34314 18.6569 4 17 4C15.3431 4 14 5.34314 14 7C14 8.65685 15.3431 10 17 10Z'
                    stroke='#9CA3AF'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <p className='text-base leading-4  '>Notifications</p>
              </button>
              <button className='flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
                <svg
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M17 11H7C5.89543 11 5 11.8955 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8955 18.1046 11 17 11Z'
                    stroke='#9CA3AF'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z'
                    stroke='#9CA3AF'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11'
                    stroke='#9CA3AF'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <p className='text-base leading-4  '>Passwords</p>
              </button>
              <button className='flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
                <svg
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8 21H12'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M10 21V3'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M10 4L19 8L10 12'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <p className='text-base leading-4  '>Goals</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id='rightContainer'
        style={{ backgroundColor: 'rgb(210, 240, 251)', color: 'black' }}
        className='flex flex-col p-20'
      >
        <div id='intro'>
          <div className='divider text-black before:bg-primary after:bg-primary'>
            <h5 className='font-sans text-5xl leading-tight mb-4 pb-2 font-bold'>
              Cachier
            </h5>
          </div>
          <p className='text-xl text-center my-8'>
            Cachier is a lightweight open-source developer caching tool that
            stores the results of your GraphQL queries in a local, in-memory
            cache. This enables Cachier to respond to the client almost
            immediately for already-cached data without making a single request.
            Cachier packages are extremely customizable and allow developers to
            tailor their cache based on the needs of the application. Cachier
            allows developers the option to use a normalized or direct cache,
            set cache capacity limits, and tailor eviction policies.{' '}
          </p>
        </div>

        <div id='prereq' className='space-y-5'>
          <div className='divider text-black before:bg-primary after:bg-primary pt-12'>
            <h5 className='font-sans text-5xl leading-tight mb-4 pt-8 pb-12 font-bold'>
              Cachier Caching Solutions
            </h5>
          </div>
          <p className='text-xl my-8'>
            Cachier offers three lightweight caching solutions to choose from.
            With Cachier you will be able to customize a unique GraphQL cache to
            fit the needs of you application.
          </p>
          <ul className='text-xl my-8'>
            <li>- Cachier Normalized Server-side Cache</li>
            <li>- Cachier Direct Client-side Cache</li>
            <li>- Cachier Direct Server-side Cache</li>
          </ul>
        </div>

        <div id='getStarted' className='space-y-5'>
          <div className='divider text-black before:bg-primary after:bg-primary pt-12'>
            <h5 className='font-sans text-5xl leading-tight mb-4 pt-8 pb-12 font-bold'>
              Cachier Normalized Server-side Cache
            </h5>
          </div>
          <div>
            <p className='text-xl my-8'>
              Cachiers Normalized Server-side Cache breaks up GraphQL queries
              into individual sub-queries to be stored in the cache. This
              provides maximum cache efficency by organizing data in a way that
              prevents data redundancy and allows for partial retrievals of
              subset data, thus drastically reducing network requests to the
              database.
            </p>
            <h2 className='font-sans text-3xl leading-tight my-8 pt-6 font-bold'>
              Approximated LRU Eviction
            </h2>
            <p className='text-xl my-8'>
              Cachiers Normalized Cache uses a custom Approximated LRU Eviction
              Policy. This is not a true LRU implementation, but it comes very
              close in terms of performance. The reason Cachier does not use a
              true LRU implementation is because it costs more memory. Cachiers
              LRU policy works by creating a sample (the sample size can be
              configured by the developer) of randomly selected keys from the
              cache and evicting the least recently used key from the sample.
            </p>
          </div>
          <h2 className='font-sans text-3xl leading-tight my-8 pt-6 font-bold'>
            How to Install and Import
          </h2>
          <div className='text-xl my-8'>
            If this is your first time using Cachiers Normalized Cache, run the
            following command in your terminal.
          </div>
          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex flex-row justify-between items-center w-1/2 bg-black text-sky-300 rounded-md p-4'
          >
            npm install @cachier/cache-partials
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                onClick={(e) =>
                  navigator.clipboard.writeText(
                    e.target.parentNode.parentNode.innerText.slice(0, -4)
                  )
                }
              >
                Copy
              </button>
            </div>
          </div>

          <div className='text-xl my-8'>
            In your server file, require our middleware to handle GraphQL
            requests using the CommonJS format
          </div>

          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex flex-row justify-between items-center w-1/2 bg-black text-sky-300 rounded-md p-4'
          >
            const Cachier = require('@cachier/cache-partials');
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                onClick={(e) =>
                  navigator.clipboard.writeText(
                    e.target.parentNode.parentNode.innerText.slice(0, -4)
                  )
                }
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <h1 className='font-sans text-3xl leading-tight my-8 pt-6 font-bold'>
              Set up your Cachier middleware function.
            </h1>
            <ul className='text-xl my-8'>
              <li className='my-2'>
                <strong>endpoint</strong> - the endpoint that the client will
                make GraphQL queries to if it wants to utilize the cache.
              </li>
              <li className='my-2'>
                <strong>graphQLEndpoint</strong> - The graphQLEndpoint parameter
                is where you will specify your GraphQL APIs endpoint. This
                allows Cachier to route all queries that are unable to be
                resolved by the Cachier Cache to your GraphQL API.
              </li>
              <li className='my-2'>
                <strong>cacheCapacity</strong> - the cacheCapacity parameter
                allows you to specify a maximum cache length which allows
                cachier to know when to evict from the cache. All inputs for
                Capacity will be multiples of 100. The default parameter for
                Capacity is 100 (1000 keys in the cache).
              </li>
              <li className='my-2'>
                <strong>sampleSize</strong> - the sampleSize parameter allows
                the developer to configure the number of random keys that will
                be considered for eviction. The default sampleSize is 5 which we
                recommend for most applications.
              </li>
              <li className='my-2'>
                <strong>evictionSize</strong> - the sampleSize parameter allows
                the developer to configure the number of evictions what will be
                made when your cache capacity is reached. The default
                evictionSize is 5.
              </li>
            </ul>
          </div>

          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex flex-row justify-between items-center w-1/2 bg-black text-sky-300 rounded-md p-4'
          >
            <div>
              app.use&#40;
              <br></br>
              <span> &nbsp; &nbsp; &nbsp; &nbsp;endpoint,</span>
              <br></br>
              <span>
                {' '}
                &nbsp; &nbsp; &nbsp; &nbsp;Cachier(graphQLEndPoint,
                cacheCapacity, sampleSize, evictionSize);
              </span>
            </div>
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                onClick={(e) =>
                  navigator.clipboard.writeText(
                    e.target.parentNode.parentNode.innerText.slice(0, -4)
                  )
                }
              >
                Copy
              </button>
            </div>
          </div>

          <div className='text-xl my-8'>Example implementation:</div>

          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex flex-row justify-between items-center w-1/2 bg-black text-sky-300 rounded-md p-4'
          >
            <div>
              app.use( '/Cachier', Cachier('https://api.spacex.land/graphql',
              100, 5, 5) );
            </div>
          </div>
        </div>
        <p className='text-xl my-8'>
          To fetch from Cachiers normalized cache you will fetch like you would
          to your GraphQL api except you will need set the option for uniques in
          the request body. The uniques object will need to contain a unique
          identifier for all list items in your query. You will need to include
          the list name as the key and the unique identifier as a the value. The
          unique identifier is any piece of data that is queried that is unique
          to each list item.
        </p>
        <div
          style={{ backgroundColor: '#0a3046' }}
          className='flex justify-between bg-black text-sky-300 rounded-md p-4 w-1/2'
        >
          <div>
            fetch&#40;
            <span>'/graphql', &#123;</span>
            <br></br>
            <span> &nbsp;&nbsp;method: 'POST',</span>
            <br></br>
            &nbsp; &nbsp;headers:&#123;
            <br></br>
            <span>&nbsp; &nbsp; &nbsp;'Content-Type': 'application/json',</span>
            <br></br>
            <span>
              &nbsp; &nbsp; &nbsp;Accept: 'application/json',
              <br></br>
              <span>&nbsp;&#125;,</span>
              <br></br>
              <span>&nbsp; &nbsp; body: JSON.stringify&#40;&#123;</span>
              <br></br>
            </span>
            <span> &nbsp; &nbsp; &nbsp; query: queryGraphQLString,</span>
            <br></br>
            <span>
              {' '}
              &nbsp; &nbsp; &nbsp; uniques: &#123;listKey
              :uniqueIdentifier&#125;,
            </span>
            <br></br>
            <span> &nbsp; &nbsp; &nbsp; &nbsp;&#125;&#41;</span>
            <br></br>
            <span> &nbsp; &nbsp; &#125;&#41;;</span>
          </div>
        </div>
        <p className='text-xl my-8'>
          {' '}
          As you can see in the example below the uniques option includes a key
          of dragons since dragons is a list and a value of name since name is a
          unique identifier for each list item.
        </p>
        <img
          src='../styles/partialExampleFetch.png'
          className='flex justify-between bg-black text-sky-300 rounded-md p-4 w-1/2'
        />
        <div className='text-xl my-8'>
          Check out our demo page to test out Cachiers Normalized Server-side
          Cache!
        </div>

        <div id='withRedis' className='space-y-5'>
          <div className='divider text-black before:bg-primary after:bg-primary pt-12 pb-4'>
            <h5 className='font-sans text-5xl leading-tight mb-4 pt-8 pb-12 font-bold'>
              Cachier Direct Server-side Cache
            </h5>
          </div>
          <p className='text-xl my-8'>
            Cachier Direct Server-side Cache is a direct cache that stores
            unnormalized queries, this allows for extremely fast response times
            from the cache since the cache does not need to go through the
            process of deconstructing and reconstructing queries and data.
            Cachier Direct Server-side Cache also allows you the option to use
            Redis, or our custom custom inMemory cache.
          </p>

          <h2 className='font-sans text-3xl leading-tight my-8 pt-6 font-bold'>
            LRU-SLFR Eviction Policy
          </h2>
          <p className='text-xl my-8'>
            Cachiers Direct Server-side Cache uses a custom LRU-SLFR (Least
            Recently Used Smallest Latency First Replacement) policy. LRU-SLFR
            is very similar to LRU except it takes latency into account as well
            as recency when evicting. Cachiers LRU-SLFR eviction policy utilizes
            a linked hash map to achieve true LRU and allows O(1) deletion,
            lookup, and insertion. Cachier takes latency into account as well as
            recency by creating a group of least recent queries and removes the
            query with the lowest latency first. This allows for much smarter
            evictions compared to traditional LRU. The whole group will be
            evicted first before moving on to the next group. Check out the demo
            page for a visualization of the eviction policy
          </p>

          <h2 className='font-sans text-3xl leading-tight my-8 pt-6 font-bold'>
            If Using Redis
          </h2>

          <p className='text-xl my-8'>
            After you get your Redis server up and running, in your backend
            server file, import Redis like so:
          </p>

          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex flex-row justify-between items-center w-1/2 bg-black text-sky-300 rounded-md p-4'
          >
            const redis = require('redis');
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                onClick={(e) =>
                  navigator.clipboard.writeText(
                    e.target.parentNode.parentNode.innerText.slice(0, -4)
                  )
                }
              >
                Copy
              </button>
            </div>
          </div>

          <p className='text-xl my-8'>
            After importing Redis, you will have to create your Redis client
            which can be done as so:
          </p>

          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex flex-row justify-between items-center w-1/2 bg-black text-sky-300 rounded-md p-4'
          >
            const client = redis.createClient(REDIS_PORT);
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                onClick={(e) =>
                  navigator.clipboard.writeText(
                    e.target.parentNode.parentNode.innerText.slice(0, -4)
                  )
                }
              >
                Copy
              </button>
            </div>
          </div>

          <p className='text-xl my-8'>
            Replace the text REDIS_PORT with your own Redis port (typically
            6379).
          </p>
          <p className='text-xl my-8'>Lastly, connect your client!</p>

          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex flex-row justify-between items-center w-1/2 bg-black text-sky-300 rounded-md p-4'
          >
            client.connect();
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                onClick={(e) =>
                  navigator.clipboard.writeText(
                    e.target.parentNode.parentNode.innerText.slice(0, -4)
                  )
                }
              >
                Copy
              </button>
            </div>
          </div>

          <h2 className='font-sans text-3xl leading-tight my-8 pt-6 font-bold'>
            How to install and import
          </h2>
          <p className='text-xl my-8'>
            If this is your first time using Cachiers Direct Server-side Cache,
            run the following command in your terminal.
          </p>
          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex flex-row justify-between items-center w-1/2 bg-black text-sky-300 rounded-md p-4'
          >
            npm install @cachier/server-side
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                onClick={(e) =>
                  navigator.clipboard.writeText(
                    e.target.parentNode.parentNode.innerText.slice(0, -4)
                  )
                }
              >
                Copy
              </button>
            </div>
          </div>

          <p className='text-xl my-8'>
            In your server file, require our middleware to handle GraphQL
            requests using the CommonJS format
          </p>
          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex flex-row justify-between items-center w-1/2 bg-black text-sky-300 rounded-md p-4'
          >
            const Cachier = require('@cachier/server-side')
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                onClick={(e) =>
                  navigator.clipboard.writeText(
                    e.target.parentNode.parentNode.innerText.slice(0, -4)
                  )
                }
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <h1 className='font-sans text-3xl leading-tight my-8 pt-6 font-bold'>
              Set up your Cachier middleware function.
            </h1>
            <ul className='text-xl my-8'>
              <li>
                <strong>endpoint</strong> - the endpoint that the client will
                make GraphQL queries to if it wants to utilize the cache.
              </li>
              <li>
                <strong>graphQLEndpoint</strong> - The graphQLEndpoint parameter
                is where you will specify your GraphQL APIs endpoint. This
                allows Cachier to route all queries that are unable to be
                resolved by the Cachier Cache to your GraphQL API.
              </li>
              <li>
                <strong>capacity</strong> - the cacheCapacity parameter allows
                you to specify a maximum cache length which allows cachier to
                know when to evict from the cache.
              </li>
              <li>
                <strong>groupSize</strong> - the groupSize parameter allows the
                developer to configure the number of least recently used keys
                that will be considered for eviction. The key with the least
                latency out of the group will be evicted first. The whole group
                will be evicted first before moving on to the next group.
              </li>
              <li>
                <strong>RedisClient</strong> - If you would like to use Redis to
                store your cache, insert your connected redis client as an
                arguement. If you leave out this parameter Cachier will default
                to its native built in cache.
              </li>
            </ul>
          </div>

          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex justify-between bg-black text-sky-300 rounded-md p-4 w-1/2'
          >
            <div>
              app.use&#40;
              <br></br>
              <span> &nbsp; &nbsp; &nbsp; &nbsp;endpoint,</span>
              <br></br>
              <span>
                {' '}
                &nbsp; &nbsp; &nbsp; &nbsp;Cachier(graphqlEndpoint, capacity,
                groupSize, RedisClient(optional));
              </span>
            </div>
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                onClick={(e) =>
                  navigator.clipboard.writeText(
                    e.target.parentNode.parentNode.innerText.slice(0, -4)
                  )
                }
              >
                Copy
              </button>
            </div>
          </div>
          <div className='text-xl my-8'>
            Example implementation without Redis:
          </div>

          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex flex-row justify-between items-center w-1/2 bg-black text-sky-300 rounded-md p-4'
          >
            <div>
              app.use( '/Cachier', Cachier('https://api.spacex.land/graphql',
              100, 5) );
            </div>
          </div>
        </div>

        <div id='withoutRedis' className='space-y-5'>
          <div className='divider text-black before:bg-primary after:bg-primary pt-12 pb-4'>
            <h5 className='font-sans text-5xl leading-tight mb-4 pt-12 pb-8 font-bold'>
              Cachier Direct Client-side Cache
            </h5>
          </div>
          <p className='text-xl my-8'>
            Cachiers Direct Client-Side Cache uses the same underlying
            mechanisms as Cachiers Direct Server-side cache except it stores the
            cache in the client browsers session storage. This allows for even
            faster cached query times than a server side implementation.
            Cachiers client side cache was built to mimic a traditional fetch
            request so it is very easy to integrate into new and existing
            codebases.
          </p>

          <h2 className='font-sans text-3xl leading-tight my-8 pt-6 font-bold'>
            How to install and import
          </h2>

          <p className='text-xl my-8'>
            If this is your first time using Cachiers Direct Client-side Cache,
            run the following command in your terminal.
          </p>
          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex flex-row justify-between items-center w-1/2 bg-black text-sky-300 rounded-md p-4'
          >
            npm install @cachier/client-side
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                onClick={(e) =>
                  navigator.clipboard.writeText(
                    e.target.parentNode.parentNode.innerText.slice(0, -4)
                  )
                }
              >
                Copy
              </button>
            </div>
          </div>

          <p className='text-xl my-8'>
            In your client file, import the cachier client side function:
          </p>
          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex flex-row justify-between items-center w-1/2 bg-black text-sky-300 rounded-md p-4'
          >
            import clientSideCache from '@cachier/client-side';
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                onClick={(e) =>
                  navigator.clipboard.writeText(
                    e.target.parentNode.parentNode.innerText.slice(0, -4)
                  )
                }
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <h1 className='font-sans text-3xl leading-tight my-8 pt-6 font-bold'>
              Initalize your Cachier Client-side cache.
            </h1>
            <ul className='text-xl my-8'>
              <li>
                <strong>capacity</strong> - the cacheCapacity parameter allows
                you to specify a maximum cache length which allows cachier to
                know when to evict from the cache.
              </li>
              <li>
                <strong>groupSize</strong> - the groupSize parameter allows the
                developer to configure the number of least recently used keys
                that will be considered for eviction. The key with the least
                latency out of the group will be evicted first. The whole group
                will be evicted first before moving on to the next group.
              </li>
            </ul>
          </div>

          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex justify-between bg-black text-sky-300 rounded-md p-4 w-1/2'
          >
            <div>const cachierFetch = clientSideCache(500, 5);</div>
          </div>
          <p className='text-xl my-8'>Operates exactly like fetch():</p>
          <div
            style={{ backgroundColor: '#0a3046' }}
            className='flex justify-between bg-black text-sky-300 rounded-md p-4 w-1/2'
          >
            <div>
              cachierFetch&#40;
              <span>'/graphql', &#123;</span>
              <br></br>
              <span> &nbsp;&nbsp;method: 'POST',</span>
              <br></br>
              &nbsp; &nbsp;headers:&#123;
              <br></br>
              <span>
                &nbsp; &nbsp; &nbsp;'Content-Type': 'application/json',
              </span>
              <br></br>
              <span>
                &nbsp; &nbsp; &nbsp;Accept: 'application/json',
                <br></br>
                <span>&nbsp;&#125;,</span>
                <br></br>
                <span>&nbsp; &nbsp; body: JSON.stringify&#40;&#123;</span>
                <br></br>
              </span>
              <span> &nbsp; &nbsp; &nbsp; query: queryGraphQLString,</span>
              <br></br>
              <span> &nbsp; &nbsp; &nbsp; &nbsp;&#125;&#41;</span>
              <br></br>
              <span> &nbsp; &nbsp; &#125;&#41;;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
