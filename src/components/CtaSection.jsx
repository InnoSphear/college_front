import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const CtaSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "",
    college: ""
  });

  const [loading, setLoading] = useState(true); // for auto-fetch

  useEffect(() => {
    const savedData = localStorage.getItem("userFormData");

    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(parsed);

      // Auto-submit silently if all required fields are filled
      if (parsed.name && parsed.phone) {
        handleSubmit(null, parsed, true);
      }
      setLoading(false);
    } else {
      // Try fetching from backend
      fetch("/api/getUserData") // Replace with your API endpoint
        .then((res) => res.json())
        .then((data) => {
          const updatedData = {
            name: data.name || "",
            phone: data.phone || "",
            course: data.course || "",
            college: data.college || ""
          };
          setFormData(updatedData);

          // If we got required fields, auto-submit
          if (updatedData.name && updatedData.phone) {
            handleSubmit(null, updatedData, true);
          }
        })
        .catch((err) => {
          console.error("Could not fetch user data:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleSubmit = (e, dataOverride = null, auto = false) => {
    if (e) e.preventDefault();
    const dataToSend = dataOverride || formData;

    console.log("Form submitted with:", dataToSend);

    // Save in localStorage for future visits
    localStorage.setItem("userFormData", JSON.stringify(dataToSend));

    // Send to backend
    fetch("/api/submitForm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Backend response:", res);
        if (!auto) alert("Form submitted successfully!");
      })
      .catch((err) => {
        console.error("Form submission error:", err);
      });
  };

  const handleClose = () => {
    handleSubmit(null, null, true); // true → silent submit
    console.log("Form closed after submitting");
    // Optional: hide form after close
    // setFormData({ name: "", phone: "", course: "", college: "" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading form...
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full relative overflow-hidden border">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white flex justify-between items-center">
          <h3 className="text-xl font-bold">Personalized Counseling</h3>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md text-sm"
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border rounded-md text-sm"
                required
              />
            </div>

            {/* Course */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Course
              </label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                placeholder="Enter course name"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>

            {/* College */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                College
              </label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) =>
                  setFormData({ ...formData, college: e.target.value })
                }
                placeholder="Enter college name"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-md font-medium"
            >
              Request Call Back
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 text-center text-xs text-gray-500">
          Our counselor will contact you within 24 hours
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
