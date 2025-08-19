import React, { useState } from 'react';
import NavBar from './components/NavBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import CtaSection from './components/CtaSection';
import Medical from './pages/Medical';
import CollegeDetail from './pages/CollegeDetail'; // ✅ Import it here
import Dental from './pages/Dental';
import DentalTopTenGov from './pages/DentalTopTenGov';
import DentalTopTenPvt from './pages/DentalTopTenPvt';
import MedicalTopTenGov from './pages/MedicalTopTenGov';
import MedicalTopTenPvt from './pages/MedicalTopTenPvt';
import Pharma from './pages/Pharma';
import PharmaTopTenGov from './pages/PharmaTopTenGov';
import PharmaTopTenPvt from './pages/PharmaTopTenPvt';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const App = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/connect" element={<CtaSection />} />
        <Route path="/medical" element={<Medical />} />
        <Route path="/college/:slug/*" element={<CollegeDetail />} />
        <Route path="/dental" element={<Dental />} /> 
        <Route path="/dentaltoptengov" element={<DentalTopTenGov />} /> 
        <Route path="/dentaltoptenpvt" element={<DentalTopTenPvt />} /> 
        <Route path="/medicaltoptengov" element={<MedicalTopTenGov />} /> 
        <Route path="/medicaltoptenpvt" element={<MedicalTopTenPvt />} /> 
        <Route path="/pharma" element={<Pharma />} /> 
        <Route path="/pharmatoptengov" element={<PharmaTopTenGov />} /> 
        <Route path="/pharmatoptenpvt" element={<PharmaTopTenPvt />} /> 
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
