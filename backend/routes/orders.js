const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/orders — place a new order
router.post('/', async (req, res, next) => {
  const client = await db.pool.connect();
  try {
    const { customer, items, delivery_address, order_type, notes } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Customer and items are required' });
    }

    await client.query('BEGIN');

    // Upsert customer
    const customerResult = await client.query(
      `INSERT INTO customers (name, email, phone, address)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, phone = EXCLUDED.phone
       RETURNING id`,
      [customer.name, customer.email, customer.phone, customer.address]
    );
    const customerId = customerResult.rows[0].id;

    // Calculate total from DB prices (never trust client-side prices)
    const itemIds = items.map(i => i.menu_item_id);
    const menuResult = await client.query(
      'SELECT id, price FROM menu_items WHERE id = ANY($1)',
      [itemIds]
    );
    const priceMap = {};
    menuResult.rows.forEach(row => { priceMap[row.id] = parseFloat(row.price); });

    let total = 0;
    const orderItems = items.map(item => {
      const unitPrice = priceMap[item.menu_item_id];
      if (!unitPrice) throw new Error(`Menu item ${item.menu_item_id} not found`);
      const subtotal = unitPrice * item.quantity;
      total += subtotal;
      return { ...item, unit_price: unitPrice, subtotal };
    });

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (customer_id, total_amount, delivery_address, order_type, notes)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [customerId, total.toFixed(2), delivery_address, order_type || 'delivery', notes]
    );
    const orderId = orderResult.rows[0].id;

    // Insert order items
    for (const item of orderItems) {
      await client.query(
        `INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price, subtotal)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.menu_item_id, item.quantity, item.unit_price, item.subtotal]
      );
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      data: { order_id: orderId, total: total.toFixed(2) }
    });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
});

// GET /api/orders/:id — get order status
router.get('/:id', async (req, res, next) => {
  try {
    const orderResult = await db.query(
      `SELECT o.*, c.name as customer_name, c.email as customer_email
       FROM orders o JOIN customers c ON o.customer_id = c.id
       WHERE o.id = $1`,
      [req.params.id]
    );
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const itemsResult = await db.query(
      `SELECT oi.*, m.name, m.category
       FROM order_items oi JOIN menu_items m ON oi.menu_item_id = m.id
       WHERE oi.order_id = $1`,
      [req.params.id]
    );

    res.json({
      success: true,
      data: { ...orderResult.rows[0], items: itemsResult.rows }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
