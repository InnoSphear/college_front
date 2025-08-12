import React from 'react';

const StudentStrengthTab = ({ college }) => {
  const strength = college.studentStrength || {};
  const male = strength.male || 'N/A';
  const female = strength.female || 'N/A';
  const total = strength.total || 'N/A';

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Student Strength</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Current Enrollment</h3>
        <p className="text-gray-700 mb-4">
          Currently, at {college.name}, {total} students are pursuing degrees.
          Of whom, {male} are boys and {female} are girls.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Male Students</p>
            <p className="font-medium text-xl">{male}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Female Students</p>
            <p className="font-medium text-xl">{female}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Total</p>
            <p className="font-medium text-xl">{total}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Approved Intake</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Student Strength Chart</p>
        </div>
      </div>
    </div>
  );
};

export default StudentStrengthTab;
