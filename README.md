# Dallas MMA Boxing - Full Stack Application

A full-stack web application for Dallas MMA Boxing - a premier martial arts training facility offering Boxing, Muay Thai, MMA, and Brazilian Jiu-Jitsu classes. The system includes class management, client registration, payment processing, and release form handling.

## Project Overview

This system provides:
- **Public Website**: Modern React frontend for class information and registration
- **Class Management**: Create and manage boxing/MMA classes with schedules and pricing
- **Client Management**: Track client information and memberships
- **Payment Processing**: Handle payments via Stripe integration
- **Release Forms**: Digital signing and storage of liability release forms
- **Notification System**: Automated SMS and email notifications for payment confirmations

## Repository Structure

```
dallasmmaboxing/
├── backend/              # Node.js/Express API (see backend/README.md)
├── src/                  # React frontend application
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions and constants
├── public/              # Static assets
├── dist/                # Production build output
├── render.yaml          # Backend deployment configuration
├── vercel.json          # Frontend deployment configuration
└── README.md            # This file
```

## Tech Stack

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Code Quality**: ESLint, Prettier
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Deployment**: Render

## Frontend Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ClassCard.tsx
│   └── Schedule.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Schedule.tsx
│   ├── Boxing.tsx
│   ├── MuayThai.tsx
│   ├── MMA.tsx
│   ├── BrazilianJiuJitsu.tsx
│   └── Checkout.tsx
├── hooks/              # Custom React hooks
│   └── useMediaQuery.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions and constants
│   ├── constants.ts
│   └── helpers.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL (optional for local development with backend)

### Frontend Development

1. Clone the repository:
```bash
git clone https://github.com/andyprevalsky/dallasmmaboxing.git
cd dallasmmaboxing
```

2. Install frontend dependencies:
```bash
npm install
```

3. Create environment variables file:
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Backend Development

See [backend/README.md](backend/README.md) for backend setup instructions.

### Building for Production

Build the frontend:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Code Quality

Run ESLint:
```bash
npm run lint
```

Format code with Prettier:
```bash
npm run format
```

## Available Routes

- `/` - Home page
- `/schedule` - Class schedule
- `/boxing` - Boxing program details
- `/muay-thai` - Muay Thai program details
- `/mma` - MMA program details
- `/brazilian-jiu-jitsu` - Brazilian Jiu-Jitsu program details
- `/checkout` - Membership checkout (hidden route)

## API Endpoints

For backend API documentation, see [backend/README.md](backend/README.md)

Key endpoints include:
- `/api/classes` - Class management
- `/api/clients` - Client management
- `/api/payments` - Payment processing (with automated notifications)
- `/api/forms` - Release form handling

For detailed notification system documentation, see [backend/NOTIFICATION_SYSTEM.md](backend/NOTIFICATION_SYSTEM.md)

## Deployment

### Frontend (Vercel)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Backend (Render)

See [DEPLOYMENT.md](DEPLOYMENT.md) for backend deployment instructions.

## Environment Variables

### Frontend (.env)
- `VITE_API_URL` - Backend API URL
- `VITE_STRIPE_PUBLIC_KEY` - Stripe public key for payments
- `VITE_GA_TRACKING_ID` - Google Analytics tracking ID
- `VITE_CONTACT_EMAIL` - Contact email address
- `VITE_SITE_URL` - Site URL

### Backend
See `backend/.env.example` for backend environment variables.

## Current Status

### Completed
- ✅ Backend API structure
- ✅ Database models (Classes, Clients, Payments, Release Forms)
- ✅ RESTful API endpoints
- ✅ Notification system (SMS & Email with mock services)
- ✅ Frontend React application
- ✅ Responsive UI with Tailwind CSS
- ✅ React Router setup
- ✅ TypeScript configuration
- ✅ Deployment configurations (Vercel + Render)

### In Progress
- 🔄 Backend database integration (currently using mocked data)
- 🔄 Frontend-backend API integration

### Planned
- ⏳ Stripe payment integration
- ⏳ AWS S3 for PDF storage
- ⏳ Production SMS service (Twilio) integration
- ⏳ Production Email service (SendGrid/AWS SES) integration
- ⏳ Authentication/Authorization
- ⏳ Unit and integration tests
- ⏳ CI/CD pipeline

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For issues or questions:
- Frontend: See this README
- Backend API: See [backend/README.md](backend/README.md)
- Deployment: See [DEPLOYMENT.md](DEPLOYMENT.md)
- Contact: info@dallasmmaboxing.com
- GitHub Issues: https://github.com/andyprevalsky/dallasmmaboxing/issues
