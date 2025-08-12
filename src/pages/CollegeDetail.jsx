import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import OverviewTab from "../components/Collegedetails/OverviewTab";
import CoursesTab from "../components/Collegedetails/CoursesTab";
import StudentStrengthTab from "../components/Collegedetails/StudentStrengthTab";
import AdmissionTab from "../components/Collegedetails/AdmissionTab";
import AmenitiesTab from "../components/Collegedetails/AmenitiesTab";
import CutoffTab from "../components/Collegedetails/CutoffTab";

const API_URL = "https://collegesugestion.onrender.com/api/colleges";

const CollegeDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Slug generator (same logic as MedicalColleges)
  const slugify = (str) =>
    str
      ?.toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get(API_URL, { timeout: 10000 });

        let list = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (data?.colleges) {
          list = data.colleges;
        } else if (data?.data) {
          list = data.data;
        } else {
          throw new Error("Invalid API response format");
        }

        const found = list.find(
          (c) => c.slug === slug || slugify(c.name) === slug
        );

        if (!found) {
          setError("College not found");
          return;
        }

        setCollege(found);
      } catch (err) {
        console.error(err);
        setError("Failed to load college data");
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [slug]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/college/${slug}/${tab}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading College Data
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Link
            to="/medical-colleges"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
          >
            Back to Colleges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link to="/medical-colleges" className="hover:text-blue-600">
              Medical
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{college?.name}</span>
          </div>
        </div>
      </header>

      {/* College Header */}
      <div className="relative h-[40vh] border-b overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover filter blur-xs scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D')`,
          }}
        ></div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
                  {college?.name}
                </h1>
                <p className="text-gray-200 mt-1 flex items-center drop-shadow">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  {college?.city}, {college?.state}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Link to="/connect">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors border border-white">
                    Click For Fees
                  </button>
                </Link>
                <Link to="/connect">
                  <button className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                    Share
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {["overview", "courses", "strength", "admission", "amenities", "cutoff"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`px-4 py-3 font-medium text-sm sm:text-base whitespace-nowrap border-b-2 ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left */}
          <div className="lg:w-2/3">
            <Routes>
              <Route path="overview" element={<OverviewTab college={college} />} />
              <Route path="courses" element={<CoursesTab college={college} />} />
              <Route path="strength" element={<StudentStrengthTab college={college} />} />
              <Route path="admission" element={<AdmissionTab college={college} />} />
              <Route path="amenities" element={<AmenitiesTab college={college} />} />
              <Route path="cutoff" element={<CutoffTab college={college} />} />
              <Route index element={<OverviewTab college={college} />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollegeDetail;
