import { personalInfo } from '../data/content';
import ThemeToggle from './ThemeToggle';

const Nav = () => {
  return (
    <nav>
      <a href="#" className="nav-logo">
        <span>{personalInfo.name}</span>
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
