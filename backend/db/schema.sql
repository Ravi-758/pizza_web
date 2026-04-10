-- Pizza Restaurant Database Schema

CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) NOT NULL,  -- 'pizza', 'sides', 'drinks', 'desserts'
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  status VARCHAR(30) DEFAULT 'pending',  -- pending, confirmed, preparing, out_for_delivery, delivered, cancelled
  total_amount DECIMAL(10,2) NOT NULL,
  delivery_address TEXT,
  order_type VARCHAR(20) DEFAULT 'delivery',  -- delivery, pickup
  stripe_payment_id VARCHAR(200),
  payment_status VARCHAR(30) DEFAULT 'unpaid',  -- unpaid, paid, refunded
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS vip_members (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  email VARCHAR(150) UNIQUE NOT NULL,
  joined_at TIMESTAMP DEFAULT NOW(),
  birthday DATE,
  points INTEGER DEFAULT 0
);

-- Seed menu data
INSERT INTO menu_items (name, description, price, category, image_url) VALUES
('Margherita Classic', 'Fresh mozzarella, tomato sauce, basil leaves', 14.99, 'pizza', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400'),
('Pepperoni Feast', 'Double pepperoni, mozzarella, marinara', 17.99, 'pizza', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'),
('Garden Veggie', 'Bell peppers, mushrooms, olives, onions', 15.99, 'pizza', 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400'),
('BBQ Chicken', 'Grilled chicken, BBQ sauce, red onions, cilantro', 18.99, 'pizza', 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400'),
('Garlic Bread', 'Toasted with garlic butter and herbs', 5.99, 'sides', NULL),
('Caesar Salad', 'Romaine, parmesan, croutons, caesar dressing', 8.99, 'sides', NULL),
('Coca-Cola', '330ml can', 2.99, 'drinks', NULL),
('Sparkling Water', '500ml bottle', 2.49, 'drinks', NULL),
('Chocolate Lava Cake', 'Warm chocolate cake with vanilla ice cream', 6.99, 'desserts', NULL);
