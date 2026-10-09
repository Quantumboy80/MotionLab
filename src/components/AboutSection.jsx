import React from 'react';
import { Award, Zap, Cpu, Flame } from 'lucide-react';

export default function AboutSection() {
  const skills = [
    '3D WebGL Development', 'Generative Shaders', 'Framer Motion', 
    'Brand Strategy', 'React & Next.js', 'Kinetic Typography', 
    'Design Systems', 'Micro-Interactions', 'Spatial Audio Visuals'
  ];

  return (
    <section className="section-container" id="about">
      <div className="section-title-wrap">
        <div>
          <div className="section-tag">MANIFESTO & CAPABILITIES</div>
          <h2 className="section-heading">About Designely</h2>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-text-content">
          <p>
            At <strong>Designely</strong>, we operate at the intersection of high-concept graphic design and real-time WebGL engineering. We believe that standard web templates dilute brand power.
          </p>
          <p>
            Our core mission is simple: <em>swipe boring, boilerplate ideas under the dust</em> and replace them with unforgettable digital artifacts that turn visitors into passionate brand advocates.
          </p>

          <div style={{ marginTop: '2.5rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              CAPABILITIES & STACK:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-strong)',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  ✦ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="stat-box-container">
          <div className="stat-card">
            <div className="stat-number">40+</div>
            <div className="stat-label">AWARDS & RECOGNITIONS</div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Framer Site of the Day, Awwwards Site of the Month, FWA of the Day.
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-number">60fps</div>
            <div className="stat-label">FLUID SHADER PERFORMANCE</div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              GPU-accelerated WebGL canvas rendering across desktop and mobile.
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">BESPOKE DISPERSION</div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Zero boilerplate. Every animation and noise algorithm is handcrafted.
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-number">2026</div>
            <div className="stat-label">VISION & BEYOND</div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Building tomorrow’s spatial web standards today.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
