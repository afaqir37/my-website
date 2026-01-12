import Nav from './Nav';
import { introText } from '../data/content';

const Header = () => {
  return (
    <header className="header">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="container container--wide">
        <Nav />
        <div className="intro-wrapper">
          <div className="intro">
            <h1 dangerouslySetInnerHTML={{ __html: introText.headline }} />
            <p className="intro-description" dangerouslySetInnerHTML={{ __html: introText.description }} />
          </div>
          <div className="intro-portrait">
            <img
              src="/assets/self-portrait_1998.74.5.jpg"
              alt="Abdellah Faqir"
              width="240"
              height="320"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
