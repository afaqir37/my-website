import Nav from './Nav';
import { introText } from '../data/content';

const Header = () => {
  return (
    <header className="header">
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
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
