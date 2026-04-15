# 🚀 Crowdfunding Backend API

A production-ready REST API built with **Node.js**, **Express**, and **MongoDB** using an MVC architecture.

---

## 📁 Project Structure

```
crowdfunding-backend/
├── server.js                    # App entry point
├── package.json
├── .env.example                 # Environment variable template
├── models/
│   ├── user.model.js            # User schema (name, email, password)
│   └── campaign.model.js        # Campaign schema
├── controllers/
│   ├── auth.controller.js       # Signup, login, getMe
│   └── campaign.controller.js   # CRUD for campaigns
├── routes/
│   ├── auth.routes.js           # /api/auth/*
│   └── campaign.routes.js       # /api/campaigns/*
├── middleware/
│   ├── auth.middleware.js       # JWT protect middleware
│   └── error.middleware.js      # Global error handler + AppError
└── utils/
    └── jwt.utils.js             # generateToken / verifyToken
```

---

## ⚙️ Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and a strong JWT_SECRET
```

### 3. Start the server
```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

---

## 🔐 Authentication API

### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "securepassword123"
}
```

**Response `201`:**
```json
{
  "success": true,
  "message": "Account created successfully.",
  "data": {
    "user": { "_id": "...", "name": "Alice Johnson", "email": "alice@example.com" },
    "token": "<JWT>"
  }
}
```

---

### POST `/api/auth/login`
Authenticate an existing user.

**Request Body:**
```json
{
  "email": "alice@example.com",
  "password": "securepassword123"
}
```

**Response `200`:**
```json
{
  "success": true,
  "message": "Logged in successfully.",
  "data": {
    "user": { "_id": "...", "name": "Alice Johnson", "email": "alice@example.com" },
    "token": "<JWT>"
  }
}
```

---

### GET `/api/auth/me` 🔒
Get the currently authenticated user's profile.

**Headers:** `Authorization: Bearer <token>`

---

## 📢 Campaigns API

### POST `/api/campaigns` 🔒
Create a new campaign.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Build a Community Garden",
  "description": "We want to transform an empty lot into a thriving community garden for our neighborhood.",
  "goalAmount": 5000,
  "deadline": "2025-12-31",
  "image": "https://example.com/garden.jpg"
}
```

**Response `201`:**
```json
{
  "success": true,
  "message": "Campaign created successfully.",
  "data": {
    "campaign": {
      "_id": "...",
      "title": "Build a Community Garden",
      "goalAmount": 5000,
      "raisedAmount": 0,
      "fundingPercentage": "0.00",
      "daysRemaining": 45,
      "owner": { "_id": "...", "name": "Alice Johnson", "email": "alice@example.com" }
    }
  }
}
```

---

### GET `/api/campaigns`
Get all campaigns (public). Supports filtering, pagination, and search.

**Query Params:**
| Param    | Default      | Description                        |
|----------|--------------|------------------------------------|
| `page`   | `1`          | Page number                        |
| `limit`  | `10`         | Results per page (max 50)          |
| `status` | `active`     | `active`, `completed`, `cancelled` |
| `sort`   | `-createdAt` | Sort field (prefix `-` for desc)   |
| `search` | —            | Search in title and description    |

**Example:** `GET /api/campaigns?page=1&limit=5&search=garden`

---

### GET `/api/campaigns/:id`
Get a single campaign by its ID (public).

---

### PUT `/api/campaigns/:id` 🔒
Update a campaign. Only the campaign owner can update it.

**Headers:** `Authorization: Bearer <token>`

---

### DELETE `/api/campaigns/:id` 🔒
Delete a campaign. Only the campaign owner can delete it.

**Headers:** `Authorization: Bearer <token>`

---

## ❌ Error Responses

All errors follow a consistent shape:
```json
{
  "success": false,
  "message": "Descriptive error message here."
}
```

| Status | Meaning               |
|--------|-----------------------|
| `400`  | Bad request / validation error |
| `401`  | Unauthorized (missing/invalid token) |
| `403`  | Forbidden (not the owner) |
| `404`  | Resource not found    |
| `409`  | Conflict (e.g. email already exists) |
| `500`  | Internal server error |

---

## 🔑 Security Notes

- Passwords are hashed with **bcrypt** (salt rounds: 12)
- Passwords are never returned in API responses (`select: false`)
- JWT tokens expire in **7 days** (configurable via `JWT_EXPIRES_IN`)
- Replace `JWT_SECRET` in `.env` with a strong random string (32+ characters) before deploying
