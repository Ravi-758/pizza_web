import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">🍕 <span>MGC</span> Pizza</div>
          <p>Rohtak's most loved stone-fired pizza restaurant. Handcrafted with fresh ingredients and served with love since 2015.</p>
          <div className="footer-contact-inline">
            <span>📞 +91 98765 43210</span>
            <span>📧 info@mgcpizza.com</span>
          </div>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/menu">Our Menu</Link>
          <Link to="/about">About Us</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div className="footer-info">
          <h4>Visit Us</h4>
          <p>📍 Shop No. 12, Sector 14<br />Rohtak, Haryana 124001</p>
          <p>🕐 Mon–Thu: 11am – 10:30pm<br />Fri–Sun: 11am – 11:30pm</p>
        </div>
        <div className="footer-delivery">
          <h4>Delivery Info</h4>
          <p>🛵 Free delivery above ₹499</p>
          <p>⏱️ 30 min guaranteed</p>
          <p>📍 Within 5km radius</p>
          <p>💳 Cash & online accepted</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 <span>MGC Pizza</span> — Rohtak, Haryana. All rights reserved. Made with ❤️ and 🍕</p>
      </div>
    </footer>
  );
}
