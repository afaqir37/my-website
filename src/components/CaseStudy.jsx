import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { caseStudy } from '../data/content';
import '../styles/case-study.css';

const CaseStudy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatContent = (content) => {
    // Convert line breaks to paragraphs
    let html = content
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p)
      .map(p => {
        // Check if it's a list
        if (p.includes('• ')) {
          const items = p.split('• ').filter(i => i.trim());
          return '<ul>' + items.map(i => `<li>${i.trim()}</li>`).join('') + '</ul>';
        }
        return `<p>${p}</p>`;
      })
      .join('');
    
    return html;
  };

  return (
    <div className="case-study">
      <nav className="case-study-nav">
        <div className="container">
          <Link to="/" className="back-link">← Back</Link>
          <span className="case-study-nav-title">{caseStudy.title}</span>
        </div>
      </nav>

      <header className="case-study-header">
        <div className="container">
          <span className="case-study-label">Case Study</span>
          <h1>{caseStudy.title}</h1>
          <p className="case-study-subtitle">{caseStudy.subtitle}</p>
          <p className="case-study-role">{caseStudy.role}</p>
        </div>
      </header>

      <div className="case-study-body">
        <main className="case-study-main">
          <p className="case-study-intro-text">{caseStudy.intro}</p>

          {caseStudy.sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="case-study-section"
            >
              <span className="section-number">0{index + 1}</span>
              <h2>{section.title}</h2>
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: formatContent(section.content) }}
              />
            </section>
          ))}
        </main>
      </div>

      <footer className="case-study-footer">
        <div className="container">
          <div className="footer-cta">
            <p>Interested in working together?</p>
            <Link to="/#contact">Get in touch</Link>
          </div>
          <Link to="/" className="back-link">← Back to home</Link>
        </div>
      </footer>
    </div>
  );
};

export default CaseStudy;