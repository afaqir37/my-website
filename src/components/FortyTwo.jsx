import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fortyTwoIntro, fortyTwoProjects, fortyTwoStats } from '../data/content';
import { ActivityCalendar } from 'react-activity-calendar';

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
    (project.subjectPdf || project.type === 'start') && 'clickable-card',
  ].filter(Boolean).join(' ');

  // Determine the link URL
  const cardLink = project.type === 'start'
    ? 'https://42.fr/admissions/42-piscine/'
    : project.subjectPdf;

  const cardContent = (
    <>
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
    </>
  );

  return (
    <div className={levelClasses}>
      <div className="level-marker">
        <div className="level-num">{project.num}</div>
        {project.type === 'final' && <span className="level-badge">FINAL</span>}
      </div>
      {cardLink ? (
        <a
          href={cardLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClasses}
          aria-label={`View ${project.name} details`}
        >
          {cardContent}
        </a>
      ) : (
        <div className={cardClasses}>
          {cardContent}
        </div>
      )}
    </div>
  );
};

const FortyTwo = () => {
  const [theme, setTheme] = useState('dark');
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect theme from document
    const detectTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setTheme(currentTheme === 'light' ? 'light' : 'dark');
    };

    detectTheme();

    // Listen for theme changes
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Detect if mobile screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (isMobile) {
      const container = document.querySelector('.timeline-track');
      const card = container?.children[index + 1]; // +1 to skip progress bar
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handleScroll = (e) => {
    if (!isMobile) return;

    const container = e.target;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.querySelector('.level')?.offsetWidth || 0;
    const newSlide = Math.round(scrollLeft / cardWidth);

    if (newSlide !== currentSlide && newSlide >= 0 && newSlide < fortyTwoProjects.length) {
      setCurrentSlide(newSlide);
    }
  };

  useEffect(() => {
    // Fetch GitHub contribution data
    const fetchGitHubData = async () => {
      try {
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/afaqir37?y=last');
        const data = await response.json();

        // Transform data to format expected by react-activity-calendar
        const formattedData = data.contributions.map(day => ({
          date: day.date,
          count: day.count,
          level: day.level
        }));

        setGithubData(formattedData);
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

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
      
      <div className="timeline-scroll-container" onScroll={handleScroll}>
        <div className="timeline-track">
          <div className="timeline-progress" />
          {fortyTwoProjects.map((project, index) => (
            <LevelCard key={index} project={project} />
          ))}
        </div>
      </div>

      {/* Pagination dots for mobile carousel */}
      {isMobile && (
        <div className="carousel-pagination">
          {fortyTwoProjects.map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}

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

      {/* GitHub Activity - Full Width */}
      <motion.div
        className="github-activity"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container">
          <h3 className="github-activity-title">Recent Activity</h3>
        </div>
        {loading ? (
          <div className="container">
            <div className="github-loading">Loading contribution graph...</div>
          </div>
        ) : githubData ? (
          <div className="github-calendar-wrapper">
            <ActivityCalendar
              data={githubData}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
              }}
              colorScheme={theme}
              blockSize={11}
              blockMargin={4}
              fontSize={14}
              hideColorLegend
              showWeekdayLabels
            />
          </div>
        ) : (
          <div className="container">
            <div className="github-error">Failed to load GitHub activity</div>
          </div>
        )}
        <div className="container">
          <a
            href="https://github.com/afaqir37"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            View GitHub profile →
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default FortyTwo;
