import React from "react";
import { Link, useNavigate } from "react-router-dom";

function PublicLayout({ children }) {
  const navigate = useNavigate();
  const storedAuth = localStorage.getItem("stockPortfolioAuth");
  const auth = storedAuth ? JSON.parse(storedAuth) : null;

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;
    
    localStorage.removeItem("stockPortfolioAuth");
    navigate("/");
  };

  return (
    <div className="app-shell">
      <nav className="site-nav">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            📈 Stock Portfolio
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/career">Careers</Link>
            <Link to="/help">Help</Link>
            {auth ? (
              <Link to="/dashboard" className="nav-link-primary">
                Dashboard
              </Link>
            ) : (
              <Link to="/auth" className="nav-link-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="page-body">
        {children}
      </main>
      <footer className="site-footer">
        <div className="footer-content">
          <p>&copy; 2024 Stock Portfolio Management. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/contact">Contact</Link>
            <Link to="/career">Careers</Link>
            <Link to="/help">Help</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LoggedInPublicLayout({ user, onLogout, children }) {
  return (
    <div className="app-shell">
      <nav className="site-nav">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            📈 Stock Portfolio
          </Link>
          <div className="nav-meta">
            <span className="nav-user-name">
              {user?.fullName || user?.username}
            </span>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/career">Careers</Link>
            <Link to="/help">Help</Link>
            <Link to="/dashboard" className="nav-link-primary">
              Dashboard
            </Link>
            <button className="nav-logout-btn" type="button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="page-body">
        {children}
      </main>
      <footer className="site-footer">
        <div className="footer-content">
          <p>&copy; 2024 Stock Portfolio Management. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/contact">Contact</Link>
            <Link to="/career">Careers</Link>
            <Link to="/help">Help</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AuthenticatedLayout({ user, onLogout, children }) {
  return (
    <div className="app-shell">
      <main className="page-body">
        {children}
      </main>
    </div>
  );
}

export { PublicLayout, LoggedInPublicLayout, AuthenticatedLayout };
