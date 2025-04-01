import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <nav className={`navbar ${isNavOpen ? "navopened" : ""}`}>
      <div className="container">
        <div className="row">
          <h1 className="logo">
            <Link to="/" style={{ cursor: "pointer" }}>WCC</Link>
          </h1>

          {/* Navigation Bar */}
          <ul className={`bar ${isNavOpen ? "opened" : ""}`}>
            <li><Link onClick={toggleNav} to="/">Home</Link></li>
            <li><Link onClick={toggleNav} to="/teams">Series</Link></li>
            <li><Link onClick={toggleNav} to="/awards">Kava Awards</Link></li>
            <li><Link onClick={toggleNav} to="/chat">Discussions</Link></li>
          </ul>

          {/* Burger Icon */}
          <div className="button" onClick={toggleNav}>
            <div className="burger"></div>
            <div className="burger"></div>
            <div className="burger"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
