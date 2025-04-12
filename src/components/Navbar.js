import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import "./Navbar.css";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [admin, setAdmin] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("username");
    const admin = sessionStorage.getItem("admin");
    if (token && user && admin) {
      setIsAuthenticated(true);
      setUsername(user);
      setAdmin(admin);
    }
  }, []);

  const handleLogout = () => {
    window.scrollTo(0, 0);
    sessionStorage.clear();
    setIsAuthenticated(false);
    window.location.reload();
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <>
      <nav className={`navbar ${isNavOpen ? "navopened" : ""}`}>
        <div className="container">
          <div className="row">
            <h1 className="logo">
              <Link to="/" style={{ cursor: "pointer" }}>
                <img src="/img/wcc.png" alt="WCC Logo" className="logo-img" />
                <span>The Kavaliers Den</span>
              </Link>
            </h1>

            <ul className={`bar ${isNavOpen ? "opened" : ""}`}>
              <li><Link className={isActive("/")} to="/" onClick={() => setIsNavOpen(false)}>Home</Link></li>
              <li><Link className={isActive("/teams")} to="/teams" onClick={() => setIsNavOpen(false)}>Series</Link></li>
              <li><Link className={isActive("/profile_page")} to="/profile_page" onClick={() => setIsNavOpen(false)}>Profile Search</Link></li>
              <li><Link className={isActive("/awards")} to="/awards" onClick={() => setIsNavOpen(false)}>Kava Awards</Link></li>
              {isAuthenticated ? (
                <>
                  <li><Link className={isActive("/chat")} to="/chat" onClick={() => setIsNavOpen(false)}>Discussions</Link></li>
                  <li><button onClick={handleLogout} className="logout-button">Logout ({username})</button></li>
                </>
              ) : (
                <li>
                  <button onClick={() => setShowLoginModal(true)} className="login-btn">Login</button>
                </li>
              )}
            </ul>

            <div className="button" onClick={() => setIsNavOpen((prev) => !prev)}>
              <div className="burger"></div>
              <div className="burger"></div>
              <div className="burger"></div>
            </div>
          </div>
        </div>
      </nav>

      {showLoginModal && (
        <div className="login-modal-overlay">
          <div className="login-modal">
            <span className="close-nav-btn" onClick={() => setShowLoginModal(false)}>❌</span>
            <LoginRegister onClose={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
