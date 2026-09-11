import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import VRToursCatalogPage from './pages/VRToursCatalogPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import VRTourPage from './pages/VRTourPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

export default function App() {
  const location = useLocation();
  const isVRTourMode = location.pathname.startsWith('/tour/');

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100">
      {/* Hide standard navbar inside immersive VR tour view */}
      {!isVRTourMode && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/tours" element={<VRToursCatalogPage />} />
          <Route path="/destination/:id" element={<DestinationDetailPage />} />
          <Route path="/tour/:id" element={<VRTourPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Hide footer inside immersive VR tour view */}
      {!isVRTourMode && <Footer />}
    </div>
  );
}
