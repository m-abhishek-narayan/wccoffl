import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [admin, setAdmin] = useState("");
  const navigate = useNavigate();

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
    sessionStorage.clear();
    setIsAuthenticated(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className={`navbar ${isNavOpen ? "navopened" : ""}`}>
      <div className="container">
        <div className="row">
          <h1 className="logo">
            <Link to="/" style={{ cursor: "pointer" }}>WCC</Link>
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
              <li><Link onClick={() => setIsNavOpen(false)} to="/login">Login</Link></li>
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
  );
}

export default Navbar;
