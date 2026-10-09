import React, { useState } from 'react';
import { ArrowUpRight, Filter, Eye } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'Aura Spatial OS',
    category: '3D Web Experience / Vision',
    year: '2026',
    description: 'Immersive spatial interface designed for next-generation web headsets, featuring real-time WebGL shader interactions.',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #556270 100%)',
    tags: ['WebGL', 'Three.js', 'UI/UX']
  },
  {
    id: 2,
    title: 'Chronos Digital Asset',
    category: 'Fintech Brand & Architecture',
    year: '2025',
    description: 'Complete brand overhaul and Web3 liquidity platform with fluid micro-interactions and dark-mode elegance.',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    tags: ['Branding', 'Design System', 'React']
  },
  {
    id: 3,
    title: 'Kinetix Studio',
    category: 'Interactive E-Commerce',
    year: '2026',
    description: 'High-fashion digital flagship featuring 3D product customizer, custom kinetic typography, and instant checkout.',
    gradient: 'linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)',
    tags: ['E-Commerce', '3D Modeling', 'Framer']
  },
  {
    id: 4,
    title: 'Neura AI Engine',
    category: 'Generative AI Platform',
    year: '2026',
    description: 'SaaS dashboard for real-time generative canvas workflows with customizable node pipelines.',
    gradient: 'linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%)',
    tags: ['AI Interface', 'SaaS', 'Web App']
  },
  {
    id: 5,
    title: 'Vespera Sound',
    category: 'Spatial Audio Brand',
    year: '2025',
    description: 'Minimalist audio engineering identity with generative wave acoustics and interactive frequency visualizer.',
    gradient: 'linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)',
    tags: ['Web Audio', 'Identity', 'Motion']
  },
  {
    id: 6,
    title: 'Sublime Studio',
    category: 'Architectural Portfolio',
    year: '2026',
    description: 'Ultra-clean architectural showcase with smooth page transitions and high-resolution spatial reveals.',
    gradient: 'linear-gradient(135deg, #495057 0%, #212529 100%)',
    tags: ['Architecture', 'Editorial', 'CSS Art']
  }
];

export default function PortfolioGrid({ onSelectProject }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', '3D Web Experience', 'Branding', 'AI Interface', 'E-Commerce'];

  const filteredProjects = selectedFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.includes(selectedFilter) || p.tags.includes(selectedFilter));

  return (
    <section className="section-container" id="work">
      <div className="section-title-wrap">
        <div>
          <div className="section-tag">SELECTED WORKS (2025 - 2026)</div>
          <h2 className="section-heading">Featured Projects</h2>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              style={{
                background: selectedFilter === cat ? 'var(--text-primary)' : 'transparent',
                color: selectedFilter === cat ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: '1px solid var(--border-strong)',
                padding: '0.5rem 1rem',
                borderRadius: '30px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="portfolio-grid">
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => onSelectProject(project)}
          >
            <div className="project-image-wrap" style={{ background: project.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                color: 'white',
                fontFamily: 'var(--font-headline)',
                fontSize: '1.5rem',
                fontWeight: 800,
                textAlign: 'center',
                padding: '1rem',
                textShadow: '0 4px 10px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em'
              }}>
                {project.title}
              </div>
            </div>

            <div className="project-info">
              <div>
                <div className="project-title">{project.title}</div>
                <div className="project-category">{project.category} — {project.year}</div>
              </div>

              <div className="project-arrow-icon">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
