import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = "https://collegesugestion.onrender.com/api/colleges";

const DentalColleges = () => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    ownership: '',
    category: 'dental',
    course: ''
  });

  // Available filter options
  const [filterOptions, setFilterOptions] = useState({
    states: [],
    cities: [],
    ownerships: [],
    courses: []
  });

useEffect(() => {
  const fetchColleges = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(API_URL, { timeout: 10000 });

      let collegesData = [];
      if (Array.isArray(response.data)) {
        collegesData = response.data;
      } else if (response.data?.colleges) {
        collegesData = response.data.colleges;
      } else if (response.data?.data) {
        collegesData = response.data.data;
      } else {
        throw new Error('Invalid data format from API');
      }

      // ✅ Filter only dental category
      const dentalColleges = collegesData.filter(college =>
        college.category?.toLowerCase() === 'dental'
      );

      setColleges(dentalColleges);
      setFilteredColleges(dentalColleges);

      // ✅ Get unique filter values
      const states = [...new Set(dentalColleges.map(c => c.state || ''))].filter(Boolean);
      const cities = [...new Set(dentalColleges.map(c => c.city || ''))].filter(Boolean);
      const ownerships = [...new Set(dentalColleges.map(c => c.ownership || ''))].filter(Boolean);

      // ✅ Extract course names from coursesAndFees array
      const courses = [...new Set(
        dentalColleges.flatMap(c =>
          Array.isArray(c.coursesAndFees)
            ? c.coursesAndFees.map(cf => cf.name)
            : []
        )
      )].filter(Boolean);

      setFilterOptions({ states, cities, ownerships, courses });

    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load colleges');
    } finally {
      setLoading(false);
    }
  };

  fetchColleges();
}, []);



  useEffect(() => {
    const filtered = colleges.filter(college => {
      return (
        (filters.state === '' || college.state === filters.state) &&
        (filters.city === '' || college.city === filters.city) &&
        (filters.ownership === '' || college.ownership === filters.ownership) &&
        (filters.course === '' || (Array.isArray(college.courses) && college.courses.includes(filters.course)))
      );
    });
    setFilteredColleges(filtered);
  }, [filters, colleges]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      state: '',
      city: '',
      ownership: '',
      category: 'medical',
      course: ''
    });
  };

  // ✅ Updated: use slug in navigation
  const handleCardClick = (college) => {
    const slug = college.slug 
      ? college.slug 
      : college.name.replace(/\s+/g, '-').toLowerCase();
    navigate(`/college/${slug}`);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto p-6 bg-red-50 rounded-lg">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
        <p className="text-gray-700 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">Top Medical Colleges in India</h1>
        
        {/* Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
            <button 
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* State Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
              <select
                name="state"
                value={filters.state}
                onChange={handleFilterChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All States</option>
                {filterOptions.states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
              <select
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Cities</option>
                {filterOptions.cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            {/* Ownership Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ownership</label>
              <select
                name="ownership"
                value={filters.ownership}
                onChange={handleFilterChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                {filterOptions.ownerships.map(own => (
                  <option key={own} value={own}>{own}</option>
                ))}
              </select>
            </div>
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <input
                type="text"
                value="Medical"
                readOnly
                className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
              />
            </div>
            
            {/* Course Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Course</label>
              <select
                name="course"
                value={filters.course}
                onChange={handleFilterChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Courses</option>
                {filterOptions.courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-6 text-gray-600 text-sm sm:text-base">
          Showing {filteredColleges.length} of {colleges.length} medical colleges
        </div>
        
        {/* Colleges List */}
        <div className="space-y-5 sm:space-y-6">
          {filteredColleges.length > 0 ? (
            filteredColleges.map(college => (
              <CollegeCard 
                key={college._id} 
                college={college} 
                onClick={() => handleCardClick(college)}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 mb-4">No colleges match your filter criteria</p>
              <button 
                onClick={resetFilters}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// College Card Component
const CollegeCard = ({ college, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{college.name}</h2>
            <div className="flex flex-wrap items-center mt-2 gap-x-4 gap-y-2 text-gray-600 text-sm sm:text-base">
              <span>Ownership: {college.ownership}</span>
              <span>Established:{college.established || 'N/A'}</span>
            </div>
          </div>
          <Link to='/connect'>
            <button 
            className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base px-3 py-1.5 cursor-pointer rounded-md hover:bg-blue-400 transition-colors"
           
          >
            Download Broucher
          </button>
          </Link>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Admissions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button 
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-sm sm:text-base transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
            >
              Courses & Fees
            </button>
            <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-sm sm:text-base transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Cutoff
            </button>
            <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-sm sm:text-base transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Placements
            </button>
            <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-left text-sm sm:text-base transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Add to Compare
            </button>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-6 border-t pt-4" onClick={(e) => e.stopPropagation()}>
            <h4 className="font-medium mb-2">Available Courses:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {college.courses.map((course, index) => (
                <li key={index} className="text-sm sm:text-base">{course}</li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="font-medium text-sm sm:text-base">
                Approximate Fees: ₹{college.fees || 'Not available'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DentalColleges;
