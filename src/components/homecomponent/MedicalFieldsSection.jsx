import React from "react";
import { FaStethoscope, FaPills, FaUserNurse, FaSeedling } from "react-icons/fa";
import { GiMedicinePills } from "react-icons/gi";

const MedicalFieldsSection = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Medical & Allied Health Fields
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore various medical and healthcare-related academic disciplines
          </p>
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Medicine */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaStethoscope className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Medicine</h3>
            </div>
            <ul className="space-y-2">
              {['MBBS', 'MD', 'MS', 'DM', 'MCh'].map((field, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  <span className="text-gray-700">{field}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pharmacy */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaPills className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Pharmacy</h3>
            </div>
            <ul className="space-y-2">
              {['B.Pharm', 'D.Pharm', 'M.Pharm', 'Pharm.D', 'Ph.D in Pharmacy'].map((field, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  <span className="text-gray-700">{field}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nursing */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <FaUserNurse className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Nursing</h3>
            </div>
            <ul className="space-y-2">
              {['B.Sc Nursing', 'GNM', 'ANM', 'M.Sc Nursing', 'Post Basic B.Sc'].map((field, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  <span className="text-gray-700">{field}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Agriculture */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <FaSeedling className="text-amber-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Agriculture</h3>
            </div>
            <ul className="space-y-2">
              {['B.Sc Agriculture', 'M.Sc Agriculture', 'B.Tech Agriculture', 'Ph.D Agriculture', 'Agri Business'].map((field, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  <span className="text-gray-700">{field}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Allied Health Sciences */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <GiMedicinePills className="text-red-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Allied Health</h3>
            </div>
            <ul className="space-y-2">
              {['Physiotherapy', 'Occupational Therapy', 'Medical Lab Technology', 'Radiology', 'Optometry'].map((field, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                  <span className="text-gray-700">{field}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Paramedical */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
              <div className="bg-teal-100 p-3 rounded-full mr-4">
                <FaStethoscope className="text-teal-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Paramedical</h3>
            </div>
            <ul className="space-y-2">
              {['Dialysis Technology', 'Cardiac Care', 'Emergency Medicine', 'Operation Theatre', 'Anesthesia'].map((field, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                  <span className="text-gray-700">{field}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalFieldsSection;