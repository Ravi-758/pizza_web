const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://pankajgangparia@localhost:5432/pizza_restaurant'
});

async function fix() {
  const hash = await bcrypt.hash('admin123', 10);
  console.log('Generated hash:', hash);
  await pool.query('UPDATE admins SET password_hash = $1 WHERE email = $2', [hash, 'admin@pizzahouse.com']);
  console.log('✅ Password updated successfully!');
  const result = await pool.query('SELECT id, email, password_hash FROM admins');
  console.log('DB now:', result.rows[0]);
  await pool.end();
}

fix().catch(console.error);
