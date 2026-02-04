import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { DesignSystem } from './pages/DesignSystem';
import { LockScreen } from './components/LockScreen';
import { TechNavBar } from './components/TechNavBar';
import { Footer } from './components/Footer';
import { ThemeController } from './components/ThemeController';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LockScreen onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <ThemeController />
      <div className="min-h-screen bg-[#111] text-white selection:bg-[#F4CE14] selection:text-black font-body">
        <TechNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dsgn" element={<DesignSystem />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}