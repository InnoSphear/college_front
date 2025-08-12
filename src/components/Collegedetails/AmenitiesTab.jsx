import React from 'react';

const AmenitiesTab = ({ college }) => {
  const amenities = college.amenities || [];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Amenities</h2>

      {amenities.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">{amenity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No amenities information available.</p>
      )}
    </div>
  );
};

export default AmenitiesTab;
