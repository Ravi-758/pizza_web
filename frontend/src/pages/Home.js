import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">⭐ #1 Rated Pizza in Rohtak</div>
          <h1>Welcome to <span>MGC Pizza</span></h1>
          <p>Authentic stone-fired pizzas crafted with love, fresh local ingredients, and family recipes passed down through generations.</p>
          <div className="hero-btns">
            <Link to="/menu" className="btn-primary">🍕 Order Now</Link>
            <Link to="/about" className="btn-outline">Our Story</Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><strong>500+</strong><span>Happy Customers</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>25+</strong><span>Pizza Varieties</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>30 min</strong><span>Fast Delivery</span></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature">
          <div className="feature-icon">🔥</div>
          <h3>Stone Fired Oven</h3>
          <p>Every pizza baked at 900°F in our authentic stone oven for the perfect crispy crust</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🌿</div>
          <h3>Fresh Ingredients</h3>
          <p>Locally sourced vegetables and premium quality toppings delivered fresh every day</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🚴</div>
          <h3>Fast Delivery</h3>
          <p>Hot and fresh pizza delivered to your doorstep in 30 minutes or less, guaranteed</p>
        </div>
        <div className="feature">
          <div className="feature-icon">👨‍🍳</div>
          <h3>Expert Chefs</h3>
          <p>Our trained chefs bring authentic Italian and Indian fusion recipes to every pie</p>
        </div>
      </section>

      {/* Why Us */}
      <section className="why-section">
        <div className="why-text">
          <div className="section-tag">Why Choose MGC Pizza?</div>
          <h2>More Than Just Pizza —<br />It's an Experience</h2>
          <p>Since 2015, MGC Pizza has been serving Rohtak's finest handcrafted pizzas. We believe every meal should be special, which is why we never compromise on quality, freshness, or taste.</p>
          <ul className="why-list">
            <li>✅ 100% fresh ingredients — absolutely no frozen toppings</li>
            <li>✅ Handmade dough prepared fresh every single morning</li>
            <li>✅ Over 25 signature pizza varieties to choose from</li>
            <li>✅ Veg, non-veg, and Jain options available</li>
            <li>✅ Hygienic kitchen with food safety certification</li>
            <li>✅ Free delivery on orders above ₹499</li>
          </ul>
          <Link to="/menu" className="btn-primary">Explore Our Menu →</Link>
        </div>
        <div className="why-image">
          <div className="why-img-box">
            <div className="why-img-inner">
              <span>🍕</span>
              <p>Handcrafted with Love</p>
            </div>
          </div>
          <div className="floating-badge badge-1">⭐ 4.8/5 Rating</div>
          <div className="floating-badge badge-2">🏆 Best Pizza 2024</div>
        </div>
      </section>

      {/* Popular Items Preview */}
      <section className="popular-section">
        <div className="section-tag" style={{ textAlign: 'center' }}>Our Bestsellers</div>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 800, marginBottom: '40px' }}>Most Loved Pizzas</h2>
        <div className="popular-grid">
          {[
            { name: 'Margherita Classic', desc: 'Fresh mozzarella, tomato sauce, basil', price: '₹299', emoji: '🍕', tag: 'Bestseller' },
            { name: 'Paneer Tikka', desc: 'Marinated paneer, capsicum, onion, BBQ sauce', price: '₹349', emoji: '🌶️', tag: 'Veg Special' },
            { name: 'Chicken BBQ', desc: 'Grilled chicken, BBQ sauce, red onions', price: '₹399', emoji: '🍗', tag: 'Non-Veg' },
            { name: 'Farmhouse', desc: 'Mixed veggies, corn, olives, mushrooms', price: '₹329', emoji: '🥦', tag: 'Healthy' },
          ].map((item, i) => (
            <div className="popular-card" key={i}>
              <div className="popular-card-emoji">{item.emoji}</div>
              <span className="popular-tag">{item.tag}</span>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <div className="popular-footer">
                <span className="popular-price">{item.price}</span>
                <Link to="/menu" className="popular-btn">Order Now</Link>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/menu" className="btn-primary">View Full Menu →</Link>
        </div>
      </section>

      {/* VIP Banner */}
      <section className="vip-banner">
        <div className="vip-inner">
          <div className="vip-text">
            <h2>🎉 Join MGC Pizza VIP Club</h2>
            <p>Get exclusive deals, early access to new menu items, birthday surprises, and a <strong>FREE pizza</strong> on your special day!</p>
            <Link to="/signup" className="btn-primary">Sign Up Free — It's Worth It!</Link>
          </div>
          <div className="vip-perks">
            <div className="perk">🎂 Free birthday pizza</div>
            <div className="perk">💰 Exclusive member discounts</div>
            <div className="perk">🚀 Early access to new items</div>
            <div className="perk">🎁 Surprise rewards</div>
          </div>
        </div>
      </section>

      {/* Info Strip */}
      <section className="info-strip">
        <div className="info-box">
          <div className="info-icon">📍</div>
          <h4>Find Us</h4>
          <p>Shop No. 12, Sector 14<br />Rohtak, Haryana 124001</p>
        </div>
        <div className="info-box">
          <div className="info-icon">🕐</div>
          <h4>Working Hours</h4>
          <p>Mon–Thu: 11am – 10:30pm<br />Fri–Sun: 11am – 11:30pm</p>
        </div>
        <div className="info-box">
          <div className="info-icon">📞</div>
          <h4>Call Us</h4>
          <p>+91 98765 43210<br />+91 01262 123456</p>
        </div>
        <div className="info-box">
          <div className="info-icon">🛵</div>
          <h4>Delivery</h4>
          <p>Free above ₹499<br />Within 5km radius</p>
        </div>
      </section>

    </div>
  );
}
