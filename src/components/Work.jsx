import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/content';

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
            <div key={index} className="stat">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
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