import React, { useState, useEffect } from 'react';
import { Button } from './Button';

export const LockScreen = ({ onAuthenticate }: { onAuthenticate: () => void }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Initial calculation to avoid empty string on mount
  const getInitialTime = () => {
    const target = new Date();
    target.setHours(17, 0, 0, 0);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) return '00:00:00';
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTime());

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date();
      target.setHours(17, 0, 0, 0);

      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft('00:00:00');
        return;
      }

      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '420') {
      onAuthenticate();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setPassword('');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10 transition-opacity duration-1000"></div>

        {/* Fallback pattern if video fails */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#222_0%,_#000_100%)] z-0 opacity-50"></div>

        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 grayscale"
          onCanPlay={(e) => (e.currentTarget.style.opacity = '1')}
          style={{ opacity: 0, transition: 'opacity 1s' }}
        >
          <source src="/video/BRANKY%20VF-web.mp4" type="video/mp4" />
        </video>

        <div className="container mx-auto px-6 relative z-30 text-center flex flex-col items-center">
          <img
            src="/video/LOGO-Y.png"
            alt="VRAKFEST Logo"
            className="h-20 md:h-28 w-auto mb-8 animate-fadeIn"
          />
          <h1 className="text-[38px] md:text-6xl lg:text-7xl xl:text-8xl font-bebas font-bold leading-[1.1] md:leading-[0.9] mb-8 md:mb-12 animate-fadeIn uppercase tracking-tighter flex flex-col items-center gap-2 text-center px-4">
            <span className="text-white">NOVÁ KAPITOLA PŘICHÁZÍ.</span>
            <span className="text-[#F4CE14] drop-shadow-[0_0_20px_rgba(244,206,20,0.5)] md:drop-shadow-[0_0_50px_rgba(244,206,20,0.8)]">BUĎTE U TOHO S NÁMI!</span>
          </h1>

          {/* Interactive Countdown / Login Input */}
          <div className="min-h-[120px] flex items-center justify-center w-full">
            {!showPasswordInput ? (
              <div className="flex flex-col items-center gap-6">
                <div
                  onClick={() => setShowPasswordInput(true)}
                  className="group cursor-pointer bg-[#F4CE14] text-black px-12 py-6 animate-fadeIn font-bebas tracking-[0.1em] border-none shadow-[0_0_30px_rgba(244,206,20,0.4)] hover:bg-white hover:shadow-[0_0_50px_rgba(255,255,255,0.6)] transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-5xl md:text-7xl font-bold leading-none select-none">
                    {timeLeft}
                  </div>
                </div>
                <div className="text-sm md:text-base font-tech tracking-[0.3em] text-[#F4CE14] opacity-50 uppercase animate-fadeIn">
                  Otevíráme dnes v 17:00
                </div>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="animate-fadeIn w-full max-w-md px-6">
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="ZADEJ HESLO"
                    className={`w-full bg-transparent border-b-8 ${error ? 'border-red-600 text-red-600 animate-shake' : 'border-[#F4CE14] text-[#F4CE14]'} px-4 py-4 font-bebas text-4xl md:text-6xl outline-none text-center tracking-[0.5em] transition-all uppercase placeholder:opacity-20`}
                    autoFocus
                    onBlur={() => {
                      if (password === '') setShowPasswordInput(false);
                    }}
                  />
                  {error && (
                    <div className="text-red-600 font-tech text-xs mt-4 uppercase tracking-widest font-bold">
                      Nesprávné heslo. Zkus to znovu.
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Admin Quick Link (Invisible but there if needed) */}
      <div
        onClick={() => { localStorage.clear(); window.location.reload(); }}
        className="fixed bottom-4 right-4 text-[8px] text-white/5 cursor-pointer hover:text-white/20 transition-colors uppercase font-tech"
      >
        Reset Session
      </div>
    </div>
  );
};
