# Real Estate Lead Generation Application

A full-stack application for collecting and managing real estate leads. The application consists of a React frontend and Node.js/Express backend.

## Project Structure

## Features

- Multi-step form for lead collection
- Region and district selection
- Contact information collection
- Input validation and sanitization
- Rate limiting for API endpoints
- CORS protection
- MongoDB database integration

## Technologies Used

### Frontend

- React
- TypeScript
- React Router
- React Hook Form
- Tailwind CSS

### Backend

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- Zod (validation)
- XSS (sanitization)
- Express Rate Limit

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm

### Installation

1. Clone the repository:

`git clone git@github.com:Hanka8/real-estate-app.git`

2. Install server dependencies:

```
cd server
npm install
```

3. Install client dependencies:

```
cd ../client
npm install
```

4. Configuration:
   Create a .env file in the server directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

### Running the application

1. Start the backend server:

```
cd server
npm run dev
```

2. Start the frontend development server:

```
cd client
npm run dev
```

### API Endpoints

- GET /lead - Health check endpoint
- POST /lead - Create a new lead

Request body:

```
{
  "estateType": "byt|dům|pozemek",
  "fullName": "string",
  "phone": "string",
  "email": "string",
  "region": "string",
  "district": "string"
}
```

### Security features

- CORS configuration with whitelisted origins
- Rate limiting
- Input validation and sanitization
- XSS protection

### Deployment

- Frontend is deployed on Netlify
- Backend is deployed on Render
