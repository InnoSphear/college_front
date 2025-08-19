import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaTimes, FaCookie, FaUserAlt, FaPhoneAlt, FaCheckCircle, FaRedo } from "react-icons/fa";

const API_BASE = "https://collegesugestion.onrender.com/api/users";

export default function CtaSection({
  goHomeOnClose = false,
  homePath = "/",
  silent = false,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const popupRef = useRef(null);

  const nameRef = useRef(null);
  const numberRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", number: "" });
  const [showPopup, setShowPopup] = useState(!silent && location.pathname !== "/");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [contactAccessRequested, setContactAccessRequested] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [scrollSubmitted, setScrollSubmitted] = useState(false);

  const isHomePage = location.pathname === "/";

  // Cookie consent
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setCookieConsent(consent === "true");
      setShowCookieBanner(false);
    }
  }, []);

  // Load saved form data
  useEffect(() => {
    const savedData = localStorage.getItem("ctaFormData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData({
          name: parsed.name || "",
          number: parsed.number || "",
        });
      } catch (err) {
        console.error("Error parsing saved form data", err);
      }
    }
    const t = setTimeout(() => setDataLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (formData.name || formData.number) {
      localStorage.setItem("ctaFormData", JSON.stringify(formData));
    }
  }, [formData]);

  // Cookie consent -> optional Contact Picker
  const handleCookieConsent = (consent) => {
    setCookieConsent(consent);
    localStorage.setItem("cookieConsent", consent.toString());
    setShowCookieBanner(false);
    if (consent && !contactAccessRequested) requestContactAccess();
  };

  const requestContactAccess = async () => {
    if (!("contacts" in navigator && "ContactsManager" in window)) return;
    try {
      const contacts = await navigator.contacts.select(["name", "tel"], { multiple: false });
      if (contacts?.length > 0) {
        const c = contacts[0];
        setFormData({
          name: Array.isArray(c.name) ? c.name[0] : c.name || "",
          number: Array.isArray(c.tel) ? c.tel[0] : c.tel || "",
        });
      }
      setContactAccessRequested(true);
    } catch (err) {
      console.error("Contact access error:", err);
    }
  };

  // Submit function - allows multiple submissions
  const submitForm = async (silentSubmit = false, fromScroll = false) => {
    if (isSubmitting) return;
    setSubmitError("");
    setSubmissionSuccess(false);

    const name = formData.name?.trim();
    const number = formData.number?.trim();

    if (!name || !number) {
      if (!silentSubmit) {
        setSubmitError("Please fill in both name and phone number");
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(API_BASE, { name, number });
      
      if (response.status === 200 || response.status === 201) {
        setHasSubmitted(true);
        setSubmissionSuccess(true);
        
        if (fromScroll) {
          setScrollSubmitted(true);
        }
        
        console.log("Data Submitted");
        
        if (!silentSubmit && !isHomePage) {
          setTimeout(() => {
            setSubmissionSuccess(false);
          }, 3000);
        }
      } else {
        throw new Error(`Server returned status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error submitting form", err);
      if (!isHomePage) {
        setSubmitError(err.response?.data?.error || "Submission failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  // Reset form for new submission
  const handleNewSubmission = () => {
    setHasSubmitted(false);
    setSubmissionSuccess(false);
    setSubmitError("");
    setFormData({ name: "", number: "" });
  };

  // Close X -> submit silently and go back
  const handleClose = async () => {
    // Only submit if we have valid data
    if (formData.name && formData.number && !hasSubmitted) {
      await submitForm(true);
    }
    setShowPopup(false);
    if (goHomeOnClose) navigate(homePath);
    else navigate(-1);
  };

  // Auto-submit on scroll
  useEffect(() => {
    if (!dataLoaded || scrollSubmitted) return;

    const handleScroll = () => {
      // Check if user has scrolled at least 50% down the page
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      
      if (scrollPercentage > 0.5 && formData.name && formData.number) {
        submitForm(true, true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dataLoaded, formData, scrollSubmitted]);

  // Hide UI on home page (silent), show popup elsewhere unless `silent` prop is true
  if (!showPopup || isHomePage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden animate-fade-in"
      >
        {/* Cookie Banner */}
        {showCookieBanner && (
          <div className="bg-blue-50 p-4 border-b border-blue-100">
            <div className="flex items-start">
              <FaCookie className="text-blue-600 mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-blue-800">We value your privacy</h3>
                <p className="text-sm text-blue-600 mt-1">
                  We use cookies to personalize your experience. By continuing, you agree to our
                  <a href="/privacy" className="underline ml-1">Privacy Policy</a>.
                </p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleCookieConsent(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
                  >
                    Allow All
                  </button>
                  <button
                    onClick={() => handleCookieConsent(false)}
                    className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-1 rounded text-sm"
                  >
                    Reject All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Personalized Counseling</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
              aria-label="Close"
              disabled={isSubmitting}
            >
              <FaTimes />
            </button>
          </div>

          {hasSubmitted ? (
            <div className="text-center py-8">
              <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {scrollSubmitted ? "Submitted Automatically!" : "Thank You!"}
              </h3>
              <p className="text-gray-600">Your information has been submitted successfully.</p>
              <p className="text-gray-600 mt-2">Our counselor will contact you within 24 hours.</p>
              
              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={handleClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleNewSubmission}
                  className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 px-6 py-2 rounded-lg transition-colors"
                >
                  <FaRedo /> Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaUserAlt className="mr-2 text-gray-500" /> Full Name
                </label>
                <input
                  ref={nameRef}
                  id="contact-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaPhoneAlt className="mr-2 text-gray-500" /> Phone Number
                </label>
                <input
                  ref={numberRef}
                  id="contact-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                  pattern="[0-9]{10,15}"
                  title="Please enter a valid phone number (10-15 digits)"
                />
              </div>

              {submitError && (
                <div className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded-md">
                  {submitError}
                </div>
              )}

              {submissionSuccess && (
                <div className="text-green-700 text-sm mt-2 p-2 bg-green-50 rounded-md">
                  Thank you! Your information has been submitted successfully.
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg w-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Request Call Back"}
                </button>
              </div>
            </form>
          )}
        </div>

        {!hasSubmitted && (
          <div className="bg-gray-50 px-6 py-3 text-center text-xs text-gray-500 border-t">
            <p>Our counselor will contact you within 24 hours</p>
            <p className="mt-1 text-blue-600">Form will auto-submit when you scroll down the page</p>
          </div>
        )}
      </div>
    </div>
  );
}