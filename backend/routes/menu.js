const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/menu — all items
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM menu_items WHERE is_available = true';
    const params = [];

    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

    query += ' ORDER BY category, name';
    const result = await db.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
});

// GET /api/menu/:id — single item
router.get('/:id', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM menu_items WHERE id = $1 AND is_available = true',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
