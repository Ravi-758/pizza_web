const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ─── CUSTOMER SIGNUP ──────────────────────────────────────────
// POST /api/auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });

    if (password.length < 6)
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });

    // Check if email already exists
    const existing = await db.query('SELECT id FROM customers WHERE email = $1', [email]);
    if (existing.rows.length > 0)
      return res.status(409).json({ success: false, message: 'An account with this email already exists' });

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create customer
    const result = await db.query(
      `INSERT INTO customers (name, email, phone, password_hash, role)
       VALUES ($1, $2, $3, $4, 'customer') RETURNING id, name, email, phone, role`,
      [name, email, phone || null, password_hash]
    );

    const user = result.rows[0];
    const token = generateToken({ id: user.id, email: user.email, role: user.role, name: user.name });

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) { next(err); }
});

// ─── CUSTOMER LOGIN ───────────────────────────────────────────
// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password are required' });

    const result = await db.query(
      'SELECT id, name, email, phone, password_hash, role FROM customers WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ success: false, message: 'Invalid email or password' });

    const user = result.rows[0];

    if (!user.password_hash)
      return res.status(401).json({ success: false, message: 'Please sign up first' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return res.status(401).json({ success: false, message: 'Invalid email or password' });

    const token = generateToken({ id: user.id, email: user.email, role: user.role, name: user.name });

    res.json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) { next(err); }
});

// ─── ADMIN LOGIN ──────────────────────────────────────────────
// POST /api/auth/admin-login
router.post('/admin-login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password are required' });

    const result = await db.query(
      'SELECT id, name, email, password_hash, role FROM admins WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch)
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });

    const token = generateToken({ id: admin.id, email: admin.email, role: 'admin', name: admin.name });

    res.json({
      success: true,
      message: 'Admin logged in successfully!',
      token,
      user: { id: admin.id, name: admin.name, email: admin.email, role: 'admin' }
    });
  } catch (err) { next(err); }
});

// ─── GET CURRENT USER ─────────────────────────────────────────
// GET /api/auth/me
router.get('/me', async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Not logged in' });

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

module.exports = router;
