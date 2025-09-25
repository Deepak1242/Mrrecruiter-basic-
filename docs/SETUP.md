# Setup Instructions

## Prerequisites
- Node.js (v18+)
- npm or yarn
- Git

## Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd interview_project
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Add: JWT_SECRET=your_secret_key

npm run dev
```
Backend runs on: http://localhost:3000

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create environment file
cp .env.example .env.development
# Add: VITE_API_URL=http://localhost:3000/api

npm run dev
```
Frontend runs on: http://localhost:5173

## Environment Variables

### Backend (.env)
```
JWT_SECRET=your_secret_key_here
PORT=3000
NODE_ENV=development
MONGO_URI = yourMongoCloudUri
```

### Frontend (.env.development)
```
VITE_API_URL=http://localhost:3000/api
```

## Testing Setup
1. Open http://localhost:5173
2. Register a new account
3. Login and test profile editing
4. Check that both servers are running without errors



