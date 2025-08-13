import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Change this if your API base is different in dev/prod
const API_BASE =
  (typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) 
    ? "https://collegesugestion.onrender.com" // fallback to live instead of localhost
    : "https://collegesugestion.onrender.com";


const API_URL = `${API_BASE}/api/users`;

/**
 * Props:
 *  - silent: boolean (default false) -> if true, no UI is rendered, but auto-fill + scroll-submit run.
 *  - goHomeOnClose: boolean (default true) -> navigate("/") after close.
 *  - homePath: string (default "/") -> where to navigate on close.
 */
const CtaSection = ({ silent = false, goHomeOnClose = true, homePath = "/" }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(!silent); // popup visible only when not silent
  const [loading, setLoading] = useState(true);
  const [hasSubmittedOnScroll, setHasSubmittedOnScroll] = useState(false);
  const hasSubmittedRef = useRef(false); // guard to avoid duplicate submissions

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    course: "",
    college: "",
  });

  // Read URL params to prefill if present
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

  // ---- Auto-fill on mount (localStorage -> URL params fallback) ----
  useEffect(() => {
    try {
      const saved = localStorage.getItem("userFormData");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          ...Object.fromEntries(
            Object.entries(urlPrefill).filter(([_, v]) => v && v.trim() !== "")
          ),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          ...urlPrefill,
        }));
      }
    } catch (e) {
      console.error("Failed reading localStorage:", e);
      // still try URL params
      setFormData((prev) => ({ ...prev, ...urlPrefill }));
    } finally {
      setLoading(false);
    }
  }, [urlPrefill]);

  // ---- Submit helper (returns Promise) ----
  const submitToBackend = async (payload, { auto = false } = {}) => {
    // Save locally for later visits
    try {
      localStorage.setItem(
        "userFormData",
        JSON.stringify({ ...formData, ...payload })
      );
    } catch {}

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: payload.name, number: payload.number }), // backend only expects these two
      });

      // Even on non-200, try to parse; you still want the console log only on success
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `Request failed with ${res.status}`);
      }

      // success
      console.log("Data Submitted");
      if (!auto && !silent) {
        // Keep this minimal to avoid being intrusive
        // alert("Form submitted successfully!");
      }
      hasSubmittedRef.current = true;
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  // ---- Public submit handler (form + programmatic) ----
  const handleSubmit = async (e, { auto = false } = {}) => {
    if (e) e.preventDefault();

    const payload = {
      name: formData.name?.trim() || "",
      number: formData.number?.trim() || "",
      // course/college are ignored by backend model, but kept in localStorage
    };

    // Backend requires name & number; don't spam if missing
    if (!payload.name || !payload.number) {
      if (!auto) {
        console.warn("Name and number are required to submit.");
      }
      return;
    }

    await submitToBackend(payload, { auto });
  };

  // ---- Close button: submit (silent), then navigate home ----
  const handleClose = async () => {
    await handleSubmit(null, { auto: true }); // silent submit
    setShowPopup(false);
    if (goHomeOnClose) navigate(homePath);
  };

  // ---- On first scroll: submit silently once (if we have both fields) ----
  useEffect(() => {
    if (hasSubmittedOnScroll) return;

    const onScroll = async () => {
      if (hasSubmittedOnScroll || hasSubmittedRef.current) return;

      const hasName = formData.name && formData.name.trim() !== "";
      const hasNumber = formData.number && formData.number.trim() !== "";

      if (hasName && hasNumber) {
        setHasSubmittedOnScroll(true);
        await handleSubmit(null, { auto: true });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [formData, hasSubmittedOnScroll]);

  if (loading) return null;

  // In silent mode, no UI is rendered — but all effects & listeners are active.
  if (silent) return null;

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Dialog */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white flex items-center justify-between">
          <h3 className="text-xl font-semibold">Personalized Counseling</h3>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-white/20 transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, name: e.target.value }))
                }
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.number}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, number: e.target.value }))
                }
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                required
              />
            </div>

            {/* Course */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course
              </label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, course: e.target.value }))
                }
                placeholder="Enter course name"
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              />
            </div>

            {/* College */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                College
              </label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, college: e.target.value }))
                }
                placeholder="Enter college name"
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-md font-medium hover:opacity-95 transition"
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
