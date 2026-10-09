import React from 'react';
import { ArrowDownRight, Sparkles, Compass } from 'lucide-react';
import BlobCanvas from './3D/BlobCanvas';

export default function Hero({ onOpenContact, onExploreWork, theme }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-header-badge">
          <span className="pulse-dot"></span>
          <span>AVAILABLE FOR SELECT COMMISSIONS — Q3/Q4</span>
        </div>

        <h1 className="hero-headline">
          Where the <span className="highlight-word">boring</span> ideas are swiped under the dust.
        </h1>

        <div className="hero-actions">
          <button className="btn-primary" onClick={onOpenContact}>
            PROJECT INQUIRY ☟
          </button>
          
          <button className="btn-secondary" onClick={onExploreWork}>
            VIEW PORTFOLIO <ArrowDownRight size={18} />
          </button>
        </div>
      </div>

      <div className="blob-canvas-wrapper">
        <BlobCanvas theme={theme} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4rem', zIndex: 10 }}>
        <div style={{ display: 'flex', gap: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <div><Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} /> 3D & INTERACTIVE DESIGN</div>
          <div><Compass size={14} style={{ display: 'inline', marginRight: '6px' }} /> BRAND IDENTITY & WEB ARCHITECTURE</div>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          DRAG TO ROTATE & DISTORT BLOB ✦
        </div>
      </div>
    </section>
  );
}
