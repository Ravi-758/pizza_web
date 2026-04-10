import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose }) {
  const { items, total, removeItem, updateQty } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Order</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>🍕</p>
            <p>Your cart is empty</p>
            <button onClick={onClose} className="browse-btn">Browse Menu</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="cart-item-controls">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
