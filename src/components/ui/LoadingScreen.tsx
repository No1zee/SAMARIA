"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide body overflow while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      // Dismiss after 2 seconds
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <>
      <div className="loading-container">
        {/* Immersive Background Layers */}
        <div className="background-container">
            <div className="loading-ring ring-1"></div>
            <div className="loading-ring ring-2"></div>
            <div className="loading-ring ring-3"></div>
        </div>

        {/* Visual Shimmer Over Whole Viewport */}
        <div className="shimmer-overlay"></div>

        {/* Animated Logo Content */}
        <div className="logo-wrapper">
          {/* Logo with 3D spin */}
          <img 
            src="/logo.png" 
            alt="Samaria Logo" 
            className="logo-image"
          />
          {/* Ground Shadow */}
          <div className="shadow"></div>
        </div>
      </div>

      <style jsx>{`
        :global(body) {
            margin: 0;
            padding: 0;
        }

        .loading-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #f8fafc; /* var(--bg-color) */
            font-family: sans-serif;
            perspective: 1200px;
            overflow: hidden;
            z-index: 9999;
            --accent-color: rgba(196, 147, 58, 0.15);
            --spin-speed: 2s; /* Total duration aligned with loading time */
            --ring-speed: 20s;
        }

        /* Immersive Background Elements */
        .background-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: none;
        }

        .loading-ring {
            position: absolute;
            border-radius: 50%;
            border: 1px dashed var(--accent-color);
            animation: bg-rotate var(--ring-speed) linear infinite;
        }

        .ring-1 { width: 400px; height: 400px; opacity: 0.6; animation-duration: 25s; }
        .ring-2 { width: 600px; height: 600px; opacity: 0.4; animation-duration: 40s; animation-direction: reverse; }
        .ring-3 { width: 850px; height: 850px; opacity: 0.2; animation-duration: 60s; }

        @keyframes bg-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* Logo Container */
        .logo-wrapper {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transform-style: preserve-3d;
        }

        .logo-image {
            width: 280px;
            height: auto;
            max-width: 80vw;
            /* Fast spin set: 5 full spins in 1.6s, then drift */
            animation: logo-intro var(--spin-speed) forwards; 
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.05));
        }

        /* Ground Shadow */
        .shadow {
            position: absolute;
            bottom: -60px;
            width: 180px;
            height: 20px;
            background: radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 70%);
            border-radius: 50%;
            /* Sync with logo spin: fast pulse then stabilize */
            animation: shadow-scale var(--spin-speed) forwards;
            opacity: 0.8;
        }

        @keyframes logo-intro {
            0% { 
                transform: rotateY(0deg); 
                animation-timing-function: cubic-bezier(0.1, 0, 0.2, 1); /* Explosive start, fast deceleration */
            }
            80% { 
                transform: rotateY(1800deg); /* 5 full spins at 1.6s mark */
                animation-timing-function: cubic-bezier(0.2, 0, 0.3, 1); /* Decel more naturally */
            }
            100% { 
                transform: rotateY(1810deg); /* Slight drift until 2.0s */
            }
        }

        @keyframes shadow-scale {
            /* Phase 1: Rapid pulsing during fast spin (0-80% of time) */
            0%, 20%, 40%, 60%, 80% {
                transform: scaleX(1);
                opacity: 0.5;
                animation-timing-function: ease-in-out;
            }
            10%, 30%, 50%, 70% {
                transform: scaleX(0.2);
                opacity: 0.2;
                animation-timing-function: ease-in-out;
            }
            /* Phase 2: Slow/Stop (80-100% of time) */
            81% {
                transform: scaleX(1);
                opacity: 0.5;
            }
            100% {
                transform: scaleX(1);
                opacity: 0.5;
            }
        }

        /* Subtle Light Sweep across the whole screen */
        .shimmer-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 200%;
            height: 100%;
            background: linear-gradient(
                120deg, 
                rgba(255,255,255,0) 30%, 
                rgba(255,255,255,0.4) 50%, 
                rgba(255,255,255,0) 70%
            );
            pointer-events: none;
            animation: sweep 2s 1 ease-in-out; /* Match duration */
            z-index: 5;
        }

        @keyframes sweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(50%); }
        }
      `}</style>
    </>
  );
}
