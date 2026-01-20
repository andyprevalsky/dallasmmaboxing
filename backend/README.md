# Dallas MMA Boxing - Backend API

A Node.js/Express backend API for managing classes, clients, payments, and release forms for Dallas MMA Boxing.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (via pg)
- **Deployment**: Render

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files (database, etc.)
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.ts        # Main server file
├── dist/                # Compiled JavaScript (generated)
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (optional for local development - currently using mocked data)

### Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Run in development mode:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get class by ID
- `POST /api/classes` - Create new class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get client by ID
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/:id` - Get payment by ID
- `GET /api/payments/client/:clientId` - Get all payments for a client
- `POST /api/payments` - Create new payment
- `PUT /api/payments/:id` - Update payment
- `DELETE /api/payments/:id` - Delete payment

### Release Forms
- `GET /api/forms` - Get all release forms
- `GET /api/forms/:id` - Get form by ID
- `GET /api/forms/client/:clientId` - Get form for a client
- `POST /api/forms` - Create new form
- `PUT /api/forms/:id` - Update form
- `DELETE /api/forms/:id` - Delete form

## Data Models

### Class
```typescript
{
  id: number
  name: string
  description: string
  schedule: string
  price: number
  created_at: Date
  updated_at: Date
}
```

### Client
```typescript
{
  id: number
  name: string
  email: string
  phone: string
  address?: string
  created_at: Date
  updated_at: Date
}
```

### Payment
```typescript
{
  id: number
  client_id: number
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  stripe_id?: string
  description?: string
  created_at: Date
  updated_at: Date
}
```

### ReleaseForm
```typescript
{
  id: number
  client_id: number
  signed_pdf_url?: string
  signed_date?: Date
  is_signed: boolean
  created_at: Date
  updated_at: Date
}
```

## Environment Variables

See `.env.example` for all available configuration options:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - PostgreSQL connection string
- `CORS_ORIGIN` - Allowed CORS origins
- `STRIPE_SECRET_KEY` - Stripe API key (for payments)
- `AWS_*` - AWS S3 credentials (for file uploads)

## Deployment to Render

1. Push code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Configure:
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`
   - Environment Variables: Add all required vars from `.env.example`
5. Add PostgreSQL database:
   - Create a new PostgreSQL database on Render
   - Copy the Internal Database URL
   - Set it as `DATABASE_URL` environment variable

## Development Notes

- Database operations are currently mocked for development
- Replace mock data with actual PostgreSQL queries when ready
- Look for `// TODO:` comments in model files for database integration points
- All database queries are logged with 🔵 [MOCKED] prefix

## Next Steps

1. Set up actual PostgreSQL database connection
2. Implement Stripe payment processing
3. Add AWS S3 for PDF storage
4. Add authentication/authorization
5. Add input validation
6. Add unit/integration tests
7. Set up CI/CD pipeline

## License

MIT
