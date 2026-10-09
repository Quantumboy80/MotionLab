import React from 'react';
import { Sun, Moon, ArrowUpRight } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme, onOpenContact }) {
  return (
    <nav className="navbar">
      <div className="brand-logo" onClick={() => setActiveTab('home')}>
        DESIGNELY <span className="year-tag">(2026)</span>
      </div>

      <ul className="nav-links">
        <li 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <span className="num">/01</span> Home
        </li>
        <li 
          className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <span className="num">/02</span> About
        </li>
        <li 
          className={`nav-item ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => setActiveTab('portfolio')}
        >
          <span className="num">/03</span> Work
        </li>
        <li 
          className="nav-item"
          onClick={onOpenContact}
        >
          <span className="num">/04</span> Contact
        </li>
      </ul>

      <div className="nav-actions">
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }} onClick={onOpenContact}>
          INQUIRE <ArrowUpRight size={16} />
        </button>
      </div>
    </nav>
  );
}
