import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      login(data.user, data.token);
      navigate('/admin');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page admin-bg">
      <div className="auth-card">
        <Link to="/" className="auth-logo">🍕 Pizza House</Link>

        <div className="admin-badge">🔐 Admin Portal</div>

        <h2 className="auth-title">Admin Login</h2>
        <p className="auth-subtitle">Enter your admin credentials to continue</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Admin Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="admin@pizzahouse.com"
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="auth-error">⚠️ {error}</div>}

          <button type="submit" className="auth-submit admin-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Admin Panel'}
          </button>
        </form>

        <p className="auth-switch">
          <Link to="/login" className="auth-switch-btn">← Back to Customer Login</Link>
        </p>

        <div className="auth-hint">
          <p>Default credentials:</p>
          <p>📧 admin@pizzahouse.com</p>
          <p>🔑 admin123</p>
        </div>
      </div>
    </div>
  );
}
