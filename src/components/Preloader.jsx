import React, { useEffect, useState } from 'react';

const LOADER_IMAGES = [
  '/assets/loader_01.webp',
  '/assets/loader_02.webp',
  '/assets/loader_03.webp',
  '/assets/loader_04.webp',
  '/assets/loader_05.webp',
  '/assets/loader_06.webp'
];

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let currentCount = 0;
    const increment = 1.35;
    const imageCycleStep = 100 / LOADER_IMAGES.length;

    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= 100) {
        currentCount = 100;
        setCount(100);
        clearInterval(timer);

        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 700);
        }, 350);
      } else {
        setCount(Math.floor(currentCount));
        const indexToActivate = Math.floor(currentCount / imageCycleStep) % LOADER_IMAGES.length;
        setCurrentImageIndex(indexToActivate);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [onComplete]);

  const formattedNbr = count.toString().padStart(3, '0');

  return (
    <div
      id="loader"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#ffffff',
        color: '#000000',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'IBM Plex Mono', monospace",
        transition: 'transform 0.75s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0%)',
        opacity: isExiting ? 0 : 1
      }}
    >
      <div className="loader-c" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
        
        {/* Custom Preloader Animation Block: M O T I [Animation Box] N { } */}
        <div 
          className="loader-anim" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: 'clamp(4rem, 11vw, 8.5rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            fontFamily: 'Syne, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.03em',
            lineHeight: 1
          }}
        >
          <span style={{ marginRight: '0.05em' }}>M</span>
          <span style={{ marginRight: '0.05em' }}>O</span>
          <span style={{ marginRight: '0.05em' }}>T</span>
          <span style={{ marginRight: '0.08em' }}>I</span>

          {/* Cycling 3D Artwork Image Container in place of Second O (Second Last Letter) */}
          <div 
            className="loader-img-w" 
            style={{ 
              position: 'relative', 
              width: 'clamp(4.2rem, 11.5vw, 9rem)', 
              height: 'clamp(4.2rem, 11.5vw, 9rem)', 
              overflow: 'hidden', 
              borderRadius: '20px', 
              backgroundColor: '#f8f8f8',
              marginRight: '0.08em',
              display: 'inline-block',
              verticalAlign: 'middle'
            }}
          >
            {LOADER_IMAGES.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preloader Artwork ${idx + 1}`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  opacity: idx === currentImageIndex ? 1 : 0,
                  transition: 'opacity 0.08s ease-in-out'
                }}
              />
            ))}
          </div>

          <span style={{ marginRight: '0.12em' }}>N</span>
          <span style={{ marginRight: '0.05em', color: '#888888', fontWeight: 300 }}>{'{'}</span>
          <span style={{ color: '#888888', fontWeight: 300 }}>{'}'}</span>
        </div>

        {/* Monospace 3-Digit Counter */}
        <div className="loader-nbr-w">
          <div id="loader-nbr" style={{ fontSize: '1.4rem', fontWeight: 500, letterSpacing: '0.25em', color: '#000000' }}>
            {formattedNbr}
          </div>
        </div>

      </div>
    </div>
  );
}
