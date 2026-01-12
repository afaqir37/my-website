import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { caseStudy } from '../data/content';
import '../styles/case-study.css';

const CaseStudy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderSection = (section) => {
    return (
      <>
        {section.intro && <p className="section-intro">{section.intro}</p>}

        {section.approach && (
          <div className="section-block">
            <p className="block-label">The approach</p>
            <p>{section.approach}</p>
          </div>
        )}

        {section.problem && (
          <div className="section-block problem-block">
            <p className="block-label">The problem</p>
            <p>{section.problem}</p>
          </div>
        )}

        {section.solution && (
          <div className="section-block solution-block">
            <p className="block-label">The solution</p>
            <p>{section.solution}</p>
          </div>
        )}

        {section.fix && (
          <div className="section-block solution-block">
            <p className="block-label">The fix</p>
            <p>{section.fix}</p>
          </div>
        )}

        {section.highlights && (
          <ul className="highlights-list">
            {section.highlights.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        {section.solutionDetails && (
          <ul className="highlights-list">
            {section.solutionDetails.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        {section.description && <p className="section-description">{section.description}</p>}

        {section.note && <p className="section-note">{section.note}</p>}

        {section.models && (
          <div className="models-grid">
            {section.models.map((model, i) => (
              <div key={i} className="model-item">
                <strong>{model.name}</strong> — {model.description}
              </div>
            ))}
          </div>
        )}

        {section.categories && (
          <div className="categories">
            {section.categories.map((cat, i) => (
              <div key={i} className="category-block">
                <p className="category-name">{cat.name}</p>
                <ul className="highlights-list">
                  {cat.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {section.lessons && (
          <div className="lessons-list">
            {section.lessons.map((lesson, i) => (
              <div key={i} className="lesson-item">
                <p className="lesson-takeaway">{lesson.takeaway}</p>
                <p className="lesson-detail">{lesson.detail}</p>
              </div>
            ))}
          </div>
        )}

        {section.improvements && (
          <div className="section-block">
            <p className="block-label">What I'd do differently</p>
            <ul className="highlights-list">
              {section.improvements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {section.result && (
          <p className="section-result">
            <strong>Result:</strong> {section.result}
          </p>
        )}
      </>
    );
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
          <div className="case-study-title-container">
            <h1>{caseStudy.title}</h1>
            <img
              src="/assets/logo-dark.png"
              alt="WashMinute Logo"
              className="case-study-logo"
              loading="lazy"
              decoding="async"
            />
          </div>
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
              <div className="section-content">
                {renderSection(section)}
              </div>
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