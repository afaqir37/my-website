import React from 'react';
import { motion } from 'framer-motion';
import { fortyTwoIntro, fortyTwoProjects, fortyTwoStats } from '../data/content';

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const FortyTwoLogo = () => (
  <svg className="fortytwo-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134 94" fill="currentColor">
    <path d="M73.951 0H49.3007L0 49.3007V69.3496H49.3007V94H73.951V49.3007H24.6504L73.951 0Z"/>
    <path d="M84.5784 24.6503L109.229 0H84.5784V24.6503Z"/>
    <path d="M133.879 24.6503V0H109.229V24.6503L84.5784 49.3007V74.0606H109.229V49.3007L133.879 24.6503Z"/>
    <path d="M133.879 49.3008L109.228 74.0607H133.879V49.3008Z"/>
  </svg>
);

const LevelCard = ({ project }) => {
  const levelClasses = [
    'level',
    project.type === 'start' && 'start',
    project.type === 'end' && 'end',
    project.type === 'major' && 'major',
    project.type === 'final' && 'final',
  ].filter(Boolean).join(' ');

  const cardClasses = [
    'level-card',
    project.type === 'end' && 'end-card',
  ].filter(Boolean).join(' ');

  return (
    <div className={levelClasses}>
      <div className="level-marker">
        <div className="level-num">{project.num}</div>
        {project.type === 'final' && <span className="level-badge">FINAL</span>}
      </div>
      <div className={cardClasses}>
        {(project.phase || project.status) && (
          <div className="card-header">
            <span className="card-phase">{project.phase}</span>
            <span className="card-status">{project.status}</span>
          </div>
        )}
        <h4>
          {project.subjectPdf ? (
            <a href={project.subjectPdf} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h4>
        <p>{project.description}</p>
        {project.skills && project.skills.length > 0 && (
          <div className="card-skills">
            {project.skills.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        )}
        {project.outcome && (
          <div className="card-outcome">
            <span>{project.outcome}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const FortyTwo = () => {
  return (
    <section id="background" className="fortytwo">
      <div className="container">
        <motion.p
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Background
        </motion.p>
        <motion.div
          className="fortytwo-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="fortytwo-text">
            <p className="fortytwo-intro">{fortyTwoIntro}</p>
            <span className="scroll-hint">
              Scroll to explore
              <ArrowIcon />
            </span>
          </div>
          <FortyTwoLogo />
        </motion.div>
      </div>
      
      <div className="timeline-scroll-container">
        <div className="timeline-track">
          <div className="timeline-progress" />
          {fortyTwoProjects.map((project, index) => (
            <LevelCard key={index} project={project} />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="fortytwo-summary">
          {/* <p>
            {fortyTwoStats.map((stat, index) => (
              <span key={index}>
                {stat.value} {stat.label.toLowerCase()}
                {index < fortyTwoStats.length - 1 ? '. ' : '. '}
              </span>
            ))}
            From pointers to full-stack.
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default FortyTwo;
