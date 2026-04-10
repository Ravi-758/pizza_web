import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Menu.css';

const CATEGORIES = ['all', 'pizza', 'sides', 'drinks', 'desserts'];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();
  const [added, setAdded] = useState({});

  useEffect(() => {
    const url = activeCategory === 'all'
      ? `${process.env.REACT_APP_API_URL}/menu`
      : `${process.env.REACT_APP_API_URL}/menu?category=${activeCategory}`;

    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setItems(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load menu. Please try again.');
        setLoading(false);
      });
  }, [activeCategory]);

  const handleAdd = (item) => {
    addItem({ id: item.id, name: item.name, price: parseFloat(item.price) });
    setAdded(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [item.id]: false })), 1200);
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Made fresh daily with the finest ingredients</p>
      </div>

      <div className="category-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading && <div className="loading">Loading menu...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <div className="menu-grid">
          {items.map(item => (
            <div className="menu-card" key={item.id}>
              {item.image_url && (
                <img src={item.image_url} alt={item.name} className="menu-card-img" />
              )}
              <div className="menu-card-body">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="menu-card-footer">
                  <span className="price">${parseFloat(item.price).toFixed(2)}</span>
                  <button
                    className={`add-btn ${added[item.id] ? 'added' : ''}`}
                    onClick={() => handleAdd(item)}
                  >
                    {added[item.id] ? '✓ Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
