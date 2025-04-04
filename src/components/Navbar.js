import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginRegister from "./LoginRegister";

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
    // navigate("/");
    window.location.reload();
  };

  return (
    <>
    <nav className={`navbar ${isNavOpen ? "navopened" : ""}`}>
      <div className="container">
        <div className="row">
          <h1 className="logo">
            <Link to="/" style={{ cursor: "pointer" }}>WCC-The Kavaliers Den</Link>
          </h1>

          <ul className={`bar ${isNavOpen ? "opened" : ""}`}>
            <li><Link onClick={() => setIsNavOpen(false)} to="/">Home</Link></li>
            <li><Link onClick={() => setIsNavOpen(false)} to="/teams">Series</Link></li>
            <li><Link onClick={() => setIsNavOpen(false)} to="/profile_page">Profile Search</Link></li>
            <li><Link onClick={() => setIsNavOpen(false)} to="/awards">Kava Awards</Link></li>
            {isAuthenticated ? (
                <>
                  <li><Link onClick={() => setIsNavOpen(false)} to="/chat">Discussions</Link></li>
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
            <span className="close-btn" onClick={() => setShowLoginModal(false)}>❌</span>
            <LoginRegister onClose={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
