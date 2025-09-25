# Database Schema

## Current Setup
Using a mock in-memory database for development. Easy to migrate to MongoDB later.

## User Schema

```javascript
{
  _id: Number,        // Auto-incrementing ID
  username: String,   // Display name (min 3 chars)
  email: String,      // Email address (unique)
  password: String,   // Hashed password (bcrypt)
  headline: String,   // Professional headline (optional)
  createdAt: Date,    // Account creation date
  updatedAt: Date     // Last update date
}
```

## Example User
```json
{
  "_id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "password": "$2b$10$...", 
  "headline": "Software Developer",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-20T14:45:00.000Z"
}
```

## Migration to MongoDB
When ready to scale, can easily migrate to MongoDB with:
- User collection with same schema
- Proper indexes on email and username
- Connection pooling
- Replica sets for reliability

## Future Tables
- Jobs (job postings)
- Applications (job applications)
- Companies (company profiles)

## Security
- Passwords never stored in plain text
- Email field is unique
- Input validation on all fields
- Sensitive data excluded from API responses
