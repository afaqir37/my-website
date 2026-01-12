import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const Project = ({ project }) => {
  return (
    <motion.article
      className="project"
      variants={projectVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {project.logo && (
        <img
          src={project.logo}
          alt={`${project.title} logo`}
          className="project-logo"
          loading="lazy"
          decoding="async"
        />
      )}
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
        <div className="project-challenges">
          <p className="challenges-label">Technical Challenges</p>
          {project.challenges.map((challenge, index) => (
            <div key={index} className="challenge-teaser">
              <h3>{challenge.title}</h3>
              <p>{challenge.hook}</p>
            </div>
          ))}
        </div>
      )}

      <p className="tech-list">{project.tech}</p>

      {project.caseStudyLink && (
        <Link to={project.caseStudyLink} className="case-study-link">
          Read full case study →
        </Link>
      )}
    </motion.article>
  );
};

const Work = () => {
  return (
    <section id="work">
      <div className="container">
        <motion.p
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Selected Work
        </motion.p>
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Work;