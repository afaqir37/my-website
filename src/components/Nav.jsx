import { personalInfo } from '../data/content';
import ThemeToggle from './ThemeToggle';

const HandDrawnUnderline = () => (
  <svg
    className="hand-drawn-underline"
    viewBox="0 0 120 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 5.5C12 3.5 22 6 32 4.5C42 3 52 5.5 62 4C72 2.5 82 5 92 3.5C102 2 112 4.5 118 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Nav = () => {
  return (
    <nav>
      <a href="#" className="nav-logo">
        <span>{personalInfo.name}</span>
        <HandDrawnUnderline />
      </a>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#background">Background</a>
        <a href="#contact">Contact</a>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Nav;
