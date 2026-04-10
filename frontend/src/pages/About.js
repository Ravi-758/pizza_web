import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>Our Story</h1>
        <p>A family tradition since 1998</p>
      </div>

      <div className="about-content">
        <div className="about-text-block">
          <h2>Where It All Began</h2>
          <p>
            Pizza House was founded in 1998 by the Rossi family, who moved from Naples, Italy
            to Sacramento with one goal in mind — to share the authentic flavors of their homeland
            with their new community.
          </p>
          <p>
            What started as a small family kitchen has grown into one of Sacramento's most beloved
            pizza restaurants, serving thousands of happy customers every week. But through all
            the growth, one thing has never changed: every pizza is still made by hand, every sauce
            still simmered from scratch, and every guest is still treated like family.
          </p>
        </div>

        <div className="about-values">
          <div className="value-card">
            <span>🌿</span>
            <h3>Locally Sourced</h3>
            <p>We partner with Sacramento-area farms to bring the freshest seasonal produce to your pizza.</p>
          </div>
          <div className="value-card">
            <span>👨‍🍳</span>
            <h3>Handcrafted</h3>
            <p>Every dough ball is hand-tossed. Every pizza is assembled with care. No shortcuts.</p>
          </div>
          <div className="value-card">
            <span>🏘️</span>
            <h3>Community First</h3>
            <p>We sponsor local schools, donate to food banks, and show up for Sacramento every day.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
