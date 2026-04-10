# 🍕 Pizza Restaurant — Full Stack App

A complete restaurant website with React frontend, Node.js backend, PostgreSQL database, and Stripe payments.

## Project Structure

```
pizza-restaurant/
├── frontend/          # React app
│   ├── src/
│   │   ├── components/    # Navbar, Footer, CartDrawer, etc.
│   │   ├── pages/         # Home, Menu, About, Checkout
│   │   └── context/       # CartContext (global cart state)
│   └── package.json
├── backend/           # Node.js + Express API
│   ├── routes/        # menu, orders, payments
│   ├── middleware/    # auth, error handler
│   ├── db/            # DB connection + schema
│   └── server.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js v18+
- PostgreSQL v14+
- A Stripe account (free at stripe.com)

---

### 2. Database Setup

Open your terminal and run:

```bash
psql -U postgres
```

Then paste:

```sql
CREATE DATABASE pizza_restaurant;
\c pizza_restaurant
```

Then run the schema file:

```bash
psql -U postgres -d pizza_restaurant -f backend/db/schema.sql
```

---

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/pizza_restaurant
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
JWT_SECRET=your_random_secret_string
CLIENT_URL=http://localhost:3000
```

Start the backend:

```bash
npm run dev
```

---

### 4. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

Start the frontend:

```bash
npm start
```

Visit: **http://localhost:3000**

---

## 🔑 Stripe Keys

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Click **Developers → API Keys**
3. Copy your **Publishable key** → paste into frontend `.env`
4. Copy your **Secret key** → paste into backend `.env`

> Use test keys (starting with `pk_test_` / `sk_test_`) while developing.

---

## 🚀 Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Push to GitHub, then import repo at vercel.com
```

### Backend → Railway or Render
- Create a new project at [railway.app](https://railway.app)
- Connect your GitHub repo
- Add the same `.env` variables in the dashboard
- Railway auto-detects Node.js and deploys

### Database → Supabase (free PostgreSQL)
- Create a project at [supabase.com](https://supabase.com)
- Copy the connection string → use as `DATABASE_URL`

---

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/menu | Get all menu items |
| GET | /api/menu/:id | Get single item |
| POST | /api/orders | Place an order |
| GET | /api/orders/:id | Get order status |
| POST | /api/payments/create-intent | Create Stripe payment |
| POST | /api/payments/confirm | Confirm payment |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Context API |
| Styling | CSS Modules + CSS Variables |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Payments | Stripe |
| Auth | JWT (JSON Web Tokens) |
| Hosting | Vercel (frontend) + Railway (backend) |
