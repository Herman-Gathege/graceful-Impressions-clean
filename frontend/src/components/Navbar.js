
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false); // ✅ Track navbar state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/login");
    setIsNavOpen(false); // ✅ Close navbar on logout
  };

  const handleNavLinkClick = () => {
    setIsNavOpen(false); // ✅ Close navbar when a link is clicked
  };

  const getUserInitials = () => {
    if (user && user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return "?";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" onClick={handleNavLinkClick}>
          <img
            src="/Frame 6.png"
            alt="Graceful Impressions Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)} // ✅ Toggle navbar state
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`} onClick={handleNavLinkClick}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/gallery" className={`nav-link ${location.pathname === "/gallery" ? "active" : ""}`} onClick={handleNavLinkClick}>
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/artists" className={`nav-link ${location.pathname === "/artists" ? "active" : ""}`} onClick={handleNavLinkClick}>
                Artists
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} onClick={handleNavLinkClick}>
                Contact Us
              </Link>
            </li>

            {isAuthenticated && user ? (
              <li className="nav-item dropdown">
                <button
                  className="btn nav-link dropdown-toggle"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "transparent",
                    border: "none",
                    color: "white",
                  }}
                >
                  <div className="avatar-circle">{getUserInitials()}</div>
                  My Profile
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                  <li>
                    <Link to="/profile" className="dropdown-item" onClick={handleNavLinkClick}>
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" onClick={handleNavLinkClick}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link" onClick={handleNavLinkClick}>
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
