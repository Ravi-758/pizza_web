import { useSearchParams, Link } from 'react-router-dom';
import './OrderSuccess.css';

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get('order');

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your order. We're getting started on your pizza right now!</p>
        {orderId && (
          <div className="order-id">
            Order #{orderId}
          </div>
        )}
        <p className="eta">Estimated delivery: <strong>25–35 minutes</strong></p>
        <div className="success-actions">
          <Link to="/menu" className="btn-primary">Order More</Link>
          <Link to="/" className="btn-outline-dark">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
