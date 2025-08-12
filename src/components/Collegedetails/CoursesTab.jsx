import React from 'react';
import { useNavigate } from 'react-router-dom';

const CoursesTab = ({ college }) => {
  const navigate = useNavigate();

  const handleViewFees = (courseId) => {
    navigate(`/connect?college=${college.slug}&course=${courseId}`);
  };

  const courses = college.coursesAndFees || [];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Courses Offered</h2>

      {courses.length === 0 ? (
        <p className="text-gray-600">No course information available.</p>
      ) : (
        <div className="space-y-6">
          {courses.map((course, index) => (
            <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{course.name}</h3>
                  <p className="text-gray-600 text-sm">Affiliated by: {college.name}</p>
                </div>
                <button
                  onClick={() => handleViewFees(course.id || index)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Click to see fees
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-medium">{course.duration || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Fees</p>
                  <p className="font-medium">Download Broucher</p>
                </div>
                <div>
                  <p className="text-gray-500">Seats</p>
                  <p className="font-medium">{course.seats || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Level</p>
                  <p className="font-medium">{course.level || 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesTab;
