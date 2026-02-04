import React, { useState } from 'react';
import { Button } from './Button';

export const LockScreen = ({ onAuthenticate }: { onAuthenticate: () => void }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '420') {
      onAuthenticate();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setPassword(''); // Clear invalid password
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/BRANKY%20VF-web.mp4" type="video/mp4" />
        </video>

        <div className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center">
          <img
            src="/video/LOGO-Y.png"
            alt="VRAKFEST Logo"
            className="h-24 w-auto mb-10 animate-fadeIn"
          />
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[9rem] font-bebas font-semibold leading-[0.9] mb-12 animate-fadeIn uppercase tracking-tight flex flex-col items-center gap-2 md:gap-4 lg:gap-6 text-center">
            <span className="text-white">NOVÁ KAPITOLA PŘICHÁZÍ.</span>
            <span className="text-[#F4CE14] drop-shadow-[0_0_40px_rgba(244,206,20,0.6)] no-underline">BUĎTE U TOHO S NÁMI!</span>
          </h1>

          {/* Interactive "JIŽ BRZY" Button / Login Input */}
          <div className="min-h-[80px] flex items-center justify-center">
            {!showPasswordInput ? (
              <Button
                onClick={() => setShowPasswordInput(true)}
                className="bg-[#F4CE14] text-black hover:bg-white border-0 text-xl px-12 py-4 animate-fadeIn"
              >
                JIŽ BRZY
              </Button>
            ) : (
              <form onSubmit={handleLogin} className="animate-fadeIn w-full max-w-sm">
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="ZADEJ HESLO"
                    className={`w-full bg-transparent border-b-4 ${error ? 'border-red-500 text-red-500 placeholder-red-500 animate-shake' : 'border-[#F4CE14] text-[#F4CE14] placeholder-[#F4CE14]/50'} px-4 py-2 font-bebas text-3xl md:text-4xl outline-none text-center tracking-widest transition-colors uppercase`}
                    autoFocus
                    onBlur={() => {
                      if (password === '') setShowPasswordInput(false);
                    }}
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
