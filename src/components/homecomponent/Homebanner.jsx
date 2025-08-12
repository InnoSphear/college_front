import React from "react";
import { IoMdSearch } from "react-icons/io";

const Homebanner = () => {
  return (
    <div className="w-full min-h-screen bg-[rgb(230,232,236)] flex flex-col lg:flex-row">
      {/* Text Content */}
      <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-28 flex flex-col justify-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[rgb(32,33,36)] leading-tight">
          Your College <br /> Decision, Informed <br />
          and Assured
        </h1>
        <p className="text-gray-500 mt-5 text-base md:text-lg">
          Search with Confidence for Colleges & Courses Backed by Verified Data
          on Placements, Median Salary, Career Outcomes, Diversity, Faculty
          Excellence, and More.
        </p>
        <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-sm mt-8 w-full max-w-xl">
          <IoMdSearch className="w-5 h-5 ml-4 text-gray-400" />
          <input
            type="text"
            className="py-3 px-4 w-full focus:outline-none placeholder-gray-400"
            placeholder="Search colleges, courses..."
          />
        </div>
      </div>

      {/* Image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-0">
        <img 
          className="w-full max-w-md md:max-w-lg lg:max-w-[550px] lg:mt-5" 
          src="https://png.pngtree.com/png-clipart/20240907/original/pngtree-medical-student-healthcare-education-training-png-image_15958562.png" 
          alt="College students studying" 
        />
      </div>
    </div>
  );
};

export default Homebanner;