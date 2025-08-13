import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://collegesugestion.onrender.com";
const API_URL = `${API_BASE}/api/users`;

const CtaSection = ({ silent = false, goHomeOnClose = true, homePath = "/" }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(!silent);
  const [loading, setLoading] = useState(true);
  const hasSubmittedRef = useRef(false); // prevent multiple submissions in same session

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    course: "",
    college: "",
  });

  // Prefill from URL params
  const urlPrefill = useMemo(() => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return {
      name: params.get("name") || "",
      number: params.get("number") || "",
      course: params.get("course") || "",
      college: params.get("college") || "",
    };
  }, []);

  // Load data from localStorage and backend
  useEffect(() => {
    const fillData = async () => {
      let merged = { ...urlPrefill };

      // From localStorage
      const saved = localStorage.getItem("userFormData");
      if (saved) merged = { ...merged, ...JSON.parse(saved) };

      // From backend if phone number exists
      if (merged.number) {
        try {
          const res = await fetch(`${API_URL}/${encodeURIComponent(merged.number)}`);
          if (res.ok) {
            const data = await res.json();
            if (data) merged = { ...merged, ...data };
          }
        } catch (err) {
          console.error("Backend fetch failed:", err);
        }
      }

      setFormData(merged);
      setLoading(false);
    };

    fillData();
  }, [urlPrefill]);

  // Submit helper
  const submitToBackend = async (payload) => {
    try {
      localStorage.setItem("userFormData", JSON.stringify(payload));
    } catch {}

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        console.log("Data Submitted");
        hasSubmittedRef.current = true;
      } else {
        console.error("Backend error:", await res.text());
      }
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  const handleSubmit = async (e, auto = false) => {
    if (e) e.preventDefault();
    if (hasSubmittedRef.current) return; // prevent duplicates

    const { name, number, course, college } = formData;
    if (!name || !number) return;

    await submitToBackend({ name, number, course, college });

    if (!auto && !silent) {
      // Optional: success toast
    }
  };

  const handleClose = async () => {
    await handleSubmit(null, true);
    setShowPopup(false);
    if (goHomeOnClose) navigate(homePath);
  };

  // Auto-submit on scroll (only once)
  useEffect(() => {
    const onScroll = async () => {
      if (hasSubmittedRef.current) return;
      if (formData.name && formData.number) {
        await handleSubmit(null, true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [formData]);

  // Auto-submit if silent mode
  useEffect(() => {
    if (silent && formData.name && formData.number && !hasSubmittedRef.current) {
      handleSubmit(null, true);
    }
  }, [silent, formData]);

  if (loading) return null;
  if (silent) return null;
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white flex items-center justify-between">
          <h3 className="text-xl font-semibold">Personalized Counseling</h3>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-white/20 transition">
            <FaTimes />
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Course</label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">College</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
              Request Call Back
            </button>
          </form>
        </div>
        <div className="bg-gray-50 px-6 py-3 text-center text-xs text-gray-500">
          Our counselor will contact you within 24 hours
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
