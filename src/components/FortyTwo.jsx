import React from 'react';
import { fortyTwoIntro, fortyTwoProjects, fortyTwoStats } from '../data/content';

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
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
        <h4>{project.name}</h4>
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
        <p className="section-title">Background</p>
        <p className="fortytwo-intro">{fortyTwoIntro}</p>
        <span className="scroll-hint">
          Scroll to explore
          <ArrowIcon />
        </span>
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
