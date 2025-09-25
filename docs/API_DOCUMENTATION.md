# API Documentation

## Overview
Simple REST API for user authentication and profile management.

## Base URLs
- Development: `http://localhost:3000/api`
- Production: `https://backend-8x7wh51p3-demoncommander12-1854s-projects.vercel.app/api`

## Authentication
Uses JWT tokens. Include token in Authorization header:
```
Authorization: Bearer <your_token>
```

## Endpoints

### Register User
`POST /auth/register`

```json
{
  "username": "johndoe",
  "email": "john@example.com", 
  "password": "password123"
}
```

Returns user info and JWT token.

### Login
`POST /auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Returns user info and JWT token.

### Validate Token
`GET /auth/validate`

Requires Authorization header. Returns user info if token is valid.

### Logout
`POST /auth/logout`

Clears authentication cookie.

### Get Profile
`GET /auth/profile`

Requires Authorization header. Returns current user's profile.

### Update Profile
`PUT /auth/profile`

Requires Authorization header.

```json
{
  "username": "newusername",
  "headline": "Software Developer"
}
```

## Error Responses
- 400: Bad request (validation errors)
- 401: Unauthorized (invalid/expired token)
- 404: Not found
- 500: Server error

## Security
- Passwords hashed with bcrypt
- JWT tokens expire in 24 hours
- CORS enabled for allowed origins
- Input validation on all endpoints

## Testing
Use curl or Postman to test endpoints. Start with register/login to get a token, then use it for protected routes.
