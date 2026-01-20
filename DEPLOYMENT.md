# Deployment Guide - Dallas MMA Boxing API

This guide covers deploying the backend API to Render.

## Prerequisites

- GitHub account
- Render account (https://render.com)
- Code pushed to GitHub repository

## Deployment Steps

### Option 1: Using render.yaml (Recommended)

The repository includes a `render.yaml` file that automatically configures both the web service and PostgreSQL database.

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "feat: initial backend setup"
   git push origin main
   ```

2. **Create New Blueprint on Render**
   - Go to https://dashboard.render.com
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file
   - Review the services that will be created:
     - Web Service: `dallasmmaboxing-api`
     - PostgreSQL Database: `dallasmmaboxing-db`
   - Click "Apply" to create all services

3. **The deployment will**:
   - Create a PostgreSQL database
   - Create a web service
   - Automatically link the database to the web service
   - Set up environment variables
   - Build and deploy the API

### Option 2: Manual Setup

If you prefer to set up services manually:

#### 1. Create PostgreSQL Database

1. Go to https://dashboard.render.com
2. Click "New" → "PostgreSQL"
3. Configure:
   - Name: `dallasmmaboxing-db`
   - Database: `dallasmmaboxing`
   - User: `dallasmmaboxing_user`
   - Region: Choose closest to your users
   - Plan: Free (or paid for production)
4. Click "Create Database"
5. **Copy the Internal Database URL** (you'll need this)

#### 2. Create Web Service

1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - Name: `dallasmmaboxing-api`
   - Region: Same as database
   - Branch: `main`
   - Root Directory: Leave empty
   - Environment: `Node`
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`
   - Plan: Free (or paid for production)

4. **Add Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
   - `DATABASE_URL` = [Paste Internal Database URL from step 1]
   - `CORS_ORIGIN` = `*` (or your frontend URL)

5. Click "Create Web Service"

## Post-Deployment

### 1. Verify Deployment

Once deployed, your API will be available at:
```
https://dallasmmaboxing-api.onrender.com
```

Test the health endpoint:
```bash
curl https://dallasmmaboxing-api.onrender.com/api/health
```

### 2. Database Migration

Currently, the app uses mock data. To set up actual database tables:

1. Connect to your database via Render dashboard
2. Run the SQL schema (create a `schema.sql` file in backend):

```sql
-- Classes table
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  schedule VARCHAR(255),
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients table
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  stripe_id VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Release Forms table
CREATE TABLE release_forms (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  signed_pdf_url TEXT,
  signed_date TIMESTAMP,
  is_signed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_payments_client_id ON payments(client_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_release_forms_client_id ON release_forms(client_id);
CREATE INDEX idx_clients_email ON clients(email);
```

3. Update the model files to use actual database queries instead of mock data

### 3. Environment Variables for Production

Add these additional environment variables as you integrate services:

**Stripe (for payments):**
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

**AWS S3 (for file uploads):**
```
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=dallasmmaboxing-files
```

## Monitoring

1. **Logs**: View real-time logs in the Render dashboard
2. **Metrics**: Monitor CPU, memory, and response times
3. **Alerts**: Set up alerts for downtime or errors

## Custom Domain (Optional)

1. Go to your web service settings
2. Click "Custom Domain"
3. Add your domain (e.g., `api.dallasmmaboxing.com`)
4. Update your DNS records as instructed

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify `package.json` scripts are correct
- Ensure all dependencies are listed

### Database Connection Issues
- Verify `DATABASE_URL` environment variable is set
- Check database is in same region as web service
- Ensure database is running (Free tier sleeps after inactivity)

### API Not Responding
- Check service logs for errors
- Verify PORT is set to 10000
- Check if service is running (Free tier sleeps after 15 min inactivity)

## Free Tier Limitations

Render's free tier includes:
- **Web Service**: Sleeps after 15 minutes of inactivity, cold start takes ~30 seconds
- **Database**: 90 days of inactivity before deletion, limited storage (1GB)
- **Build Minutes**: 400 build minutes per month

For production, consider upgrading to a paid plan.

## Next Steps

1. Set up database tables (remove mock data)
2. Implement Stripe payment integration
3. Set up AWS S3 for PDF storage
4. Add authentication/authorization
5. Set up monitoring and error tracking
6. Configure custom domain
7. Set up CI/CD pipeline

## Support

For issues with Render: https://render.com/docs
For API issues: Check the backend/README.md
