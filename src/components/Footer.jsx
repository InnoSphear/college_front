import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0d1b2a] text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* MEDICAL */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">MEDICAL</h3>
          <ul className="space-y-2">
            <li><Link to="/medical/govt-colleges" className="hover:text-blue-400 transition">Top 10 Government Colleges In India</Link></li>
            <li><Link to="/medical/private-colleges" className="hover:text-blue-400 transition">Top 10 Private Colleges In India</Link></li>
            <li><Link to="/medical" className="hover:text-blue-400 transition">Medical Colleges In India</Link></li>
          </ul>
        </div>

        {/* DENTAL */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">DENTAL</h3>
          <ul className="space-y-2">
            <li><Link to="/dental/govt-colleges" className="hover:text-blue-400 transition">Top 10 Government Colleges In India</Link></li>
            <li><Link to="/dental/private-colleges" className="hover:text-blue-400 transition">Top 10 Private Colleges In India</Link></li>
            <li><Link to="/dental" className="hover:text-blue-400 transition">Dental Colleges In India</Link></li>
          </ul>
        </div>

        {/* PHARMACY */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">PHARMACY</h3>
          <ul className="space-y-2">
            <li><Link to="/pharmacy/govt-colleges" className="hover:text-blue-400 transition">Top 10 Government Colleges In India</Link></li>
            <li><Link to="/pharmacy/private-colleges" className="hover:text-blue-400 transition">Top 10 Private Colleges In India</Link></li>
            <li><Link to="/pharmacy" className="hover:text-blue-400 transition">Pharmacy Colleges In India</Link></li>
          </ul>
        </div>

        {/* OTHER LINKS */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">OTHER LINKS</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-blue-400 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-400 transition">Privacy & Terms</Link></li>
            
          </ul>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-6">
            <Link to="#" className="hover:text-red-500 text-xl"><FaYoutube /></Link>
            <Link to="#" className="hover:text-blue-500 text-xl"><FaLinkedin /></Link>
            <Link to="#" className="hover:text-pink-500 text-xl"><FaInstagram /></Link>
            <Link to="#" className="hover:text-sky-400 text-xl"><FaTwitter /></Link>
            <Link to="#" className="hover:text-blue-600 text-xl"><FaFacebook /></Link>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        2024 © <Link to="/admin" className="hover:text-blue-400">digibuddy.in</Link>, All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
