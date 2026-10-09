import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle2, ArrowRight } from 'lucide-react';

function ConfettiBurst() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#000000', '#bfff00', '#888888', '#404040', '#cccccc'];

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles bursting from the center
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2 - 30,
        r: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2, // Slight upward bias
        gravity: 0.18,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.012
      });
    }

    let animationId;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.alpha <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (alive) {
        animationId = requestAnimationFrame(tick);
      }
    };
    tick();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        borderRadius: '28px',
        zIndex: 1
      }} 
    />
  );
}

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '3D Web Experience',
    budget: '$10k - $25k',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className={`collab-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      {/* Scrollable Container Wrapper */}
      <div className="collab-scroll-wrapper" onClick={e => e.stopPropagation()}>
        
        {/* Navigation/Header inside the overlay */}
        <header className="collab-header">
          <span className="collab-logo">MOTION LAB</span>
          <button className="collab-close-btn" onClick={onClose}>
            CLOSE <X size={16} />
          </button>
        </header>

        {/* 2-Column Grid Layout */}
        <div className="collab-container">
          
          {/* Left Column: Studio and Collaboration details */}
          <div className="collab-left">
            <div>
              <h1 className="collab-title">
                Let’s create<br />something<br />extraordinary.
              </h1>
              <p className="collab-subtitle" style={{ fontSize: '1.25rem', marginTop: '2.5rem', lineHeight: 1.5, color: '#333333', maxWidth: '420px' }}>
                We partner with visionary brands to design highly immersive 3D interfaces, identities, and digital systems. Send us your brief to start a collaboration.
              </p>
            </div>

            <div className="collab-meta">
              <div>
                <span className="meta-label">FOUNDER</span>
                <span className="meta-val">Sayan Som</span>
              </div>
              <div>
                <span className="meta-label">COORDINATES</span>
                <span className="meta-val">22.5726° N, 88.3639° E — Kolkata, IN</span>
              </div>
              <div>
                <span className="meta-label">LOCAL TIME</span>
                <span className="meta-val">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} (GMT+5:30)</span>
              </div>
              <div>
                <span className="meta-label">EMAIL DIRECT</span>
                <a href="mailto:hello@motionlab.studio" className="meta-val link-underline">hello@motionlab.studio</a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="collab-right">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', position: 'relative' }}>
                <ConfettiBurst />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <CheckCircle2 size={64} color="#bfff00" className="success-appear" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px rgba(191,255,0,0.5))' }} />
                  <h3 className="font-headline" style={{ fontSize: '2.2rem', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Inquiry Received!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '380px', margin: '0 auto', lineHeight: 1.4 }}>
                    Thank you. Sayan Som and the Motion Lab team will review your project brief and get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '2.5rem' }}>
                  <div className="section-tag">PROJECT INQUIRY  ☟</div>
                  <h3 className="font-headline" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em', fontWeight: 700 }}>
                    Project Brief Details
                  </h3>
                </div>

                <form onSubmit={handleSubmit}>
                  
                  {/* Floating Label Input: Name */}
                  <div className="form-group-floating">
                    <input 
                      type="text" 
                      required
                      placeholder=" " 
                      className="floating-input" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    <label className="floating-label">YOUR NAME</label>
                  </div>

                  {/* Floating Label Input: Email */}
                  <div className="form-group-floating">
                    <input 
                      type="email" 
                      required
                      placeholder=" " 
                      className="floating-input"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    <label className="floating-label">EMAIL ADDRESS</label>
                  </div>

                  {/* Service Chip Selection pills */}
                  <div className="form-group" style={{ marginBottom: '2.2rem' }}>
                    <label className="form-label">SERVICE NEEDED</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.5rem' }}>
                      {['3D Web Experience', 'Brand Identity', 'Web Architecture', 'Design System'].map((s) => {
                        const isSelected = formData.service === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setFormData({ ...formData, service: s })}
                            className={`chip-button ${isSelected ? 'active' : ''}`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Chip Selection pills */}
                  <div className="form-group" style={{ marginBottom: '2.2rem' }}>
                    <label className="form-label">ESTIMATED BUDGET</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.5rem' }}>
                      {['$5k - $10k', '$10k - $25k', '$25k - $50k', '$50k+'].map((b) => {
                        const isSelected = formData.budget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`chip-button ${isSelected ? 'active' : ''}`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Floating Label Textarea */}
                  <div className="form-group-floating" style={{ marginBottom: '2.5rem' }}>
                    <textarea 
                      rows={3}
                      required
                      placeholder=" " 
                      className="floating-input"
                      value={formData.message}
                      style={{ resize: 'none' }}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                    <label className="floating-label">PROJECT DETAILS (VISION, TIMELINE)</label>
                  </div>

                  <button type="submit" className="btn-primary">
                    SEND INQUIRY <Send size={16} />
                  </button>
                </form>
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
