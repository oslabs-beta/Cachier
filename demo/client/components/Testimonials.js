import React from 'react';
import stephenPic from '../styles/stephen.png'
import huaPic from '../styles/hua.png'

const Testimonials = () => {

    return (
        <div className="container my-24 px-6 mx-auto max-w-6xl" style={{ marginTop: '1rem'}}>

            <section className="mb-32 text-center max-w-6xl">

                <h2 className="text-3xl font-bold mb-12 pb-4 text-center ">Testimonials</h2>

                <div className="grid md:grid-cols-3 gap-6 xl:gap-x-12">
                <div className="mb-6 lg:mb-0">
                    <div className="relative block bg-white rounded-lg shadow-lg">
                    <div className="flex">
                        <div
                        className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4 w-full"
                        data-mdb-ripple="true" data-mdb-ripple-color="light">
                        <img src={huaPic} className="w-full" />
                        <a href="#!">
                            <div
                            className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                            style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
                        </a>
                        </div>
                    </div>
                    <div className="p-6">
                        <h5 className="text-lg font-bold mb-2">Hua Liu</h5>
                        <h6 className="font-medium text-gray-600 mb-4">Software Engineer at <span className='text-red-600'>okNEXT</span></h6>
                        <p>"Extremely intuitive and convenient developer caching tool designed by a great team of engineers. Well tested and works great!"</p>
                    </div>
                    </div>
                </div>

                <div className="mb-6 lg:mb-0">
                    <div className="relative block bg-white rounded-lg shadow-lg">
                    <div className="flex">
                        <div
                        className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4 w-full"
                        data-mdb-ripple="true" data-mdb-ripple-color="light">
                        <img src={stephenPic} className="w-full" />
                        <a href="#!">
                            <div
                            className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                            style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
                        </a>
                        </div>
                    </div>
                    <div className="p-6">
                        <h5 className="text-lg font-bold mb-2">Stephen Fitzsimmons</h5>
                        <h6 className="font-medium text-gray-600 mb-4">Software Engineer at <span className='text-red-600'>QuiL</span></h6>
                        <p>"I'm impressed by the speed and the conciseness of the backend code. Great use of resources to accomplish a vital solution in the GraphQL technical environment."</p>
                    </div>
                    </div>
                </div>

                <div className="mb-0">
                    <div className="relative block bg-white rounded-lg shadow-lg">
                    <div className="flex">
                        <div
                        className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4 w-full"
                        data-mdb-ripple="true" data-mdb-ripple-color="light">
                        <img src="https://mdbcdn.b-cdn.net/img/new/avatars/18.jpg" className="w-full" />
                        <a href="#!">
                            <div
                            className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                            style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
                        </a>
                        </div>
                    </div>
                    <div className="p-6">
                        <h5 className="text-lg font-bold mb-2">Andrew Rama</h5>
                        <h6 className="font-medium text-gray-600 mb-4">Software Engineer at <span className='text-red-600'>Docklight</span></h6>
                        <p>"Cachier really is lightweight! Excellent alternative for those looking to cache GraphQL endpoints without having to use Apollo."</p>
                    </div>
                    </div>
                </div>
                </div>

            </section>

        </div>
    )
}

export default Testimonials;