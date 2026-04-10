import { useState, useEffect, useCallback } from 'react';
import './AdminDashboard.css';

const API = process.env.REACT_APP_API_URL;

const STATUS_COLORS = {
  pending:          { bg: '#fff7ed', color: '#c2410c', label: 'Pending' },
  confirmed:        { bg: '#eff6ff', color: '#1d4ed8', label: 'Confirmed' },
  preparing:        { bg: '#fefce8', color: '#a16207', label: 'Preparing' },
  out_for_delivery: { bg: '#f0fdf4', color: '#15803d', label: 'Out for Delivery' },
  delivered:        { bg: '#f0fdf4', color: '#166534', label: 'Delivered ✓' },
  cancelled:        { bg: '#fef2f2', color: '#dc2626', label: 'Cancelled' },
};

const STATUS_FLOW = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];

export default function AdminDashboard() {
  const [tab, setTab] = useState('orders');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [menuForm, setMenuForm] = useState({ name: '', description: '', price: '', category: 'pizza', image_url: '', is_available: true });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchStats = useCallback(async () => {
    const res = await fetch(`${API}/admin/stats`);
    const data = await res.json();
    if (data.success) setStats(data.data);
  }, []);

  const fetchOrders = useCallback(async () => {
    const url = filterStatus === 'all' ? `${API}/admin/orders` : `${API}/admin/orders?status=${filterStatus}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.success) setOrders(data.data);
  }, [filterStatus]);

  const fetchCustomers = useCallback(async () => {
    const res = await fetch(`${API}/admin/customers`);
    const data = await res.json();
    if (data.success) setCustomers(data.data);
  }, []);

  const fetchMenu = useCallback(async () => {
    const res = await fetch(`${API}/admin/menu`);
    const data = await res.json();
    if (data.success) setMenuItems(data.data);
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => { if (tab === 'orders') fetchOrders(); }, [tab, fetchOrders]);
  useEffect(() => { if (tab === 'customers') fetchCustomers(); }, [tab, fetchCustomers]);
  useEffect(() => { if (tab === 'menu') fetchMenu(); }, [tab, fetchMenu]);

  const openOrder = async (id) => {
    const res = await fetch(`${API}/admin/orders/${id}`);
    const data = await res.json();
    if (data.success) setSelectedOrder(data.data);
  };

  const updateStatus = async (orderId, status) => {
    await fetch(`${API}/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    showToast(`Order #${orderId} status updated to ${STATUS_COLORS[status].label}`);
    fetchOrders();
    fetchStats();
    if (selectedOrder?.id === orderId) setSelectedOrder(prev => ({ ...prev, status }));
  };

  const handleMenuSave = async () => {
    setLoading(true);
    try {
      if (editItem) {
        await fetch(`${API}/admin/menu/${editItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(menuForm)
        });
        showToast('Menu item updated!');
      } else {
        await fetch(`${API}/admin/menu`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(menuForm)
        });
        showToast('Menu item added!');
      }
      setShowAddMenu(false);
      setEditItem(null);
      setMenuForm({ name: '', description: '', price: '', category: 'pizza', image_url: '', is_available: true });
      fetchMenu();
    } catch (e) { showToast('Something went wrong', 'error'); }
    setLoading(false);
  };

  const handleDeleteMenu = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;
    await fetch(`${API}/admin/menu/${id}`, { method: 'DELETE' });
    showToast('Menu item deleted');
    fetchMenu();
  };

  const openEditMenu = (item) => {
    setEditItem(item);
    setMenuForm({ name: item.name, description: item.description || '', price: item.price, category: item.category, image_url: item.image_url || '', is_available: item.is_available });
    setShowAddMenu(true);
  };

  return (
    <div className="admin-wrap">
      {/* Toast */}
      {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">🍕 Admin Panel</div>
        <nav className="admin-nav">
          {[
            { key: 'orders', icon: '📋', label: 'Orders' },
            { key: 'menu', icon: '🍕', label: 'Menu Items' },
            { key: 'customers', icon: '👥', label: 'Customers' },
          ].map(item => (
            <button key={item.key} className={`admin-nav-btn ${tab === item.key ? 'active' : ''}`} onClick={() => setTab(item.key)}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <a href="/" className="admin-site-link" target="_blank" rel="noreferrer">← View Website</a>
      </aside>

      {/* Main */}
      <main className="admin-main">

        {/* Stats */}
        <div className="admin-stats">
          {[
            { label: 'Total Orders', value: stats?.total_orders ?? '...', icon: '📋' },
            { label: 'Total Revenue', value: stats ? `$${stats.total_revenue}` : '...', icon: '💰' },
            { label: 'Customers', value: stats?.total_customers ?? '...', icon: '👥' },
            { label: 'Pending Orders', value: stats?.pending_orders ?? '...', icon: '⏳', highlight: true },
          ].map((s, i) => (
            <div key={i} className={`stat-card ${s.highlight && stats?.pending_orders > 0 ? 'highlight' : ''}`}>
              <span className="stat-icon">{s.icon}</span>
              <div>
                <p className="stat-value">{s.value}</p>
                <p className="stat-label">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ORDERS TAB */}
        {tab === 'orders' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Orders</h2>
              <div className="filter-tabs">
                {['all', 'pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'].map(s => (
                  <button key={s} className={`filter-btn ${filterStatus === s ? 'active' : ''}`} onClick={() => setFilterStatus(s)}>
                    {s === 'all' ? 'All' : STATUS_COLORS[s]?.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="orders-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Type</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 && (
                    <tr><td colSpan={8} style={{ textAlign: 'center', color: '#aaa', padding: '32px' }}>No orders found</td></tr>
                  )}
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td><strong>#{order.id}</strong></td>
                      <td>
                        <p style={{ fontWeight: 500 }}>{order.customer_name}</p>
                        <p style={{ fontSize: '12px', color: '#888' }}>{order.customer_email}</p>
                      </td>
                      <td>{order.customer_phone || '—'}</td>
                      <td><span className="badge">{order.order_type}</span></td>
                      <td><strong>${parseFloat(order.total_amount).toFixed(2)}</strong></td>
                      <td>
                        <span className="status-badge" style={{ background: STATUS_COLORS[order.status]?.bg, color: STATUS_COLORS[order.status]?.color }}>
                          {STATUS_COLORS[order.status]?.label}
                        </span>
                      </td>
                      <td style={{ fontSize: '13px', color: '#888' }}>{new Date(order.created_at).toLocaleString()}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          <button className="action-btn view" onClick={() => openOrder(order.id)}>View</button>
                          {STATUS_FLOW.indexOf(order.status) !== -1 && STATUS_FLOW.indexOf(order.status) < STATUS_FLOW.length - 1 && (
                            <button className="action-btn next" onClick={() => updateStatus(order.id, STATUS_FLOW[STATUS_FLOW.indexOf(order.status) + 1])}>
                              → Next
                            </button>
                          )}
                          {order.status !== 'cancelled' && order.status !== 'delivered' && (
                            <button className="action-btn cancel" onClick={() => updateStatus(order.id, 'cancelled')}>Cancel</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
              <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Order #{selectedOrder.id}</h3>
                    <button className="modal-close" onClick={() => setSelectedOrder(null)}>✕</button>
                  </div>
                  <div className="modal-body">
                    <div className="modal-grid">
                      <div>
                        <p className="modal-label">Customer</p>
                        <p className="modal-value">{selectedOrder.customer_name}</p>
                      </div>
                      <div>
                        <p className="modal-label">Email</p>
                        <p className="modal-value">{selectedOrder.customer_email}</p>
                      </div>
                      <div>
                        <p className="modal-label">Phone</p>
                        <p className="modal-value">{selectedOrder.customer_phone || '—'}</p>
                      </div>
                      <div>
                        <p className="modal-label">Order Type</p>
                        <p className="modal-value">{selectedOrder.order_type}</p>
                      </div>
                      {selectedOrder.delivery_address && (
                        <div style={{ gridColumn: '1/-1' }}>
                          <p className="modal-label">Delivery Address</p>
                          <p className="modal-value">{selectedOrder.delivery_address}</p>
                        </div>
                      )}
                      {selectedOrder.notes && (
                        <div style={{ gridColumn: '1/-1' }}>
                          <p className="modal-label">Notes</p>
                          <p className="modal-value">{selectedOrder.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="modal-items">
                      <p className="modal-label" style={{ marginBottom: '10px' }}>Items Ordered</p>
                      {selectedOrder.items?.map((item, i) => (
                        <div key={i} className="modal-item-row">
                          <span>{item.name} × {item.quantity}</span>
                          <span>${parseFloat(item.subtotal).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="modal-item-row total-row">
                        <span>Total</span>
                        <span>${parseFloat(selectedOrder.total_amount).toFixed(2)}</span>
                      </div>
                    </div>

                    <div>
                      <p className="modal-label" style={{ marginBottom: '10px' }}>Update Status</p>
                      <div className="status-btns">
                        {STATUS_FLOW.map(s => (
                          <button key={s} className={`status-update-btn ${selectedOrder.status === s ? 'current' : ''}`}
                            onClick={() => updateStatus(selectedOrder.id, s)}>
                            {STATUS_COLORS[s].label}
                          </button>
                        ))}
                        <button className={`status-update-btn cancel ${selectedOrder.status === 'cancelled' ? 'current' : ''}`}
                          onClick={() => updateStatus(selectedOrder.id, 'cancelled')}>
                          Cancelled
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MENU TAB */}
        {tab === 'menu' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Menu Items</h2>
              <button className="add-btn" onClick={() => { setShowAddMenu(true); setEditItem(null); setMenuForm({ name: '', description: '', price: '', category: 'pizza', image_url: '', is_available: true }); }}>
                + Add Item
              </button>
            </div>

            <div className="orders-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map(item => (
                    <tr key={item.id}>
                      <td>
                        <p style={{ fontWeight: 500 }}>{item.name}</p>
                        <p style={{ fontSize: '12px', color: '#888' }}>{item.description}</p>
                      </td>
                      <td><span className="badge">{item.category}</span></td>
                      <td><strong>${parseFloat(item.price).toFixed(2)}</strong></td>
                      <td>
                        <span className="status-badge" style={{ background: item.is_available ? '#f0fdf4' : '#fef2f2', color: item.is_available ? '#166534' : '#dc2626' }}>
                          {item.is_available ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button className="action-btn view" onClick={() => openEditMenu(item)}>Edit</button>
                          <button className="action-btn cancel" onClick={() => handleDeleteMenu(item.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add/Edit Menu Modal */}
            {showAddMenu && (
              <div className="modal-overlay" onClick={() => setShowAddMenu(false)}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>{editItem ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
                    <button className="modal-close" onClick={() => setShowAddMenu(false)}>✕</button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Name</label>
                      <input value={menuForm.name} onChange={e => setMenuForm(p => ({ ...p, name: e.target.value }))} placeholder="Margherita Classic" />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea value={menuForm.description} onChange={e => setMenuForm(p => ({ ...p, description: e.target.value }))} rows={2} placeholder="Fresh mozzarella, tomato sauce..." />
                    </div>
                    <div className="modal-grid">
                      <div className="form-group">
                        <label>Price ($)</label>
                        <input type="number" step="0.01" value={menuForm.price} onChange={e => setMenuForm(p => ({ ...p, price: e.target.value }))} placeholder="14.99" />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select value={menuForm.category} onChange={e => setMenuForm(p => ({ ...p, category: e.target.value }))}>
                          <option value="pizza">Pizza</option>
                          <option value="sides">Sides</option>
                          <option value="drinks">Drinks</option>
                          <option value="desserts">Desserts</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Image URL (optional)</label>
                      <input value={menuForm.image_url} onChange={e => setMenuForm(p => ({ ...p, image_url: e.target.value }))} placeholder="https://..." />
                    </div>
                    {editItem && (
                      <div className="form-group">
                        <label>
                          <input type="checkbox" checked={menuForm.is_available} onChange={e => setMenuForm(p => ({ ...p, is_available: e.target.checked }))} />
                          {' '}Available on menu
                        </label>
                      </div>
                    )}
                    <button className="add-btn" style={{ width: '100%', marginTop: '8px' }} onClick={handleMenuSave} disabled={loading}>
                      {loading ? 'Saving...' : editItem ? 'Save Changes' : 'Add Item'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CUSTOMERS TAB */}
        {tab === 'customers' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Customers</h2>
            </div>
            <div className="orders-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Total Orders</th>
                    <th>Total Spent</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.length === 0 && (
                    <tr><td colSpan={6} style={{ textAlign: 'center', color: '#aaa', padding: '32px' }}>No customers yet</td></tr>
                  )}
                  {customers.map(c => (
                    <tr key={c.id}>
                      <td><strong>{c.name}</strong></td>
                      <td>{c.email}</td>
                      <td>{c.phone || '—'}</td>
                      <td><span className="badge">{c.total_orders} orders</span></td>
                      <td><strong>${parseFloat(c.total_spent).toFixed(2)}</strong></td>
                      <td style={{ fontSize: '13px', color: '#888' }}>{new Date(c.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}