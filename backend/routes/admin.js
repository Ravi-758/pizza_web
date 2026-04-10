const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/stats', async (req, res, next) => {
  try {
    const [orders, revenue, customers, pending] = await Promise.all([
      db.query('SELECT COUNT(*) FROM orders'),
      db.query('SELECT COALESCE(SUM(total_amount), 0) as total FROM orders'),
      db.query('SELECT COUNT(*) FROM customers'),
      db.query("SELECT COUNT(*) FROM orders WHERE status = 'pending'")
    ]);
    res.json({
      success: true,
      data: {
        total_orders: parseInt(orders.rows[0].count),
        total_revenue: parseFloat(revenue.rows[0].total).toFixed(2),
        total_customers: parseInt(customers.rows[0].count),
        pending_orders: parseInt(pending.rows[0].count)
      }
    });
  } catch (err) { next(err); }
});

router.get('/orders', async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = `
      SELECT o.id, o.status, o.total_amount, o.order_type,
             o.delivery_address, o.notes, o.payment_status,
             o.created_at, o.updated_at,
             c.name as customer_name, c.email as customer_email,
             c.phone as customer_phone
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
    `;
    const params = [];
    if (status && status !== 'all') {
      params.push(status);
      query += ` WHERE o.status = $1`;
    }
    query += ' ORDER BY o.created_at DESC';
    const result = await db.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (err) { next(err); }
});

router.get('/orders/:id', async (req, res, next) => {
  try {
    const orderResult = await db.query(
      `SELECT o.*, c.name as customer_name, c.email as customer_email, c.phone as customer_phone
       FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.id = $1`,
      [req.params.id]
    );
    if (orderResult.rows.length === 0)
      return res.status(404).json({ success: false, message: 'Order not found' });
    const itemsResult = await db.query(
      `SELECT oi.*, m.name, m.category
       FROM order_items oi JOIN menu_items m ON oi.menu_item_id = m.id
       WHERE oi.order_id = $1`,
      [req.params.id]
    );
    res.json({ success: true, data: { ...orderResult.rows[0], items: itemsResult.rows } });
  } catch (err) { next(err); }
});

router.patch('/orders/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending','confirmed','preparing','out_for_delivery','delivered','cancelled'];
    if (!validStatuses.includes(status))
      return res.status(400).json({ success: false, message: 'Invalid status' });
    await db.query('UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2', [status, req.params.id]);
    res.json({ success: true, message: 'Order status updated' });
  } catch (err) { next(err); }
});

router.get('/customers', async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT c.*, COUNT(o.id) as total_orders, COALESCE(SUM(o.total_amount), 0) as total_spent
       FROM customers c LEFT JOIN orders o ON c.id = o.customer_id
       GROUP BY c.id ORDER BY c.created_at DESC`
    );
    res.json({ success: true, data: result.rows });
  } catch (err) { next(err); }
});

router.get('/menu', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM menu_items ORDER BY category, name');
    res.json({ success: true, data: result.rows });
  } catch (err) { next(err); }
});

router.post('/menu', async (req, res, next) => {
  try {
    const { name, description, price, category, image_url } = req.body;
    const result = await db.query(
      `INSERT INTO menu_items (name, description, price, category, image_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, price, category, image_url]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) { next(err); }
});

router.patch('/menu/:id', async (req, res, next) => {
  try {
    const { name, description, price, category, image_url, is_available } = req.body;
    await db.query(
      `UPDATE menu_items SET name=$1, description=$2, price=$3,
       category=$4, image_url=$5, is_available=$6 WHERE id=$7`,
      [name, description, price, category, image_url, is_available, req.params.id]
    );
    res.json({ success: true, message: 'Menu item updated' });
  } catch (err) { next(err); }
});

router.delete('/menu/:id', async (req, res, next) => {
  try {
    await db.query('DELETE FROM menu_items WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Menu item deleted' });
  } catch (err) { next(err); }
});

module.exports = router;