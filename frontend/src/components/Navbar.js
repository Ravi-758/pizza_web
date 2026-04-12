import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar({ onCartOpen }) {
  const { itemCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); setMenuOpen(false); };
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-emoji">🍕</span>
          <span className="logo-text">
            <span className="logo-mgc">MGC</span>
            <span className="logo-pizza"> Pizza</span>
          </span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/menu" className={location.pathname === '/menu' ? 'active' : ''}>Menu</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
        </div>

        <div className="navbar-right">
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">👋 {user.name.split(' ')[0]}</span>
              {isAdmin() && <Link to="/admin" className="admin-panel-btn">🛠 Admin</Link>}
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="login-link">Login / Sign Up</Link>
              <Link to="/admin-login" className="admin-login-btn">🔐 Admin</Link>
            </div>
          )}
          <button className="cart-btn" onClick={onCartOpen}>
            🛒 {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          <Link to="/menu" onClick={() => setMenuOpen(false)}>🍕 Menu</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>ℹ️ About</Link>
          {user ? (
            <>
              {isAdmin() && <Link to="/admin" onClick={() => setMenuOpen(false)}>🛠 Admin Panel</Link>}
              <button onClick={handleLogout}>🚪 Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>👤 Login / Sign Up</Link>
              <Link to="/admin-login" onClick={() => setMenuOpen(false)}>🔐 Admin Login</Link>
            </>
          )}
        </div>
      )}
    </>
  );
}