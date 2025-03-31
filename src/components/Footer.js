import { Link, animateScroll as scroll } from "react-scroll";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Left Side Content */}
          <div className="side1">
            <h1 className="logo">WCC</h1>
            <p className="footer-text">Thank you for Visiting</p>
          </div>

          {/* Right Side Content */}
          <div className="side2">
            <p className="footer-title">Important Links</p>
            <ul className="footer-links">
              <li>
                <Link spy={true} smooth={true} duration={1000} to="headerbg">
                  Home
                </Link>
              </li>
              <li>
                <Link to="profile" spy={true} smooth={true} duration={1000}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="gallery" spy={true} smooth={true} duration={1000}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="awards" spy={true} smooth={true} duration={1000}>
                  Awards
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Go to Top Button */}
      <button
        onClick={() => scroll.scrollToTop(2500)}
        className="gotop"
        aria-label="Go to top"
      >
        ⬆️
      </button>
    </footer>
  );
}

export default Footer;
