import './About.css';

export default function About() {
  return (
    <div className="about-page">

      <div className="about-hero">
        <div className="about-hero-content">
          <div className="about-tag">Our Story</div>
          <h1>Crafting Perfect Pizzas<br />Since <span>2015</span></h1>
          <p>From a small kitchen in Rohtak to the city's most beloved pizza destination</p>
        </div>
      </div>

      <div className="about-story">
        <div className="story-text">
          <h2>Where It All Began</h2>
          <p>MGC Pizza was born in 2015 from a simple dream — to bring authentic, stone-fired pizza to Rohtak. Our founder, passionate about Italian cuisine and Indian flavors, started with just one stone oven and a handful of recipes.</p>
          <p>What began as a small takeaway corner quickly grew into one of Haryana's most loved pizza restaurants, thanks to our uncompromising commitment to quality and the warmth we put into every single pizza we make.</p>
          <p>Today, MGC Pizza serves hundreds of happy customers every day, but our values remain the same — fresh ingredients, handcrafted with love, served with a smile.</p>
        </div>
        <div className="story-stats">
          <div className="story-stat">
            <span>2015</span>
            <p>Founded in Rohtak</p>
          </div>
          <div className="story-stat">
            <span>500+</span>
            <p>Happy customers daily</p>
          </div>
          <div className="story-stat">
            <span>25+</span>
            <p>Pizza varieties</p>
          </div>
          <div className="story-stat">
            <span>4.8⭐</span>
            <p>Average rating</p>
          </div>
        </div>
      </div>

      <div className="about-values">
        <h2>What We Stand For</h2>
        <div className="values-grid">
          <div className="value-card">
            <span>🌿</span>
            <h3>Fresh Ingredients</h3>
            <p>We source fresh vegetables and premium ingredients from local farms every single morning. No frozen toppings, ever.</p>
          </div>
          <div className="value-card">
            <span>👨‍🍳</span>
            <h3>Handcrafted</h3>
            <p>Every dough ball is hand-tossed, every sauce simmered from scratch, every pizza assembled with care and precision.</p>
          </div>
          <div className="value-card">
            <span>🏘️</span>
            <h3>Community First</h3>
            <p>We're proud to be part of Rohtak. We support local suppliers, participate in community events, and give back every chance we get.</p>
          </div>
          <div className="value-card">
            <span>🔥</span>
            <h3>Stone Fired</h3>
            <p>Our authentic stone oven bakes every pizza at 900°F, giving you that perfect crispy crust that you just can't get anywhere else.</p>
          </div>
          <div className="value-card">
            <span>🕌</span>
            <h3>Inclusive Menu</h3>
            <p>We offer pure veg, non-veg, and Jain options so everyone at the table can enjoy the MGC Pizza experience.</p>
          </div>
          <div className="value-card">
            <span>🛵</span>
            <h3>Fast Delivery</h3>
            <p>We know you're hungry! That's why we guarantee hot pizza at your door within 30 minutes, or your next order is on us.</p>
          </div>
        </div>
      </div>

      <div className="about-team">
        <h2>Come Visit Us!</h2>
        <div className="visit-info">
          <div className="visit-card">
            <span>📍</span>
            <h3>Our Location</h3>
            <p>Shop No. 12, Sector 14<br />Rohtak, Haryana 124001<br />Near City Bus Stand</p>
          </div>
          <div className="visit-card">
            <span>🕐</span>
            <h3>Opening Hours</h3>
            <p>Monday – Thursday<br />11:00 AM – 10:30 PM</p>
            <p style={{ marginTop: '8px' }}>Friday – Sunday<br />11:00 AM – 11:30 PM</p>
          </div>
          <div className="visit-card">
            <span>📞</span>
            <h3>Get in Touch</h3>
            <p>+91 98765 43210<br />+91 01262 123456</p>
            <p style={{ marginTop: '8px' }}>info@mgcpizza.com</p>
          </div>
        </div>
      </div>

    </div>
  );
}
