import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ currentPage, navigate }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Explore", page: "home" },
    { label: "Start a Campaign", page: "create" },
    ...(user ? [{ label: "Dashboard", page: "dashboard" }] : []),
  ];

  const handleLogout = () => {
    logout();
    navigate("home");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <button className="nav-logo" onClick={() => navigate("home")}>
          <span className="logo-icon">◈</span>
          <span className="logo-text">Fund<em>forge</em></span>
        </button>

        {/* Desktop nav */}
        <div className="nav-links">
          {navLinks.map(link => (
            <button
              key={link.page}
              className={`nav-link ${currentPage === link.page ? "nav-link--active" : ""}`}
              onClick={() => navigate(link.page)}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Auth area */}
        <div className="nav-auth">
          {user ? (
            <div className="nav-user">
              <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
              <span className="user-name">{user.name.split(" ")[0]}</span>
              <button className="btn-ghost" onClick={handleLogout}>Sign out</button>
            </div>
          ) : (
            <div className="nav-auth-btns">
              <button className="btn-ghost" onClick={() => navigate("login")}>Sign in</button>
              <button className="btn-primary" onClick={() => navigate("create")}>
                Launch Campaign
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`ham-line ${menuOpen ? "open" : ""}`}></span>
          <span className={`ham-line ${menuOpen ? "open" : ""}`}></span>
          <span className={`ham-line ${menuOpen ? "open" : ""}`}></span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(link => (
            <button key={link.page} className="mobile-link" onClick={() => { navigate(link.page); setMenuOpen(false); }}>
              {link.label}
            </button>
          ))}
          {user ? (
            <button className="mobile-link mobile-link--danger" onClick={handleLogout}>Sign out</button>
          ) : (
            <button className="mobile-link mobile-link--accent" onClick={() => { navigate("login"); setMenuOpen(false); }}>
              Sign in
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
