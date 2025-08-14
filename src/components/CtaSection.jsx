import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaTimes, FaCookie, FaUserAlt, FaPhoneAlt } from "react-icons/fa";

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

  // Check if on home page
  const isHomePage = location.pathname === "/";

  // Check cookie consent from localStorage
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setCookieConsent(consent === "true");
      setShowCookieBanner(false);
    }
  }, []);

  // Auto-fill form with browser data
  useEffect(() => {
    const savedData = localStorage.getItem("ctaFormData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({
          name: prev.name || parsed.name || "",
          number: prev.number || parsed.number || ""
        }));
      } catch (err) {
        console.error("Error parsing saved form data", err);
      }
    }

    // Detect browser autofill after a delay
    const timer = setTimeout(() => {
      const nameValue = nameRef.current?.value || "";
      const numberValue = numberRef.current?.value || "";
      
      if (nameValue || numberValue) {
        setFormData(prev => ({
          name: prev.name || nameValue,
          number: prev.number || numberValue
        }));
      }
      setDataLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Save form data to localStorage
  useEffect(() => {
    if (formData.name || formData.number) {
      localStorage.setItem("ctaFormData", JSON.stringify(formData));
    }
  }, [formData]);

  // Handle cookie consent
  const handleCookieConsent = (consent) => {
    setCookieConsent(consent);
    localStorage.setItem("cookieConsent", consent.toString());
    setShowCookieBanner(false);
    
    if (consent && !contactAccessRequested) {
      requestContactAccess();
    }
  };

  // Request contact access
  const requestContactAccess = async () => {
    if (!('contacts' in navigator && 'ContactsManager' in window)) {
      console.log("Contact Picker API not supported");
      return;
    }

    try {
      const props = ['name', 'tel'];
      const opts = { multiple: false };
      
      const contacts = await navigator.contacts.select(props, opts);
      if (contacts && contacts.length > 0) {
        const contact = contacts[0];
        const name = Array.isArray(contact.name) ? contact.name[0] : contact.name || "";
        const tel = Array.isArray(contact.tel) ? contact.tel[0] : contact.tel || "";
        
        setFormData({
          name: name,
          number: tel.toString().replace(/\D/g, '')
        });
      }
      setContactAccessRequested(true);
    } catch (err) {
      console.error("Contact access error:", err);
    }
  };

  // Submit form
  const submitForm = async (silentSubmit = false) => {
    if (isSubmitting) return;
    
    setSubmitError("");
    const name = formData.name?.trim();
    const number = formData.number?.trim();
    if (!name || !number) return;
    if (sessionStorage.getItem("submittedOnce")) return;

    setIsSubmitting(true);
    try {
      await axios.post(API_BASE, { name, number });
      sessionStorage.setItem("submittedOnce", "true");
      
      console.log("Data submitted successfully");
      
      if (!silentSubmit && !isHomePage) {
        alert("Form submitted successfully!");
      }
    } catch (err) {
      console.error("Error submitting form", err);
      if (!isHomePage) {
        setSubmitError(err?.response?.data?.error || "Submission failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle close with submit
  const handleClose = async (silentSubmit = true) => {
    await submitForm(silentSubmit);
    setShowPopup(false);
    if (goHomeOnClose) navigate(homePath);
  };

  // Auto-submit on scroll
  useEffect(() => {
    if (!dataLoaded || isHomePage) return;
    
    const onScroll = () => {
      if (!sessionStorage.getItem("submittedOnce")) {
        submitForm(true);
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dataLoaded, formData]);

  // Auto-submit immediately if data present (for homepage)
  useEffect(() => {
    if (isHomePage && dataLoaded && formData.name && formData.number && !sessionStorage.getItem("submittedOnce")) {
      submitForm(true);
    }
  }, [dataLoaded, formData, isHomePage]);

  // Don't show UI on homepage
  if (isHomePage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={popupRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden animate-fade-in"
      >
        {/* Cookie Consent Banner */}
        {showCookieBanner && (
          <div className="bg-blue-50 p-4 border-b border-blue-100">
            <div className="flex items-start">
              <FaCookie className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
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

        {/* Main Form */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Personalized Counseling</h2>
            <button
              onClick={() => handleClose(true)}
              className="text-gray-500 hover:text-gray-700 text-xl"
              aria-label="Close"
              disabled={isSubmitting}
            >
              <FaTimes />
            </button>
          </div>

          <form
            autoComplete="on"
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaUserAlt className="mr-2 text-gray-500" />
                Full Name
              </label>
              <input
                ref={nameRef}
                id="contact-name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaPhoneAlt className="mr-2 text-gray-500" />
                Phone Number
              </label>
              <input
                ref={numberRef}
                id="contact-phone"
                name="tel"
                type="tel"
                placeholder="Enter your phone number"
                autoComplete="tel"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                pattern="[0-9]{10,15}"
                title="Please enter a valid phone number (10-15 digits)"
              />
            </div>

            {submitError && (
              <div className="text-red-600 text-sm mt-2">{submitError}</div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg w-full transition-colors flex-1 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                ) : null}
                {isSubmitting ? "Submitting..." : "Request Call Back"}
              </button>

              <button
                type="button"
                onClick={() => handleClose(true)}
                className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg w-full sm:w-auto transition-colors"
                disabled={isSubmitting}
              >
                Close & Submit
              </button>
            </div>
          </form>
        </div>

        <div className="bg-gray-50 px-6 py-3 text-center text-xs text-gray-500 border-t">
          Our counselor will contact you within 24 hours
        </div>
      </div>
    </div>
  );
}