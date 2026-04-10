import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Pizza House</h1>
          <p>Fresh ingredients. Handcrafted with love. Since 1998.</p>
          <div className="hero-btns">
            <Link to="/menu" className="btn-primary">View Menu</Link>
            <Link to="/menu" className="btn-outline">Order Online</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature">
          <span>🔥</span>
          <h3>Stone Fired</h3>
          <p>Every pizza baked in our 900°F stone oven for the perfect crust</p>
        </div>
        <div className="feature">
          <span>🌿</span>
          <h3>Fresh Ingredients</h3>
          <p>Locally sourced produce delivered fresh every morning</p>
        </div>
        <div className="feature">
          <span>🚴</span>
          <h3>Fast Delivery</h3>
          <p>Hot pizza delivered to your door in 30 minutes or less</p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>Join Our VIP Club</h2>
        <p>Get exclusive deals, early access to new menu items, and a free pizza on your birthday.</p>
        <button className="btn-primary">Sign Up Free</button>
      </section>

      {/* Info strip */}
      <section className="info-strip">
        <div className="info-box">
          <h4>📍 Location</h4>
          <p>1234 Main Street<br />Sacramento, CA 95814</p>
        </div>
        <div className="info-box">
          <h4>🕐 Hours</h4>
          <p>Mon–Thu: 11am – 10pm<br />Fri–Sun: 11am – 11pm</p>
        </div>
        <div className="info-box">
          <h4>📞 Contact</h4>
          <p>(916) 555-0199<br />info@pizzahouse.com</p>
        </div>
      </section>
    </div>
  );
}
