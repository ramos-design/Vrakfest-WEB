import React from 'react';

export const TransitionOverlay = () => {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Yellow panel sliding from top */}
      <div
        className="absolute inset-0 bg-[#F4CE14] flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{
          animation: 'slideDownPauseUp 3s ease-in-out forwards'
        }}
      >
        {/* Tire Tracks - Left */}
        <img
          src="/media/grunge-tire-track-wheel-braking-marks-truck-car-motorcycle-tread-pattern-silhouette-auto-race.png"
          alt=""
          className="absolute -left-10 top-1/2 -translate-y-1/2 h-[40%] w-auto opacity-5 rotate-180"
          style={{ filter: 'brightness(0)' }}
        />

        {/* Tire Tracks - Right */}
        <img
          src="/media/grunge-tire-track-wheel-braking-marks-truck-car-motorcycle-tread-pattern-silhouette-auto-race.png"
          alt=""
          className="absolute -right-10 top-1/2 -translate-y-1/2 h-[40%] w-auto opacity-5"
          style={{ filter: 'brightness(0)' }}
        />

        {/* VRAKFEST Logo Image */}
        <img
          src="/video/LOGO-Y.png"
          alt="VRAKFEST"
          className="h-32 md:h-44 lg:h-56 w-auto relative z-10"
          style={{
            animation: 'logoSlideAndPulse 3s ease-in-out forwards',
            filter: 'brightness(0) saturate(100%)' // Makes yellow logo black
          }}
        />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideDownPauseUp {
          0% {
            transform: translateY(-100%);
          }
          20% {
            transform: translateY(0);
          }
          80% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        @keyframes logoSlideAndPulse {
          0% {
            transform: translateY(-100%) scale(1);
          }
          20% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(0) scale(1.2);
          }
          80% {
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(-100%) scale(1);
          }
        }
      `}</style>
    </div>
  );
};
