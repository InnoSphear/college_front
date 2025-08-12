import React from 'react';

const AdmissionTab = ({ college }) => {
  const admission = college.admission || {};

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Admission & Eligibility</h2>

      {admission.eligibility ? (
        <>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Admission Process</h3>
            <p className="text-gray-700 mb-4">
              {admission.processDescription || 'Admission process details not available.'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Eligibility Criteria</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {(admission.eligibility || []).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Admission information not available.</p>
      )}
    </div>
  );
};

export default AdmissionTab;
