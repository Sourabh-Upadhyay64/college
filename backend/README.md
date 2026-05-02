# CampusMarket - Backend API

Backend API with authentication, product listings, and chat functionality for a verified campus marketplace.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
copy .env.example .env
```

3. Configure environment variables in `.env`:
   - MongoDB connection string
   - JWT secret key
   - Brevo API credentials
   - Allowed email domain

4. Start server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user (requires verified email domain)
- `POST /api/auth/verify-otp` - Verify email with OTP
- `POST /api/auth/resend-otp` - Resend OTP
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (auth required)

### Products
- `GET /api/products` - Get all products (supports filtering by category, condition, price range)
- `POST /api/products` - Create product listing (auth required)
- `GET /api/products/:id` - Get product details
- `PUT /api/products/:id` - Update product listing (auth required)
- `DELETE /api/products/:id` - Delete product listing (auth required)
- `GET /api/products/my-listings` - Get user's product listings (auth required)

### Bicycles (Legacy - for backward compatibility)
- `GET /api/bicycles` - Get all bicycles
- `POST /api/bicycles` - Create listing (auth required)
- `GET /api/bicycles/:id` - Get bicycle details
- `PUT /api/bicycles/:id` - Update listing (auth required)
- `DELETE /api/bicycles/:id` - Delete listing (auth required)
- `GET /api/bicycles/my-listings` - Get user's listings (auth required)

### Chats
- `POST /api/chats` - Create or get chat (requires productId or bicycleId)
- `GET /api/chats` - Get all user chats (auth required)
- `GET /api/chats/:id` - Get specific chat (auth required)
- `POST /api/chats/:id/messages` - Send message in chat (auth required)

## Product Categories
- Bicycles
- Electronics
- Books
- Furniture
- Clothing
- Sports Equipment
- Musical Instruments
- Vehicles
- Appliances
- Accessories
- Other

