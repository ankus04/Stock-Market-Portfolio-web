# Stock Market Portfolio App

MERN application with shared login for users and admin, signup fields for country and hobby, portfolio management for users, and an admin dashboard that can inspect every user's portfolio.

## Admin account

The backend seeds the admin account automatically when the server starts.

## Setup

You can now run commands either from the root folder or inside `backend` and `frontend`.

### Root commands

1. Run `npm run install:all`
2. Start backend with `npm run dev:backend`
3. Start frontend with `npm run dev:frontend`

### Backend

1. Copy `backend/.env.example` to `backend/.env`
2. Set `MONGODB_URI` and `JWT_SECRET`
3. Run `npm install`
4. Run `npm run dev`

### Frontend

1. Run `npm install`
2. Run `npm run dev`

## API routes

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `GET /api/portfolios`
- `POST /api/portfolios`
- `DELETE /api/portfolios/:id`
- `GET /api/admin/users`
- `GET /api/admin/users/:userId/portfolios`
