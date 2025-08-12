import React from 'react'
import {Link} from 'react-router-dom'
const PharmaBanner = () => {
  return (
    <div className='relative py-8 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#E6E8EC] w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between rounded-xl md:rounded-3xl gap-6 md:gap-8 my-6 overflow-hidden'>
      <div className='w-full md:w-1/2 lg:w-[55%] text-center md:text-left space-y-4 z-10'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight'>
          Top Pharma Colleges <span className='whitespace-nowrap'>in India</span>
        </h1>
        <p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-md mx-auto md:mx-0'>
          Discover premier Dental education institutions with world-class facilities
        </p>

        <div className='space-x-2'>
        <Link to='/pharmatoptengov'>
        <button className='border py-1 px-2 rounded-xl hover:bg-blue-500 cursor-pointer bg-[rgb(200,215,230)]'>Top 10 Govt College</button>
        </Link>
        <Link to='/pharmatoptenpvt'>
        <button className='border py-1 px-2 rounded-xl hover:bg-blue-500 cursor-pointer bg-[rgb(200,215,230)]'>Top 10 Pvt College</button>
        </Link>
        </div>
      
      </div>

      <div className='w-full md:w-1/2 lg:w-[45%] h-full flex items-center justify-center md:justify-end'>
        <img 
          src="https://medical.collegesuggest.com/_next/image?url=%2Fassets%2Fimages%2Fbanner_img.webp&w=828&q=75" 
          alt="Medical colleges illustration"
          className='w-full max-w-lg h-auto object-cover md:object-contain max-h-[280px] md:max-h-[320px] lg:max-h-[360px]'
          loading='lazy'
        />
      </div>

      <div className='absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-100 opacity-30'>
       
      </div>
    </div>
  )
}

export default PharmaBanner
