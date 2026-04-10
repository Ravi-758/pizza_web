import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AuthPage from './pages/Auth/AuthPage';
import AdminLogin from './pages/Auth/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import './App.css';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar onCartOpen={() => setCartOpen(true)} />
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
          <main>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/signup" element={<AuthPage mode="signup" />} />
              <Route path="/admin-login" element={<AdminLogin />} />

              {/* Protected - must be logged in */}
              <Route path="/checkout" element={
                <ProtectedRoute><Checkout /></ProtectedRoute>
              } />
              <Route path="/order-success" element={
                <ProtectedRoute><OrderSuccess /></ProtectedRoute>
              } />

              {/* Admin only */}
              <Route path="/admin" element={
                <AdminRoute><AdminDashboard /></AdminRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
