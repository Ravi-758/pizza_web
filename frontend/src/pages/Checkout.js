import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: '', order_type: 'delivery', notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const API = process.env.REACT_APP_API_URL;

      const orderRes = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address
          },
          items: items.map(i => ({
            menu_item_id: i.id,
            quantity: i.quantity
          })),
          delivery_address: form.address,
          order_type: form.order_type,
          notes: form.notes
        })
      });

      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error(orderData.message);

      clearCart();
      navigate(`/order-success?order=${orderData.data.order_id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <a href="/menu" className="back-link">← Back to Menu</a>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        <div className="checkout-left">
          <h1>Place Your Order</h1>
          <form className="checkout-form" onSubmit={handleSubmit}>

            <div className="form-section">
              <h2>Your Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    name="name" value={form.name}
                    onChange={handleChange} required
                    placeholder="John Smith"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email" type="email" value={form.email}
                    onChange={handleChange} required
                    placeholder="john@email.com"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    name="phone" value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="form-group">
                  <label>Order Type</label>
                  <select name="order_type" value={form.order_type} onChange={handleChange}>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pickup</option>
                  </select>
                </div>
              </div>
              {form.order_type === 'delivery' && (
                <div className="form-group">
                  <label>Delivery Address</label>
                  <input
                    name="address" value={form.address}
                    onChange={handleChange} required
                    placeholder="123 Main St, Chandigarh"
                  />
                </div>
              )}
              <div className="form-group">
                <label>Special Instructions (optional)</label>
                <textarea
                  name="notes" value={form.notes}
                  onChange={handleChange} rows={3}
                  placeholder="Extra cheese, no onions..."
                />
              </div>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="pay-btn" disabled={loading}>
              {loading ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
            </button>

            <p style={{ textAlign: 'center', fontSize: '13px', color: '#888', marginTop: '12px' }}>
              💵 Pay on delivery / pickup
            </p>

          </form>
        </div>

        <div className="checkout-right">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {items.map(item => (
              <div className="summary-item" key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-divider" />
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p style={{ fontSize: '13px', color: '#888', marginTop: '12px', textAlign: 'center' }}>
            💵 Cash on delivery accepted
          </p>
        </div>

      </div>
    </div>
  );
}