import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar({ onCartOpen }) {
  const { itemCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
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
      </div>
    </nav>
  );
}
