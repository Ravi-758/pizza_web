import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protects any route - redirects to login if not logged in
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Protects admin routes - redirects to admin-login if not admin
export function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>;
  if (!user) return <Navigate to="/admin-login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}
