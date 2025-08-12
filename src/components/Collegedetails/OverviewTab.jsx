import React from 'react';

const OverviewTab = ({ college }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">About {college.name}</h2>
      <p className="text-gray-700 mb-6">
        {college.overview || 'No description available.'}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Established</p>
          <p className="font-medium">{college.established || 'N/A'}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Ownership</p>
          <p className="font-medium">{college.ownership || 'N/A'}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Affiliation</p>
          <p className="font-medium">{college.approvedBy || 'N/A'}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-3">Key Highlights</h3>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        {(college.highlights || []).map((h, idx) => (
          <li key={idx}>{h}</li>
        ))}
      </ul>
    </div>
  );
};

export default OverviewTab;
