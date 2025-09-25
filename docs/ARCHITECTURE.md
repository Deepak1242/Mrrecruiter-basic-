# System Architecture

## Overview
Simple full-stack web application with clear separation between frontend and backend.

## Architecture Diagram
```
Frontend (React)  <-->  Backend (Node.js)  <-->  Database (Mock/MongoDB)
     |                        |                        |
   Netlify                 Vercel                 Atlas/Local
```

## Frontend
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **Recoil**: State management
- **React Router**: Client-side routing

## Backend
- **Node.js**: Runtime
- **Express.js**: Web framework
- **JWT**: Authentication
- **bcrypt**: Password hashing
- **CORS**: Cross-origin requests

## Database
- **MongoDB**:hosting with mongodb cloud

## Key Design Decisions

### Stateless Authentication
- JWT tokens instead of sessions
- Tokens stored in HTTP-only cookies
- 24-hour token expiration

### Single Page Application
- React SPA for smooth user experience
- Client-side routing
- API-first architecture

### Serverless Deployment
- Frontend on Netlify CDN
- Backend on Vercel serverless functions
- Automatic scaling and deployment

## Security
- Password hashing with bcrypt
- JWT token validation
- CORS configuration
- Input validation and sanitization

## Development Workflow
1. Local development with mock database
2. Git-based deployment to staging
3. Production deployment with real database
4. Monitoring and error tracking

## Future Considerations
- Microservices for complex features
- Caching layer (Redis)
- Search service (Elasticsearch)
- File storage (AWS S3/Cloudinary)
- Real-time features (WebSockets)
