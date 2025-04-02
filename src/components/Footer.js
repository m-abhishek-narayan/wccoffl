import { animateScroll as scroll } from "react-scroll";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Left Side Content */}
          <div className="side1">
          <h1 className="logo">
            <Link to="/" style={{ cursor: "pointer" }}>WCC</Link>
          </h1>
            <p className="footer-text">Thank you for Visiting</p>
          </div>

          {/* Right Side Content */}
          <div className="side2">
            <p className="footer-title">Important Links</p>
            <ul className="footer-links">
              <li>
                <Link spy={true} smooth={true} duration={1000} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/teams" spy={true} smooth={true} duration={1000}>
                Series
                </Link>
              </li>
              <li>
                <Link to="/profile_page" spy={true} smooth={true} duration={1000}>
                Profile Search
                </Link>
              </li>
              <li>
                <Link to="/awards" spy={true} smooth={true} duration={1000}>
                 Kava Awards
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
