# Bicycle Marketplace - Backend API

Backend API with authentication and bicycle listing functionality.

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
   - Email credentials (Gmail)
   - Allowed email domain

4. Start server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/verify-otp` - Verify email with OTP
- `POST /api/auth/resend-otp` - Resend OTP
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Bicycles
- `GET /api/bicycles` - Get all bicycles
- `POST /api/bicycles` - Create listing (auth required)
- `GET /api/bicycles/:id` - Get bicycle details
- `PUT /api/bicycles/:id` - Update listing (auth required)
- `DELETE /api/bicycles/:id` - Delete listing (auth required)
- `GET /api/bicycles/my-listings` - Get user's listings (auth required)

