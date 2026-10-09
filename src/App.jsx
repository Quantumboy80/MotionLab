import React, { useState, useEffect, useRef } from 'react';
import BlobCanvas from './components/3D/BlobCanvas';
import ContactModal from './components/ContactModal';
import Preloader from './components/Preloader';
import { ArrowUpRight, X, ArrowRight, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PORTFOLIO_PROJECTS = [
  { id: 1, title: 'Cinematic Portfolio', category: 'Immersive cinematic visual showcase.', year: '2026', video: '/assets/project_01.mp4' },
  { id: 2, title: 'Character Carousel', category: 'High-fidelity 3D character staging.', year: '2025', video: '/assets/project_02.mp4' },
  { id: 3, title: 'Framer Blog', category: 'A dynamic content interface styled in Framer.', year: '2026', video: '/assets/project_03.mp4' },
  { id: 4, title: 'Kotodama', category: 'Study Smarter with AI-Powered Learning.', year: '2025', video: '/assets/project_04.mp4' },
  { id: 5, title: 'Portfolio', category: 'My portfolio website.', year: '2026', video: '/assets/project_05.mp4' }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeProject, setActiveProject] = useState(null);

  // GSAP animation references
  const mainRef = useRef(null);
  const showreelRef = useRef(null);
  const videoStickyRef = useRef(null);
  const museeVideoRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    // Smooth cursor follower for project hover preview
    const onMove = (e) => {
      if (!previewRef.current) return;
      gsap.to(previewRef.current, {
        x: e.clientX + 25,
        y: e.clientY + 25,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', onMove);

    // --- GSAP Scroll Trigger Animations ---
    const ctx = gsap.context(() => {
      
      // 1. Showreel Video Container Scale Up
      gsap.fromTo(
        '.video-showreel-full-w',
        {
          width: '70%',
          borderRadius: '40px'
        },
        {
          width: '100%',
          borderRadius: '0px',
          scrollTrigger: {
            trigger: '.section-showreel',
            start: 'top bottom',
            end: 'center center',
            scrub: true
          }
        }
      );

      // 2. Parallax Scrolling Elements
      gsap.utils.toArray('.floating-element').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 1;
        gsap.to(el, {
          y: `${-80 * speed}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // 3. Text Reveal Effect
      gsap.utils.toArray('.reveal-text').forEach((text) => {
        gsap.fromTo(
          text,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 85%'
            }
          }
        );
      });

      // 4. Immersive TV Frame Zoom & Philosophy Text Overlay Timeline
      const tvTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#studio-video',
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: true
        }
      });

      // Zoom container to full viewport bounds
      tvTimeline.to('.musee-w', {
        width: '100%',
        maxWidth: '100%',
        height: '100vh',
        ease: 'none'
      }, 0);

      // Scale video box to full bleed
      tvTimeline.to('.video-w', {
        width: '100%',
        height: '100%',
        borderRadius: '0px',
        ease: 'none'
      }, 0);

      // Dissolve painting wall background and wood border frame
      tvTimeline.to('.musee-bg', {
        opacity: 0,
        ease: 'none'
      }, 0);

      tvTimeline.to('.cadre-video', {
        opacity: 0,
        ease: 'none'
      }, 0);

      // Slight camera push-in zoom on video
      tvTimeline.to('.video-sticky', {
        scale: 1.1,
        ease: 'none'
      }, 0);

      // Hide sound controls
      tvTimeline.to('.btn-sound', {
        opacity: 0,
        scale: 0.8,
        ease: 'none'
      }, 0);

      // Fade-in and slide-up the philosophy text overlay over the video
      tvTimeline.fromTo('.musee-text-overlay',
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.6
        },
        0.5
      );

      // Hold reading state, then slide-out text
      tvTimeline.to('.musee-text-overlay', {
        opacity: 0,
        y: -50,
        ease: 'power2.in',
        duration: 0.4
      }, 1.3);

      // Fade out video to seamlessly reveal white background below
      tvTimeline.to('.video-w', {
        opacity: 0,
        ease: 'none',
        duration: 0.5
      }, 1.5);

      // 5. Glitch Section Entrance & Shutter Parallax Animation
      gsap.fromTo('.glitch-reveal-heading .word-inner',
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.85,
          stagger: 0.035,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.glitch',
            start: 'top 75%'
          }
        }
      );

      // Shutter mask open effect
      gsap.fromTo('.glitch-img-w',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: '.glitch',
            start: 'top 75%'
          }
        }
      );

      // Parallax counter-zoom effect inside the mask
      gsap.fromTo('.glitch-img',
        { scale: 1.3, yPercent: -12 },
        {
          scale: 1.02,
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.glitch',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

    }, mainRef);

    return () => {
      window.removeEventListener('mousemove', onMove);
      ctx.revert();
    };
  }, [isLoading]);

  return (
    <div ref={mainRef} style={{ position: 'relative', width: '100%', backgroundColor: '#ffffff', color: '#000000' }}>
      
      {/* 1. Noth.in Studio Preloader Sequence */}
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. 3D Metallic Foil & Liquid Splash Interactive Canvas (Fixed at background) */}
      <BlobCanvas />

      {/* 3. Header/Nav overlay */}
      <nav className="nav-boiler">
        <span className="nav-logo" style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'Syne, sans-serif' }}>
          MOTION LAB
        </span>
        <div className="menu-links-w">
          <a href="#works" className="link-boiler">works</a>
          <a href="#studio" className="link-boiler">studio</a>
          <button 
            onClick={() => setIsContactOpen(true)} 
            className="link-boiler" 
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            contact
          </button>
        </div>
      </nav>

      {/* --- SCROLLABLE MULTI-SECTION STORY LAYOUT --- */}
      <div className="page-wrapper">
        
        {/* SECTION 1: Immersive Hero */}
        <section className="section hero-home" style={{ height: '100vh', display: 'flex', alignItems: 'flex-end', padding: '3rem', position: 'relative' }}>
          <div className="layout-grid-hero" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 3 }}>
            <div className="tagline-container">
              <p className="tagline">
                Where the boring ideas are swiped under the dust.
              </p>
              <button className="inquiry-btn" onClick={() => setIsContactOpen(true)}>
                PROJECT INQUIRY <span style={{ fontSize: '0.9rem' }}>☟</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#ffffff', mixBlendMode: 'difference' }}>
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>SCROLL</span>
              <ArrowDown size={18} style={{ animation: 'bounce 2s infinite' }} />
            </div>

            <div className="year-tag">
              (2026)
            </div>
          </div>
        </section>

        {/* SECTION 2: Showreel */}
        <section className="section section-showreel" ref={showreelRef} style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
          <div className="container" style={{ padding: '0 3rem' }}>
            <h2 className="h1-home reveal-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 900, marginBottom: '4rem', lineHeight: 1.1 }}>
              Most brands produce content.<br />We prefer ideas.
            </h2>
            
            {/* Swell-up Showreel Video Box */}
            <div className="video-showreel-w" style={{ position: 'relative', width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="video-showreel-full-w" style={{ position: 'relative', height: '100%', overflow: 'hidden', backgroundColor: '#000000' }}>
                <video 
                  src="https://raw.githubusercontent.com/Cuberto/transparentize-video-demo/master/src/static/video/main.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  crossOrigin="anonymous" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div className="video-showreel-flip" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', marginTop: '3rem' }}>
              <div className="mono-label" style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>( The step aside )</div>
              <p style={{ fontSize: '1.4rem', lineHeight: 1.4 }}>
                In a world of infinite images, the rare thing is clarity. Images defend ideas, experiences shift perception, and brands change how people see the world.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Selected Works */}
        <section id="works" className="section works" style={{ padding: '6rem 3rem', backgroundColor: '#ffffff', position: 'relative' }}>
          <div className="works-header" style={{ borderBottom: '1px solid #000000', paddingBottom: '2rem', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>SELECTED WORKS</span>
            <h2 className="reveal-text" style={{ fontSize: '3rem', fontWeight: 900, marginTop: '1rem' }}>
              Good brands communicate.<br />Great brands surprise.
            </h2>
          </div>

          <div className="work_list">
            {PORTFOLIO_PROJECTS.map((p) => (
              <div 
                key={p.id} 
                className="work_item" 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 2fr 1fr', 
                  alignItems: 'center', 
                  padding: '3rem 0', 
                  borderBottom: '1px solid rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseEnter={() => setActiveProject(p)}
                onMouseLeave={() => setActiveProject(null)}
                onClick={() => setIsContactOpen(true)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>0{p.id}</span>
                  <h3 style={{ fontSize: '2.2rem', fontWeight: 800 }}>{p.title}</h3>
                </div>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>{p.category}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{p.year}</span>
                  <ArrowUpRight size={24} />
                </div>
              </div>
            ))}
          </div>

          {/* Floating Hover Video Preview Window */}
          <div 
            ref={previewRef}
            className="project-hover-preview"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '320px',
              height: '180px',
              pointerEvents: 'none',
              zIndex: 999,
              overflow: 'hidden',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.22)',
              backgroundColor: '#000000',
              opacity: activeProject ? 1 : 0,
              transform: activeProject ? 'scale(1)' : 'scale(0.85)',
              transition: 'opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {PORTFOLIO_PROJECTS.map((p) => {
              const isActive = activeProject && activeProject.id === p.id;
              return (
                <div 
                  key={p.id}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.25s ease-in-out'
                  }}
                >
                  {isActive && p.video && (
                    <video 
                      src={p.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: TV Sticky Frame Mockup */}
        <section id="studio-video" className="section video" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', overflow: 'hidden' }}>
          <div className="musee-w" style={{ position: 'relative', width: '90%', maxWidth: '1200px', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Gallery Wall Background */}
            <img 
              src="https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=1200" 
              className="musee-bg" 
              alt="Gallery Wall Background"
              style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
            />
            
            {/* Mockup Frame & Video */}
            <div className="video-w" style={{ position: 'relative', width: '68%', height: '62%', zIndex: 2, overflow: 'hidden', borderRadius: '16px' }}>
              <video 
                ref={museeVideoRef}
                src="/assets/tv_loop_custom.mp4" 
                autoPlay 
                loop 
                muted={isMuted}
                playsInline 
                className="video-sticky"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              
              {/* TV Mockup overlay frame */}
              <img 
                src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a281a4f86f15756a04aa88e_test-cadre-transparent.webp" 
                alt="TV Frame" 
                className="cadre-video"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', pointerEvents: 'none' }}
              />
            </div>

            {/* Immersive Sound Control */}
            <div 
              className="btn-sound" 
              onClick={() => {
                setIsMuted(!isMuted);
                if (museeVideoRef.current) museeVideoRef.current.muted = !isMuted;
              }}
              style={{
                position: 'absolute',
                bottom: '12%',
                right: '18%',
                zIndex: 3,
                backgroundColor: '#000000',
                color: '#ffffff',
                border: '1px solid #ffffff',
                padding: '0.5rem 1.25rem',
                borderRadius: '30px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>SOUND</span>
              <span style={{ color: isMuted ? '#ff3b30' : '#bfff00' }}>
                {isMuted ? '[OFF]' : '[ON]'}
              </span>
            </div>

            {/* Fullscreen Philosophy Text Overlay (Fades and slides up over zoomed video) */}
            <div 
              className="musee-text-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4rem 6rem',
                zIndex: 4,
                opacity: 0,
                transform: 'translateY(60px)',
                pointerEvents: 'none',
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.2)'
              }}
            >
              <div style={{ maxWidth: '850px', color: '#ffffff' }}>
                <span style={{ fontFamily: 'monospace', color: '#bfff00', fontSize: '0.9rem', letterSpacing: '0.12em' }}>( THE STUDIO PHILOSOPHY )</span>
                <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginTop: '2rem', lineHeight: 1.35, letterSpacing: '-0.02em', color: '#ffffff' }}>
                  We called it Motion Lab because it started as a paradox, an empty space open enough to become anything: a campaign, a space, an event, a system...
                </h3>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: Studio Philosophy & floating elements */}
        <section id="studio" className="section info-img" style={{ padding: '8rem 3rem', position: 'relative', overflow: 'hidden' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '6rem' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3171d9fb2a39d8054e9252_beton-plastic-V2.webp" 
                alt="Abstract Beton Concrete sculpture"
                style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '24px' }}
              />
              <p style={{ fontSize: '1.2rem', marginTop: '1.5rem', fontStyle: 'italic' }}>or something unexpected.</p>
            </div>
            <div>
              <img 
                src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a317205d7b275b2d2985000_boule-chelou-coline-V2.webp" 
                alt="Spherical Abstract 3D Render"
                style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '24px', marginTop: '3rem' }}
              />
            </div>
          </div>

          {/* Floating background ornaments (parallax effect) */}
          <div className="formes-w" style={{ pointerEvents: 'none' }}>
            <img src="/assets/loader_01.webp" alt="Ornament 1" className="floating-element" data-speed="1.2" style={{ position: 'absolute', top: '15%', right: '8%', width: '120px' }} />
            <img src="/assets/loader_02.webp" alt="Ornament 2" className="floating-element" data-speed="-1.5" style={{ position: 'absolute', top: '45%', left: '5%', width: '130px' }} />
            <img src="/assets/loader_03.webp" alt="Ornament 3" className="floating-element" data-speed="2.0" style={{ position: 'absolute', top: '75%', right: '12%', width: '110px' }} />
            <img src="/assets/loader_05.webp" alt="Ornament 4" className="floating-element" data-speed="-1.0" style={{ position: 'absolute', top: '55%', right: '45%', width: '90px' }} />
          </div>
        </section>

        {/* SECTION 6: Glitch/Elevator */}
        <section className="section glitch" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#000000', color: '#ffffff', padding: '6rem 3rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', width: '100%' }}>
            <div className="glitch-img-w" style={{ overflow: 'hidden', borderRadius: '24px', position: 'relative', width: '100%' }}>
              <img 
                src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a31722974b25426299f5e83_saussice-V2.webp" 
                alt="Abstract art render"
                className="glitch-img"
                style={{ width: '100%', display: 'block', borderRadius: '24px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="glitch-stack" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontFamily: 'monospace', fontSize: '1.8rem', textTransform: 'uppercase' }}>
                <span>Motion Lab</span>
                <span>Motion Lab</span>
                <span>Motion Lab</span>
              </div>
              <h2 className="glitch-reveal-heading" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, marginTop: '2rem', lineHeight: 1.2 }}>
                {"We create brand experiences for those ready to go beyond the ordinary.".split(" ").map((word, i) => (
                  <span key={i} className="word-span" style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
                    <span className="word-inner" style={{ display: 'inline-block' }}>
                      {word}
                    </span>
                  </span>
                ))}
              </h2>
            </div>
          </div>
        </section>

        {/* SECTION 7: Footer */}
        <footer id="footer" className="section-footer" style={{ padding: '8rem 3rem 4rem 3rem', backgroundColor: '#ffffff' }}>
          <div className="footer-c" style={{ borderTop: '1px solid #000000', paddingTop: '6rem' }}>
            <h2 className="reveal-text" style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 900, lineHeight: 1.0, marginBottom: '4rem' }}>
              Let’s build <br />with Motion Lab
            </h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <a href="https://calendly.com/motionlab/30min" target="_blank" className="inquiry-btn" style={{ textDecoration: 'none' }}>
                  BOOK A CALL <ArrowRight size={14} />
                </a>
                <button 
                  onClick={() => setIsContactOpen(true)} 
                  className="inquiry-btn" 
                  style={{ background: 'transparent', color: '#000000', borderColor: '#000000', boxShadow: 'none' }}
                >
                  START INQUIRY ☟
                </button>
              </div>

              <div style={{ display: 'flex', gap: '2rem', fontFamily: 'monospace' }}>
                <a href="#" className="portfolio-link" style={{ color: '#000000' }}>Linkedin</a>
                <a href="#" className="portfolio-link" style={{ color: '#000000' }}>Instagram</a>
                <a href="#" className="portfolio-link" style={{ color: '#000000' }}>Behance</a>
              </div>
            </div>

            <div style={{ marginTop: '8rem', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>©2026 — Founded by Sayan Som</span>
              <span>Site by Motion Lab</span>
            </div>
          </div>
        </footer>

      </div>

      {/* Inquiry Modal */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
}
