import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Home } from './pages/Home';
import { TechNavBar } from './components/TechNavBar';
import { Footer } from './components/Footer';
import { ThemeController } from './components/ThemeController';
import { LockScreen } from './components/LockScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LockScreen onAuthenticate={handleAuth} />;
  }

  return (
    <BrowserRouter>
      <ThemeController />
      <div className="min-h-screen bg-[#111] text-white selection:bg-[#F4CE14] selection:text-black font-body">
        <TechNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}