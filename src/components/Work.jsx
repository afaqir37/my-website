import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/content';

const CountUpStat = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Extract numeric part
          const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
          const suffix = value.replace(/[0-9]/g, '');

          let start = 0;
          const duration = 1500;
          const increment = numericValue / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start) + suffix);
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => {
      if (statRef.current) {
        observer.unobserve(statRef.current);
      }
    };
  }, [value, hasAnimated]);

  return (
    <div ref={statRef} className="stat">
      <span className="stat-value">{count || value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

const Project = ({ project }) => {
  return (
    <article className="project">
      <h2>{project.title}</h2>
      <p className="project-meta">{project.meta}</p>

      <p
        className="project-description"
        dangerouslySetInnerHTML={{ __html: project.description }}
      />

      {project.stats && (
        <div className="stats">
          {project.stats.map((stat, index) => (
            <CountUpStat key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      )}

      {project.intro && (
        <p className="project-intro">{project.intro}</p>
      )}

      {project.challenges && (
        <div className="project-details">
          {project.challenges.map((challenge, index) => (
            <React.Fragment key={index}>
              <h3>{challenge.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: challenge.text }} />
            </React.Fragment>
          ))}
        </div>
      )}

      <p className="tech-list">{project.tech}</p>

      {project.caseStudyLink && (
        <Link to={project.caseStudyLink} className="case-study-link">
          Read the full case study →
        </Link>
      )}
    </article>
  );
};

const Work = () => {
  return (
    <section id="work">
      <div className="container">
        <p className="section-title">Selected Work</p>
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Work;