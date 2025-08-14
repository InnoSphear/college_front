import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsWhatsapp } from "react-icons/bs";
import { TbPhoneCalling } from "react-icons/tb";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '/logo.png'
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='py-4 px-4 md:px-6 md:ml-24 flex items-center justify-between'>
      <Link to='/'>
        <img className='w-12 md:w-20' src={logo} alt="Logo" />
      </Link>

      <div className='md:hidden'>
        <button onClick={toggleMenu} className='text-gray-700'>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div className='hidden md:flex space-x-4 items-center'>
        <Link to='/' className='text-lg hover:text-blue-600'>Home</Link>
        <Link to='/medical' className='text-lg hover:text-blue-600'>Medical</Link>
        <Link to='/dental' className='text-lg hover:text-blue-600'>Dental</Link>
        <Link to='/pharma' className='text-lg hover:text-blue-600'>Pharma</Link>
      </div>

      <div className='hidden md:flex items-center py-2 px-12 space-x-4'>
        <Link to='/connect' className='hover:text-green-500'><BsWhatsapp className='w-6 h-6' /></Link>
        <Link to='/connect' className='hover:text-blue-500'><TbPhoneCalling className='w-6 h-6' /></Link>
      </div>

      {isMenuOpen && (
        <div className='md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg z-50 p-4'>
          <div className='flex flex-col space-y-4'>
            <Link to='/' className='text-lg hover:text-blue-600' onClick={toggleMenu}>Home</Link>
            <Link to='/medical' className='text-lg hover:text-blue-600' onClick={toggleMenu}>Medical</Link>
            <Link to='/dental' className='text-lg hover:text-blue-600' onClick={toggleMenu}>Dental</Link>
            <Link to='/pharma' className='text-lg hover:text-blue-600' onClick={toggleMenu}>Pharma</Link>
          </div>
          <div className='flex items-center justify-center space-x-6 mt-4'>
            <Link to='/connect' className='hover:text-green-500' onClick={toggleMenu}>
              <BsWhatsapp className='w-6 h-6' />
            </Link>
            <Link to='/connect' className='hover:text-blue-500' onClick={toggleMenu}>
              <TbPhoneCalling className='w-6 h-6' />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar