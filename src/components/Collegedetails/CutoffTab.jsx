import React from 'react';

const CutoffTab = ({ college }) => {
  const cutoffData = college.cutoff || [];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Cutoff</h2>

      {cutoffData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opening Rank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Closing Rank</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cutoffData.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.category}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.opening}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.closing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">Cutoff data not available.</p>
      )}
    </div>
  );
};

export default CutoffTab;
