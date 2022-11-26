import React from 'react'
import { useNavigate } from "react-router-dom";


const LandingContent = () => {

  return (
    <div className="pb-16" style={{ fontFamily: '"Lato", sans-serif' }}>
      <dh-component>
        <section style={{backgroundColor: 'rgb(210, 240, 251)', borderRadius: 20}}className="max-w-6xl mx-auto container bg-white pt-16">
          <div>
            <div role="contentinfo" className="flex items-center flex-col px-4">
              <p tabIndex={0} className="focus:outline-none uppercase text-sm text-center text-gray-600 leading-4">in few easy steps</p>
              <hh1 tabIndex={0} className="focus:outline-none text-4xl lg:text-4xl font-extrabold text-center leading-10 text-gray-800 lg:w-5/12 md:w-9/12 pt-4">Lightweight GraphQL Caching Tool</hh1>
            </div>
            <div tabIndex={0} aria-label="group of cards" className="focus:outline-none mt-20 flex flex-wrap justify-center gap-10 px-4">
              <div tabIndex={0} aria-label="card 1" className="focus:outline-none flex sm:w-full md:w-5/12 pb-20">
                <div className="w-20 h-20 relative mr-5">
                  <div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
                  <div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG1.svg" alt="drawer" />
                  </div>
                </div>
                <div className="w-10/12">
                  <h2 tabIndex={0} className="focus:outline-none text-lg font-bold leading-tight text-gray-800">Ready to use NPM package</h2>
                  <p tabIndex={0} className="focus:outline-none text-base text-gray-600 leading-normal pt-2">Cachier is very easy to install and use. Follow our simple directions to save yourself tons of lines from coding and start caching your queries!</p>
                </div>
              </div>
              <div tabIndex={0} aria-label="card 2" className="focus:outline-none flex sm:w-full md:w-5/12 pb-20">
                <div className="w-20 h-20 relative mr-5">
                  <div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
                  <div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG2.svg" alt="check" />
                  </div>
                </div>
                <div className="w-10/12">
                  <h2 tabIndex={0} className="focus:outline-none text-lg font-semibold leading-tight text-gray-800">Top-grade Efficiency</h2>
                  <p tabIndex={0} className="focus:outline-none text-base text-gray-600 leading-normal pt-2"> Our caching methods delivers your queries in constant time - O(1). Our latency-based customized eviction policy prevents expensive query calls.</p>
                </div>
              </div>
              <div tabIndex={0} aria-label="card 3" className="focus:outline-none flex sm:w-full md:w-5/12 pb-20">
                <div className="w-20 h-20 relative mr-5">
                  <div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
                  <div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG3.svg" alt="html tag" />
                  </div>
                </div>
                <div className="w-10/12">
                  <h2 tabIndex={0} className="focus:outline-none text-lg font-semibold leading-tight text-gray-800">Designed by Developers for Developers</h2>
                  <p tabIndex={0} className="focus:outline-none text-base text-gray-600 leading-normal pt-2">Built by a team of engineers that understand the drawbacks of the GraphQL technical environment.</p>
                </div>
              </div>
              <div tabIndex={0} aria-label="card 4" className="focus:outline-none flex sm:w-full md:w-5/12 pb-20">
                <div className="w-20 h-20 relative mr-5">
                  <div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
                  <div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG4.svg" alt="monitor" />
                  </div>
                </div>
                <div className="w-10/12">
                  <h2 tabIndex={0} className="focus:outline-none text-lg font-semibold leading-tight text-gray-800">Built with Modern Technology Stacks</h2>
                  <p tabIndex={0} className="focus:outline-none text-base text-gray-600 leading-normal pt-2">Cache your queries with Redis, an in-memory data structure store, to maximize your application performance!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </dh-component>
    </div>

  )
}

export default LandingContent;