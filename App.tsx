import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Home } from './pages/Home';
import { LockScreen } from './components/LockScreen';
import { TechNavBar } from './components/TechNavBar';
import { Footer } from './components/Footer';
import { ThemeController } from './components/ThemeController';
import { TransitionOverlay } from './components/TransitionOverlay';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
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
    }
  }, [isAuthenticated]);

  const handleAuthenticate = () => {
    // Start transition
    setIsTransitioning(true);
    // Show web after yellow panel covers everything (around 0.6s into the 3s animation)
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 600);
    // End transition after animation finishes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 3000);
  };

  return (
    <>
      {isTransitioning && <TransitionOverlay />}
      {!isAuthenticated ? (
        <LockScreen onAuthenticate={handleAuthenticate} />
      ) : (
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
      )}
    </>
  );
}