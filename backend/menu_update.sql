-- Run this in Supabase SQL Editor to update menu with MGC Pizza items
-- Go to: Supabase → SQL Editor → New Query → paste this → Run

DELETE FROM menu_items;

INSERT INTO menu_items (name, description, price, category, image_url, is_available) VALUES
-- PIZZAS (Veg)
('Margherita Classic', 'Fresh mozzarella, tomato sauce, fresh basil leaves', 299.00, 'pizza', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=70', true),
('Paneer Tikka', 'Marinated paneer, capsicum, onion, BBQ sauce, mozzarella', 349.00, 'pizza', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70', true),
('Farmhouse', 'Mixed vegetables, corn, olives, mushrooms, capsicum', 329.00, 'pizza', 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=70', true),
('Double Cheese Margherita', 'Double mozzarella, rich tomato sauce, oregano', 349.00, 'pizza', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=70', true),
('Corn & Capsicum', 'Sweet corn, green capsicum, mozzarella, tomato base', 299.00, 'pizza', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70', true),
('Spicy Veggie', 'Jalapeños, onion, tomato, capsicum, chili flakes', 319.00, 'pizza', 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=70', true),

-- PIZZAS (Non-Veg)
('Chicken BBQ', 'Grilled chicken, BBQ sauce, red onions, mozzarella', 399.00, 'pizza', 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400&q=70', true),
('Chicken Tikka', 'Spicy tandoori chicken, capsicum, onion, paneer', 419.00, 'pizza', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70', true),
('Pepperoni Feast', 'Double pepperoni, mozzarella, marinara sauce', 449.00, 'pizza', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=70', true),

-- SIDES
('Garlic Bread', 'Toasted bread with garlic butter and herbs', 99.00, 'sides', null, true),
('Garlic Bread with Cheese', 'Garlic bread topped with melted mozzarella', 129.00, 'sides', null, true),
('Caesar Salad', 'Romaine lettuce, parmesan, croutons, caesar dressing', 149.00, 'sides', null, true),
('Peri Peri Fries', 'Crispy fries tossed in peri peri seasoning', 119.00, 'sides', null, true),
('Pasta Arrabiata', 'Penne pasta in spicy tomato sauce', 179.00, 'sides', null, true),

-- DRINKS
('Coca-Cola (300ml)', 'Chilled classic Coke', 49.00, 'drinks', null, true),
('Sprite (300ml)', 'Refreshing lemon-lime drink', 49.00, 'drinks', null, true),
('Fresh Lime Soda', 'Freshly squeezed lime with soda water', 69.00, 'drinks', null, true),
('Mango Shake', 'Fresh Alphonso mango blended with milk', 99.00, 'drinks', null, true),
('Mineral Water (500ml)', 'Chilled packaged drinking water', 30.00, 'drinks', null, true),

-- DESSERTS
('Chocolate Lava Cake', 'Warm chocolate cake with vanilla ice cream scoop', 149.00, 'desserts', null, true),
('Tiramisu', 'Classic Italian coffee dessert with mascarpone', 169.00, 'desserts', null, true),
('Choco Brownie', 'Rich chocolate brownie with chocolate sauce', 119.00, 'desserts', null, true);
