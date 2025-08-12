import React from 'react'
import { Link } from 'react-router-dom'
import { FaHandHoldingMedical } from "react-icons/fa";
import { TbDental } from "react-icons/tb";
import { MdOutlineLocalPharmacy } from "react-icons/md";
import { MdOutlineAgriculture } from "react-icons/md";

const ExploreByStream = () => {
  return (
    <div className='w-full px-4 sm:px-8 md:px-16 lg:px-28 py-8 md:py-12'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl text-[rgb(32,33,36)] font-bold text-center md:text-left'>
        Explore By Stream
      </h1>
      
      {/* Card Links */}
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 md:mt-8'>
        <Link to='/medical' className='group'>
          <div className='h-20 w-full p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between bg-white group-hover:bg-blue-50'>
            <FaHandHoldingMedical className='text-2xl text-blue-600' />
            <div>
                <h1 className='text-lg font-medium'>Medical</h1>
                <p>colleges</p>
            </div>
          </div>
        </Link>

        <Link to='/dental' className='group'>
          <div className='h-20 w-full p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between bg-white group-hover:bg-blue-50'>
            <TbDental className='text-2xl text-green-600' />
            <div>
                <h1 className='text-lg font-medium'>Dental</h1>
                <p>colleges</p>
            </div>
          </div>
        </Link>

        <Link to='/pharma' className='group'>
          <div className='h-20 w-full p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between bg-white group-hover:bg-blue-50'>
            <MdOutlineLocalPharmacy className='text-2xl text-purple-600' />
             <div>
                <h1 className='text-lg font-medium'>Pharma</h1>
                <p>colleges</p>
            </div>
          </div>
        </Link>

        <Link to='/agriculture' className='group'>
          <div className='h-20 w-full p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between bg-white group-hover:bg-blue-50'>
            <MdOutlineAgriculture className='text-2xl text-orange-600' />
             <div>
                <h1 className='text-lg font-medium'>Agriculture</h1>
                <p>colleges</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ExploreByStream