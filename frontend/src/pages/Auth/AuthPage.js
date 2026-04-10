import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function AuthPage({ mode = 'login' }) {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const body = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password, phone: form.phone };

      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      login(data.user, data.token);

      // Redirect based on role
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/menu');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <Link to="/" className="auth-logo">🍕 Pizza House</Link>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(true); setError(null); }}
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(false); setError(null); }}
          >
            Sign Up
          </button>
        </div>

        <h2 className="auth-title">
          {isLogin ? 'Welcome back!' : 'Create your account'}
        </h2>
        <p className="auth-subtitle">
          {isLogin ? 'Login to track your orders' : 'Sign up to start ordering'}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-field">
              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Smith"
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@email.com"
              required
            />
          </div>

          {!isLogin && (
            <div className="auth-field">
              <label>Phone (optional)</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>
          )}

          <div className="auth-field">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder={isLogin ? '••••••••' : 'At least 6 characters'}
              required
            />
          </div>

          {error && <div className="auth-error">⚠️ {error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading
              ? (isLogin ? 'Logging in...' : 'Creating account...')
              : (isLogin ? 'Login' : 'Create Account')
            }
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            className="auth-switch-btn"
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>

        {/* Admin login link */}
        <div className="auth-admin-link">
          <Link to="/admin-login">Admin? Login here →</Link>
        </div>
      </div>
    </div>
  );
}
