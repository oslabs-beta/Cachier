import React, { useState, useEffect } from 'react';
import { ReactDOM } from 'react';


const Docs = () => {
  let menuArray = [true, false, false];
    const [menu, setMenu] = useState(menuArray);
    const [show, setShow] = useState(true);

    const setMenuValue = (props) => {
        let newArr = [...menu];
        newArr[props] = !newArr[props];
        setMenu(newArr);
  }

  return (
    <div className='flex' style={{scrollBehavior : 'smooth'}}>
      <div className='h-screen left-0 top-0 sticky'>
        <div className="rounded-r bg-gray-900 xl:hidden flex justify-between w-full p-6 items-center ">
            <div className="flex justify-between items-center space-x-3">
                <svg width={34} height={34} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z" fill="white" />
                </svg>
                <p className="text-2xl leading-6 text-white">OvonRueden</p>
            </div>
            <div aria-label="toggler" className="flex justify-center items-center">
                <button aria-label="open" id="open" onClick={()=>setShow(true)} className={`${show ? 'hidden' : ''} focus:outline-none focus:ring-2`}>
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 12H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 18H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button aria-label="close" id="close" onClick={()=>setShow(false)} className={`${show ? '' : 'hidden'} focus:outline-none focus:ring-2`}>
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 6L18 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
        <div id="Main" className={`${show ? 'translate-x-0' : '-translate-x-full'} left-0 xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-gray-900 flex-col`}>
            <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-3 pb-5 ">
                <button className="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded ">
                    <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-base leading-4 ">Documentation</p>
                </button>
            </div>
            <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
                <button onClick={()=>setMenuValue(0)} className="focus:outline-none focus:text-indigo-400  text-white flex justify-between items-center w-full py-5 space-x-14  ">
                    <p className="text-sm leading-5  uppercase">Table of Contents</p>
                    <svg id="icon1" className={`${menu[0] ? '' : 'rotate-180'} transform duration-100`} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div id="menu1" className={`${menu[0] ? 'flex' : 'hidden'} justify-start  flex-col w-full md:w-auto items-start pb-1 `}>
                    <a href='#intro'>
                      <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                          <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p>Introduction</p>                        
                      </button>
                    </a>
                    <a href='#prereq'>
                      <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                          <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p>Prerequistes</p>                        
                      </button>
                    </a>
                    <a href='#getStarted'>
                      <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">
                          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 8.00002C15.1046 8.00002 16 7.10459 16 6.00002C16 4.89545 15.1046 4.00002 14 4.00002C12.8954 4.00002 12 4.89545 12 6.00002C12 7.10459 12.8954 8.00002 14 8.00002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4 6H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M16 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8955 18.1046 16 17 16C15.8954 16 15 16.8955 15 18C15 19.1046 15.8954 20 17 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M19 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p className="text-base leading-4  ">Get Started</p>
                      </button>
                    </a>

                    <a href='#withRedis' >
                      <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M17 10C18.6569 10 20 8.65685 20 7C20 5.34314 18.6569 4 17 4C15.3431 4 14 5.34314 14 7C14 8.65685 15.3431 10 17 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p className="text-base leading-4  ">With Redis</p>
                      </button>
                    </a>
                    
                    <a href='#noRedis'>
                      <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 11H7C5.89543 11 5 11.8955 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8955 18.1046 11 17 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p className="text-base leading-4  ">Without Redis</p>
                      </button>
                    </a>
                    <a href='#techstack'>
                      <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 21H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M10 21V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M10 4L19 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p className="text-base leading-4  ">Technology Stack</p>
                      </button>
                    </a>
                    
                </div>
            </div>
            <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
                <div className="hidden flex justify-start flex-col items-start pb-5 ">
                    <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                        <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-base leading-4  ">Messages</p>
                    </button>
                    <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 19C10.2091 19 12 17.2091 12 15C12 12.7909 10.2091 11 8 11C5.79086 11 4 12.7909 4 15C4 17.2091 5.79086 19 8 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.85 12.15L19 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18 5L20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 8L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-base leading-4  ">Security</p>
                    </button>
                    <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 8.00002C15.1046 8.00002 16 7.10459 16 6.00002C16 4.89545 15.1046 4.00002 14 4.00002C12.8954 4.00002 12 4.89545 12 6.00002C12 7.10459 12.8954 8.00002 14 8.00002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 6H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8955 18.1046 16 17 16C15.8954 16 15 16.8955 15 18C15 19.1046 15.8954 20 17 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-base leading-4  ">Settings</p>
                    </button>
                    <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 10C18.6569 10 20 8.65685 20 7C20 5.34314 18.6569 4 17 4C15.3431 4 14 5.34314 14 7C14 8.65685 15.3431 10 17 10Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-base leading-4  ">Notifications</p>
                    </button>
                    <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 11H7C5.89543 11 5 11.8955 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8955 18.1046 11 17 11Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-base leading-4  ">Passwords</p>
                    </button>
                    <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 21H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 21V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 4L19 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-base leading-4  ">Goals</p>
                    </button>
                </div>
            </div>
            
        </div>

    </div>

    <div id='rightContainer' style={{backgroundColor: 'rgb(210, 240, 251)', color: 'black'}} className='flex flex-col p-20'>
      <div id='intro'>
        <div className="divider text-black before:bg-primary after:bg-primary">
          <h5 className='text-5xl leading-tight mb-4 pb-2'>Cachier</h5>
        </div>
        <p>Cachier is a lightweight open-source developer tool that leverages the pinpoint accuracy of GraphQL’s queries and implements caching to improve your application's query efficiency.</p>
      </div>

      <div id='prereq' className='space-y-5'>
        <div className="divider text-black before:bg-primary after:bg-primary pt-12">
          <h5 className='text-5xl leading-tight mb-4 pb-2'>Prerequistes</h5>
        </div>
        <p>Cachier is a lightweight open-source developer tool that leverages the pinpoint accuracy of GraphQL’s queries and implements caching to improve your application's query efficiency.</p>
        <ol>
          <li>GraphQL schemas setup with your database.</li>
          <li>Redis installed if you are using Redis as your cache.</li>
          <li>Fullstack Application where frontend makes query request to backend.</li>
        </ol>
      </div>

      <div id='getStarted' className='space-y-5'>
        <div className="divider text-black before:bg-primary after:bg-primary pt-12">
          <h5 className='text-5xl leading-tight mb-4 pb-2'>How to Get Started</h5>
        </div>
        <p>If this is your first time using Cachier, run the following command in your terminal.</p>

        <div style={{backgroundColor: '#0a3046'}} className='bg-black text-sky-300 rounded-md p-4'> npm install cachier </div>

        <div>In your server file, you want to require our middleware to handle GraphQL requests using the CommonJS format</div>
        
        <div style={{backgroundColor: '#0a3046'}} className='bg-black text-sky-300 rounded-md p-4'> const cachier = require('cachier'); </div>

        <div>Cachier functionality depends on Express' built-in method express.json() middleware function in order to parse incoming JSON payloads.</div>
        <div>If you haven't already set up your server file with Express, add the following code to require Express:</div>
        <div style={{backgroundColor: '#0a3046'}} className='bg-black text-sky-300 rounded-md p-4'> const express = require('express');</div>
        <div>Add the following code to construct an Express application based on a GraphQL schema:</div>
        <div style={{backgroundColor: '#0a3046'}} className='bg-black text-sky-300 rounded-md p-4'> const expressGraphQL = require('express-graphql').graphqlHTTP;</div>
        <div>Add the following code to use the express.json() middleware function:</div>
        <div style={{backgroundColor: '#0a3046'}} className='bg-black text-sky-300 rounded-md p-4'> app.use(express.json());</div>

      </div>

      <div id='withRedis' className='space-y-5'>
        <div className="divider text-black before:bg-primary after:bg-primary pt-12 pb-4">
          <h5 className='text-5xl leading-tight mb-4 pb-2'>Using Cachier with Redis</h5>
        </div>
        <p>Cachier lets you decide if you would like to use Redis, or our custom LRU eviction cache. If you are using Redis, make sure you have Redis installed and your Redis server is running. To run Redis, type the following command in your terminal:</p>
        
        <div style={{backgroundColor: '#0a3046'}} className='bg-black text-sky-300 rounded-md p-4'> app.use(express.json());</div>
        <p>Once your Redis server is up and running, type PING into the terminal where your Redis server is running and you should receive a PONG response. If you get this response, you are ready to use Cachier with Redis!</p>
        <p>Now that your Redis server is up and running, in your backend server file, import Redis like so:</p>
        <div style={{backgroundColor: '#0a3046'}} className='bg-black text-sky-300 rounded-md p-4'> const redis = require('redis');</div>
        <p>After importing Redis, you will have to create your Redis client which can be done as so:</p>
        <div style={{backgroundColor: '#0a3046'}} className='bg-black text-sky-300 rounded-md p-4'> const client = redis.createClient(REDIS_PORT);</div>
        <p>Replace the text REDIS_PORT with your own Redis port (typically 6379).</p>
        <p>Lastly, connect your client!</p>
        <div style={{backgroundColor: '#0a3046'}} className='bg-black text-sky-300 rounded-md p-4'> client.connect();</div>
        <p>In order to cache your graphQL query responses, all you have to do is call our Cachier function as middleware in your /graphql endpoint. The parameters for our function are as follows:</p>
        <div style={{backgroundColor: '#0a3046'}} className='bg-black text-sky-300 rounded-md p-4'> 
        app.use&#40;
          <br></br>
          <span> &nbsp; &nbsp; &nbsp; &nbsp;'/graphql',</span>
          <br></br>
          <span> &nbsp; &nbsp; &nbsp; &nbsp;cachier(&#123; redis &#125; = &#123;&#60;redis: client&#62;&#125;, capacity, endpoint),</span>
          <br></br>
          <span> &nbsp; &nbsp; &nbsp; &nbsp;expressGraphQL&#40;&#123;,</span>
          <br></br>
          <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;schema: schema,</span>
          <br></br>
          <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;graphiql: true,</span>
          <br></br>
          <span> &nbsp; &nbsp; &nbsp; &nbsp;&#125;&#41;</span>
          <br></br>
          <span> &nbsp; &nbsp; &#41;;</span>
        </div>
        <p>The first parameter is to let the function know whether you are using Redis or not as your cache. If you are, you will have to pass Redis into the function as &#123;redis: client&#125; like so.</p>
        <p>The second parameter is the capacity for our custom LRU cache. If you are using Redis as your cache, just default to leaving the cache at 50.</p>
        <p>The third parameter is the endpoint at which you are actually using GraphQL. For example, this endpoint may be http://localhost:3000/graphql.</p>
        <p>Our last parameter is the Time to Live, or how long you want this specific query to last in your cache for. Pass in your time to live as seconds. Now you are good to cache your GraphQL responses!</p>
      </div>

      <div id='withoutRedis' className='space-y-5'>
        <div className="divider text-black before:bg-primary after:bg-primary pt-12 pb-4">
          <h5 className='text-5xl leading-tight mb-4 pb-2'>Using Cachier without Redis</h5>
        </div>
        <p>If you are not using Redis caching, Cachier provides a middleware for caching using the server's memory with our custom cache that behaves with an LRU eviction policy. The arguments you should input for this middlware are as follows:</p>
        <p>For the first parameter, since you are not using Redis, simply pass in an empty object &#123;&#125; like so.</p>
        <p>Next, is the capacity you would like your cache to hold. This capacity refers to when our cache will begin evicting items. For example, if you set the capacity to 50, it will evict an item upon the 51st unique query. It should be noted that if you pass in a non-whole number, it will be rounded down for you. Non integers, negative numbers, and capacities below two will default to simply creating a GraphQL fetch without storing values in the cache.</p>
        <p>The third parameter is the endpoint at which you are actually using GraphQL. For example, this endpoint may be http://localhost:3000/graphql.</p>
        <p>Our last parameter is the Time to Live, or how long you want this specific query to last in your cache for. Since we aren't using Redis here, just pass in anything for your TTL as our cache is not reliant on this information. Now you are good to cache your GraphQL responses!</p>

        <div style={{backgroundColor: '#0a3046'}} className='bg-black text-sky-300 rounded-md p-4'> 
        app.use&#40;
          <br></br>
          <span> &nbsp; &nbsp; &nbsp; &nbsp;'/graphql',</span>
          <br></br>
          <span> &nbsp; &nbsp; &nbsp; &nbsp;cachier(&#123;&#125; = &#123;&#60;redis: client&#62;&#125;, capacity, endpoint),</span>
          <br></br>
          <span> &nbsp; &nbsp; &nbsp; &nbsp;expressGraphQL&#40;&#123;,</span>
          <br></br>
          <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;schema: schema,</span>
          <br></br>
          <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;graphiql: true,</span>
          <br></br>
          <span> &nbsp; &nbsp; &nbsp; &nbsp;&#125;&#41;</span>
          <br></br>
          <span> &nbsp; &nbsp; &#41;;</span>
        </div>
      </div>

      <div id='techstack'>
        <div className="divider text-black before:bg-primary after:bg-primary pt-12">
          <h5 className='text-5xl leading-tight mb-4 pb-2'>Technology Stack</h5>
        </div>
        <ul>
          <li>GraphQL</li>
          <li>Redis</li>
          <li>Typescript</li>
          <li>Node/Express</li>
          <li>React</li>
          <li>Chart.js</li>
          <li>Tailwind CSS</li>
          <li>DaisyUI</li>
          <li>Jest/Supertest</li>
          <li>Webpack</li>
        </ul>
      </div>

      {/* <div id='noRedis'>
        <div className="divider text-black before:bg-primary after:bg-primary">
          <h5 className='text-5xl leading-tight mb-4 pb-2'>Using Cachier with Redis</h5>
        </div>
        <p>Using Cachier with Redis</p>
        <h1>Install our package</h1>
        <div className="mockup-code">
          <pre data-prefix="$"><code>npm i @cachier/server-side</code></pre>
          <pre data-prefix="$"><code>npm i @cachier/client-side</code></pre>
          <pre data-prefix=">" className="text-success"><code>Done!</code></pre>
        </div>
      </div> */}


    </div>
    
  </div>
    // <div>

      
    //   <h1>Install our package</h1>
    //   <div className="mockup-code">
    //     <pre data-prefix="$"><code>npm i @cachier/server-side</code></pre>
    //     <pre data-prefix="$"><code>npm i @cachier/client-side</code></pre>
    //     <pre data-prefix=">" className="text-success"><code>Done!</code></pre>
    //   </div>

    //   <h1>Read our documentation below</h1>

    //   <div className="card w-96 bg-base-100 shadow-xl image-full">
    //     <figure><img src="https://placeimg.com/400/225/arch" alt="Architecture" /></figure>
    //     <div className="card-body">
    //       <h2 className="card-title">What is caching?</h2>
    //       <p>An important concept in computer science and web development</p>
    //       <div className="card-actions justify-end">
    //         <button className="btn btn-primary">Read about it here</button>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="card w-96 bg-base-100 shadow-xl image-full">
    //     <figure><img src="https://placeimg.com/400/225/tech" alt="Tech" /></figure>
    //     <div className="card-body">
    //       <h2 className="card-title">What is GraphQL?</h2>
    //       <p>A database query language for more efficient and exact queries</p>
    //       <div className="card-actions justify-end">
    //         <button className="btn btn-primary">Read here</button>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="card w-96 bg-base-100 shadow-xl image-full">
    //     <figure><img src="https://placeimg.com/400/225/tech" alt="Tech" /></figure>
    //     <div className="card-body">
    //       <h2 className="card-title">Why use our caching tool?</h2>
    //       <p>Get an understanding of what tooling Cachier provides.</p>
    //       <div className="card-actions justify-end">
    //         <button className="btn btn-primary">Read here</button>
    //       </div>
    //     </div>
    //   </div>


    // </div>
  );
}

export default Docs;

