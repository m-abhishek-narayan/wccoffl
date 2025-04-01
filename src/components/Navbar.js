import { useState, useEffect } from "react";
import { Link } from "react-scroll";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showGoTop, setShowGoTop] = useState(false);

  // Handle scroll events for showing the "Go to Top" button and navbar animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768 && window.scrollY > 690) {
        setShowGoTop(true);
      } else if (window.innerWidth > 768 && window.scrollY > 220) {
        setShowGoTop(true);
      } else {
        setShowGoTop(false);
      }
    };

    // Event listener for scrolling
    window.addEventListener("scroll", handleScroll);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <nav className={`navbar ${isNavOpen ? "navopened" : ""}`}>
      <div className="container">
        <div className="row">
          <h1 className="logo">
            <Link
              spy={true}
              smooth={true}
              duration={1000}
              to="headerbg"
              style={{ cursor: "pointer" }}
            >
              WCC
            </Link>
          </h1>

          {/* Navigation Bar */}
          <ul className={`bar ${isNavOpen ? "opened" : ""}`}>
            <li>
              <Link onClick={toggleNav} activeClass="active" spy={true} smooth={true} duration={1000} to="home">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={toggleNav} activeClass="active" spy={true} smooth={true} duration={1000} to="profile">
                Profile
              </Link>
            </li>
            <li>
              <Link onClick={toggleNav} activeClass="active" spy={true} smooth={true} duration={1000} to="gallery">
                Gallery
              </Link>
            </li>
            <li>
              <Link onClick={toggleNav} activeClass="active" spy={true} smooth={true} duration={1000} to="awards">
                Kava Awards
              </Link>
            </li>
            <li>
              <Link onClick={toggleNav} activeClass="active" spy={true} smooth={true} duration={1000} to="chats">
                Discussions
              </Link>
            </li>
          </ul>

          {/* Burger Icon */}
          <div className="button" onClick={toggleNav}>
            <div className="burger"></div>
            <div className="burger"></div>
            <div className="burger"></div>
          </div>
        </div>
      </div>

      {/* "Go to Top" Button */}
      {showGoTop && (
        <div className="gotop">
          <a href="#headerbg">
            <span>↑</span>
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
