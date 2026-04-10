import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">🍕 Pizza House</span>
          <p>Handcrafted pizza made with love since 1998.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About Us</Link>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>1234 Main Street, Sacramento, CA</p>
          <p>(916) 555-0199</p>
          <p>info@pizzahouse.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Pizza House. All rights reserved.</p>
      </div>
    </footer>
  );
}
