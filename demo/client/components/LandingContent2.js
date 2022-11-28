import React from 'react'
import graphqlGIF from '../styles/graphqlgif.gif'
import graphqlLogo from '../styles/graphqlLogo.png'
import { useNavigate } from "react-router-dom";


const LandingContent2 = () => {
  const navigate = useNavigate();

  return (
    
    <div className="container px-6 mx-auto">
        <section className="mb-32 text-gray-800">
            <div className="container mx-auto xl:px-32 text-center lg:text-left">
            <div className="grid lg:grid-cols-2 flex items-center">
                <div className="mb-12 lg:mb-0 pr-12">
                <div className="block rounded-lg shadow-lg px-6 py-12 md:px-12"
                    style={{backgroundColor: 'white'}}>
                    <div className="divider text-black before:bg-primary after:bg-primary">
                        <h2 className='text-3xl font-bold mb-6'>GraphQL</h2>
                    </div>
                    
                    <p className="text-gray-500 mb-6 pb-4 lg:pb-0">
                    GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. With GraphQL, you can specify what data you want to request from your API. You will get back exactly what you need, nothing more and nothing less. GraphQL queries always return predictable results.
                    </p>
                    <div className='m-auto flex justify-center'>
                        <a href='https://graphql.org/'><button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Learn GraphQL</button></a>
                    </div>
                    <div className="divider text-black before:bg-primary after:bg-primary pt-6">
                        <h2 className='text-3xl font-bold mb-6'>Caching</h2>
                    </div>
                    <p className="text-gray-500 mb-0">
                    The RESTful APIs use the URL as the global unique identifier which can be leveraged to build a cache.
                    Unlike GraphQL, the POST HTTP method is used to perform queries and there are no URL-like endpoints making caching GraphQL queries difficult.
                    <br></br>
                    <br></br>
                    Cachier stores queries and the response in in-memory cache, with this future queries will cause Cachier to check for the request in the in-memory cache and return the result without performing the network request. 
                    </p>

                    <div className="flex flex-col md:flex-row md:justify-around lg:justify-between mb-6 mx-auto pt-6">
                        <p className="flex items-center text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 mr-2">
                            <path fill="currentColor"
                                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                            </path>
                            </svg>
                            Blazing Fast Performance
                        </p>

                        <p className="flex items-center text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 mr-2">
                            <path fill="currentColor"
                                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                            </path>
                            </svg>
                            Server & Client Side Options
                        </p>

                        <p className="flex items-center text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 mr-2">
                            <path fill="currentColor"
                                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                            </path>
                            </svg>
                            Customized Latency-Based Eviction Policy
                        </p>

                    </div>
                    <div className='flex justify-center'>
                        <button onClick={() => navigate('/demo')} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Run Demo</button>
                    </div>
                </div>
                </div>

                <div>
                <img className='w-1/2 m-auto pb-6' src={graphqlLogo}></img>
                <img src={graphqlGIF} class="w-full rounded-lg shadow-lg" />
                </div>
            </div>
            </div>
        </section>
    </div>
  )
}

export default LandingContent2;