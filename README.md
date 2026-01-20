# Dallas MMA Boxing - Management System

A full-stack web application for managing a Dallas MMA Boxing gym, including class management, client registration, payment processing, and release form handling.

## Project Overview

This system provides:
- **Class Management**: Create and manage boxing/MMA classes with schedules and pricing
- **Client Management**: Track client information and memberships
- **Payment Processing**: Handle payments via Stripe integration
- **Release Forms**: Digital signing and storage of liability release forms

## Repository Structure

```
dallasmmaboxing/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── config/       # Database and app configuration
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Data models
│   │   ├── routes/       # API routes
│   │   └── server.ts     # Main server file
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md         # Backend documentation
├── render.yaml           # Render deployment configuration
├── DEPLOYMENT.md         # Deployment guide
└── README.md            # This file
```

## Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Deployment**: Render

### Future Frontend (TBD)
- React/Next.js
- Tailwind CSS
- Stripe Elements

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- PostgreSQL (optional for local development)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/andyprevalsky/dallasmmaboxing.git
   cd dallasmmaboxing
   ```

2. **Set up backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000`

4. **Test the API**
   ```bash
   curl http://localhost:3000/api/health
   ```

### Building for Production

```bash
cd backend
npm run build
npm start
```

## API Documentation

### Base URL
- **Local**: `http://localhost:3000`
- **Production**: `https://your-app.onrender.com`

### Endpoints

#### Health Check
```
GET /api/health
```

#### Classes
```
GET    /api/classes          # Get all classes
GET    /api/classes/:id      # Get class by ID
POST   /api/classes          # Create new class
PUT    /api/classes/:id      # Update class
DELETE /api/classes/:id      # Delete class
```

#### Clients
```
GET    /api/clients          # Get all clients
GET    /api/clients/:id      # Get client by ID
POST   /api/clients          # Create new client
PUT    /api/clients/:id      # Update client
DELETE /api/clients/:id      # Delete client
```

#### Payments
```
GET    /api/payments                    # Get all payments
GET    /api/payments/:id                # Get payment by ID
GET    /api/payments/client/:clientId   # Get payments for client
POST   /api/payments                    # Create new payment
PUT    /api/payments/:id                # Update payment
DELETE /api/payments/:id                # Delete payment
```

#### Release Forms
```
GET    /api/forms                    # Get all release forms
GET    /api/forms/:id                # Get form by ID
GET    /api/forms/client/:clientId   # Get form for client
POST   /api/forms                    # Create new form
PUT    /api/forms/:id                # Update form
DELETE /api/forms/:id                # Delete form
```

For detailed API documentation, see [backend/README.md](backend/README.md)

## Deployment

This project is configured for deployment on Render.

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Render

1. Push code to GitHub
2. Connect repository to Render
3. Render will auto-detect `render.yaml` and set up:
   - PostgreSQL database
   - Node.js web service
   - Environment variables

## Current Status

### Completed
- ✅ Backend API structure
- ✅ Database models (Classes, Clients, Payments, Release Forms)
- ✅ RESTful API endpoints
- ✅ TypeScript configuration
- ✅ CORS and middleware setup
- ✅ Render deployment configuration
- ✅ Mock data for testing

### In Progress
- 🔄 Database integration (currently using mocked data)

### Planned
- ⏳ Stripe payment integration
- ⏳ AWS S3 for PDF storage
- ⏳ Authentication/Authorization
- ⏳ Frontend application
- ⏳ Unit and integration tests
- ⏳ CI/CD pipeline

## Development Notes

- Database operations are currently mocked for development
- Look for `🔵 [MOCKED]` in console logs to identify mock operations
- Replace mock data with actual database queries when ready
- See `// TODO:` comments in model files for integration points

## Environment Variables

Required environment variables (see `backend/.env.example`):

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - PostgreSQL connection string
- `CORS_ORIGIN` - Allowed CORS origins

Optional (for future features):
- `STRIPE_SECRET_KEY` - Stripe API key
- `AWS_*` - AWS S3 credentials

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

## Support

For issues or questions:
- Backend API: See [backend/README.md](backend/README.md)
- Deployment: See [DEPLOYMENT.md](DEPLOYMENT.md)
- GitHub Issues: https://github.com/andyprevalsky/dallasmmaboxing/issues
