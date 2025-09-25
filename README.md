
# Live Preview : https://mrinterviewer.netlify.app/ 🟢


# MrRecruiter - Job Portal Application

A full-stack job portal application built with React, Node.js, and Express.

## Features

- 🔐 **User Authentication** - Secure signup, login, and logout
- 👤 **Profile Management** - Edit and update user profiles
- 🎨 **Responsive Design** - Works on desktop and mobile devices
- 🔒 **Protected Routes** - Secure access to authenticated pages
- 💾 **Persistent Sessions** - Stay logged in across browser refreshes

## Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- Recoil for state management
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- JWT for authentication
- bcrypt for password hashing
- Cookie-based session management
- Mock database for development

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interview_project
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Development

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on http://localhost:3000

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on http://localhost:5173

### Environment Variables

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:3000/api
```

For production, update the API URL to your deployed backend URL.

## Deployment

### Frontend Deployment (Netlify)
The frontend is configured for automatic deployment to Netlify:

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `frontend/dist`
4. Set environment variable: `VITE_API_URL=<your-backend-url>`

### Backend Deployment
Deploy the backend to services like:
- Heroku
- Railway
- Render
- DigitalOcean App Platform

## Project Structure

```
interview_project/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── database/        # Database configuration
│   ├── middlewares/     # Custom middleware
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   └── index.js         # Server entry point
├── frontend/
│   ├── api/             # API configuration
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── state/       # Recoil state management
│   └── public/          # Static assets
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/validate` - Token validation
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
