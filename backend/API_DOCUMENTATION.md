# Dallas MMA Boxing - API Documentation

Complete API documentation for the Dallas MMA Boxing management system backend.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-api-domain.onrender.com/api`

## Authentication

Currently, the API does not require authentication. For production, consider implementing:
- JWT tokens for client authentication
- API keys for admin access
- OAuth for social login

## Response Format

All API responses follow this standard format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "details": [ ... ] // Optional validation details
}
```

## Endpoints

### Health Check

#### GET /health

Check if the API is running and healthy.

**Response:**
```json
{
  "success": true,
  "message": "Dallas MMA Boxing API is running",
  "timestamp": "2026-01-21T12:00:00.000Z"
}
```

---

## Classes

### GET /classes

Get all available classes.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Beginner Boxing",
      "description": "Introduction to boxing fundamentals",
      "schedule": "Mon, Wed, Fri - 6:00 PM",
      "price": 120.00,
      "created_at": "2026-01-01T00:00:00.000Z",
      "updated_at": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /classes/:id

Get a specific class by ID.

**Parameters:**
- `id` (number) - Class ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Beginner Boxing",
    "description": "Introduction to boxing fundamentals",
    "schedule": "Mon, Wed, Fri - 6:00 PM",
    "price": 120.00
  }
}
```

### POST /classes

Create a new class.

**Request Body:**
```json
{
  "name": "Advanced MMA",
  "description": "Mixed martial arts for experienced fighters",
  "schedule": "Tue, Thu - 7:00 PM",
  "price": 150.00
}
```

**Validation:**
- `name` (string, required, max 255)
- `description` (string, optional)
- `schedule` (string, optional)
- `price` (number, required, must be positive)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Advanced MMA",
    "description": "Mixed martial arts for experienced fighters",
    "schedule": "Tue, Thu - 7:00 PM",
    "price": 150.00,
    "created_at": "2026-01-21T12:00:00.000Z",
    "updated_at": "2026-01-21T12:00:00.000Z"
  }
}
```

### PUT /classes/:id

Update an existing class.

**Parameters:**
- `id` (number) - Class ID

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Class Name",
  "price": 130.00
}
```

### DELETE /classes/:id

Delete a class.

**Parameters:**
- `id` (number) - Class ID

**Response:**
```json
{
  "success": true,
  "message": "Class deleted successfully"
}
```

---

## Clients

### GET /clients

Get all clients.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "(214) 555-0100",
      "address": "123 Main St, Dallas, TX 75201",
      "created_at": "2026-01-01T00:00:00.000Z",
      "updated_at": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /clients/:id

Get a specific client by ID.

### POST /clients

Create a new client.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "(214) 555-0200",
  "address": "456 Oak Ave, Dallas, TX 75202"
}
```

**Validation:**
- `name` (string, required, max 255)
- `email` (string, required, must be valid email)
- `phone` (string, required)
- `address` (string, optional)

### PUT /clients/:id

Update an existing client.

### DELETE /clients/:id

Delete a client.

---

## Payments

### GET /payments

Get all payments.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "client_id": 1,
      "amount": 120.00,
      "status": "completed",
      "stripe_id": "pi_xxxxxxxxxx",
      "description": "Monthly membership - January 2026",
      "created_at": "2026-01-15T12:00:00.000Z",
      "updated_at": "2026-01-15T12:00:00.000Z"
    }
  ]
}
```

### GET /payments/:id

Get a specific payment by ID.

### GET /payments/client/:clientId

Get all payments for a specific client.

**Parameters:**
- `clientId` (number) - Client ID

### POST /payments

Create a new payment record.

**Request Body:**
```json
{
  "client_id": 1,
  "amount": 120.00,
  "status": "pending",
  "stripe_id": "pi_xxxxxxxxxx",
  "description": "Monthly membership"
}
```

**Validation:**
- `client_id` (number, required, must be positive)
- `amount` (number, required, must be positive)
- `status` (enum, required: "pending" | "completed" | "failed" | "refunded")
- `stripe_id` (string, optional)
- `description` (string, optional)

### PUT /payments/:id

Update a payment.

### DELETE /payments/:id

Delete a payment.

---

## Checkout & Payment Confirmation

### POST /payments/checkout

Create a checkout session for payment. This is the main endpoint for frontend integration.

**Request Body:**
```json
{
  "client": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "(214) 555-0100",
    "address": "123 Main St, Dallas, TX 75201"
  },
  "class_id": 1,
  "amount": 120.00,
  "description": "Beginner Boxing - Monthly Membership",
  "success_url": "https://yourfrontend.com/success",
  "cancel_url": "https://yourfrontend.com/cancel"
}
```

**Validation:**
- `client.name` (string, required)
- `client.email` (string, required, must be valid email)
- `client.phone` (string, required)
- `client.address` (string, optional)
- `class_id` (number, optional)
- `amount` (number, required, must be positive)
- `description` (string, optional)
- `success_url` (string, required, must be valid URL)
- `cancel_url` (string, required, must be valid URL)

**Response:**
```json
{
  "success": true,
  "data": {
    "checkout_url": "https://checkout.stripe.com/xxxxx",
    "session_id": "cs_xxxxx",
    "payment_id": 123,
    "client_id": 45
  }
}
```

**Process Flow:**
1. Finds or creates client record
2. Creates Stripe checkout session
3. Creates payment record with status "pending"
4. Generates release form PDF
5. Returns checkout URL for frontend redirect

### POST /payments/confirm

Confirm a payment after successful Stripe checkout.

**Request Body:**
```json
{
  "payment_intent_id": "pi_xxxxxxxxxx",
  "client_id": 1,
  "metadata": {
    "description": "Monthly membership"
  }
}
```

**Validation:**
- `payment_intent_id` (string, required)
- `client_id` (number, optional)
- `metadata` (object, optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "payment_id": 123,
    "status": "completed",
    "amount": 120.00,
    "client": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "release_form": {
      "id": 5,
      "url": "https://storage.example.com/forms/release-form-1-xxxxx.pdf"
    }
  },
  "message": "Payment confirmed successfully"
}
```

**Process Flow:**
1. Verifies payment with Stripe
2. Updates payment status to "completed"
3. Sends email notifications to client and gym owner
4. Sends SMS notifications to client and gym owner (972-977-5605)
5. Returns payment confirmation details

### POST /payments/webhook

Stripe webhook endpoint for receiving payment events.

**Important:** This endpoint should be configured in your Stripe dashboard.

**Headers:**
- `stripe-signature` (required) - Webhook signature for verification

**Webhook Events Handled:**
- `payment_intent.succeeded` - Payment successfully completed
- `payment_intent.payment_failed` - Payment failed
- `checkout.session.completed` - Checkout session completed

**Response:**
```json
{
  "received": true
}
```

**Webhook URL for Stripe Dashboard:**
```
https://your-api-domain.onrender.com/api/payments/webhook
```

---

## Release Forms

### GET /forms

Get all release forms.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "client_id": 1,
      "signed_pdf_url": "https://storage.example.com/forms/client-1-release.pdf",
      "signed_date": "2026-01-15T12:00:00.000Z",
      "is_signed": true,
      "created_at": "2026-01-15T10:00:00.000Z",
      "updated_at": "2026-01-15T12:00:00.000Z"
    }
  ]
}
```

### GET /forms/:id

Get a specific release form by ID.

### GET /forms/client/:clientId

Get a release form for a specific client.

### POST /forms

Create a new release form.

**Request Body:**
```json
{
  "client_id": 1,
  "signed_pdf_url": "https://storage.example.com/forms/form.pdf",
  "signed_date": "2026-01-15T12:00:00.000Z",
  "is_signed": true
}
```

### PUT /forms/:id

Update a release form (e.g., mark as signed).

### DELETE /forms/:id

Delete a release form.

---

## Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (duplicate entry)
- `500` - Internal Server Error
- `503` - Service Unavailable (database error)

---

## Notification System

When a payment is confirmed (status changes to "completed"), the system automatically:

### SMS Notifications (via Twilio)
- Sends SMS to **gym owner**: 972-977-5605
- Sends SMS to **client** with payment confirmation

**SMS Message Format:**
```
Dallas MMA Boxing - Payment Confirmed!

Client: John Doe
Amount: $120.00
Confirmation: https://yoursite.com/confirmation/123

Release Form: https://storage.example.com/forms/...
```

### Email Notifications (via SendGrid)
- Sends email to **gym owner**: georgeprevalsky@gmail.com
- Sends email to **client**

**Email includes:**
- Professional HTML email template
- Payment details (amount, date, ID)
- Links to confirmation page
- Links to release form PDF
- Company branding

---

## Frontend Integration

### Checkout Flow

1. **User fills out checkout form** on frontend `/checkout` route
2. **Frontend calls** `POST /api/payments/checkout`
3. **Backend returns** `checkout_url`
4. **Frontend redirects** user to Stripe checkout page
5. **User completes payment** on Stripe
6. **Stripe redirects** back to `success_url`
7. **Frontend calls** `POST /api/payments/confirm` with payment intent ID
8. **Backend confirms payment** and sends notifications
9. **Frontend shows** confirmation page with payment details

### Example Frontend Code

```javascript
// Step 1: Create checkout session
const response = await fetch('http://localhost:3000/api/payments/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    },
    class_id: selectedClassId,
    amount: 120.00,
    success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${window.location.origin}/checkout`
  })
});

const { data } = await response.json();

// Step 2: Redirect to Stripe checkout
window.location.href = data.checkout_url;
```

```javascript
// After successful payment, on success page:
const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get('session_id');

// Confirm payment
const response = await fetch('http://localhost:3000/api/payments/confirm', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    payment_intent_id: sessionId,
    client_id: clientId
  })
});

const { data } = await response.json();
// Show confirmation details
```

---

## Database Schema

The API uses PostgreSQL with the following tables:

### classes
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255) NOT NULL)
- `description` (TEXT)
- `schedule` (VARCHAR(255))
- `price` (DECIMAL(10, 2) NOT NULL)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### clients
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255) NOT NULL)
- `email` (VARCHAR(255) UNIQUE NOT NULL)
- `phone` (VARCHAR(50))
- `address` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### payments
- `id` (SERIAL PRIMARY KEY)
- `client_id` (INTEGER REFERENCES clients)
- `amount` (DECIMAL(10, 2) NOT NULL)
- `status` (VARCHAR(50))
- `stripe_id` (VARCHAR(255))
- `description` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### release_forms
- `id` (SERIAL PRIMARY KEY)
- `client_id` (INTEGER REFERENCES clients)
- `signed_pdf_url` (TEXT)
- `signed_date` (TIMESTAMP)
- `is_signed` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

---

## Production Deployment

### Environment Variables Required

```bash
# Essential
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://... (provided by Render)
FRONTEND_URL=https://your-frontend-domain.com
MOCK_DATABASE=false

# Stripe (required for payments)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Twilio (required for SMS)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...
GYM_OWNER_PHONE=+19729775605

# SendGrid (required for email)
SENDGRID_API_KEY=SG....
SENDGRID_FROM_EMAIL=noreply@dallasmmaboxing.com
GYM_OWNER_EMAIL=georgeprevalsky@gmail.com

# AWS S3 or Cloudinary (optional, for PDF storage)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=dallasmmaboxing-files
```

### Deployment Steps

1. **Database Setup**
   - Create PostgreSQL database on Render
   - Run `schema.sql` to create tables
   - Verify DATABASE_URL is set

2. **Stripe Configuration**
   - Switch to live mode keys
   - Configure webhook endpoint in Stripe dashboard
   - Add webhook URL: `https://your-api.onrender.com/api/payments/webhook`
   - Select events: `payment_intent.succeeded`, `checkout.session.completed`

3. **Notification Services**
   - Set up Twilio account and get credentials
   - Set up SendGrid account and verify sender email
   - Test notifications in staging first

4. **File Storage**
   - Set up AWS S3 bucket or Cloudinary account
   - Configure bucket permissions
   - Update environment variables

5. **Testing**
   - Test all endpoints
   - Verify payment flow end-to-end
   - Confirm notifications are sent
   - Check PDF generation and storage

---

## Support

For questions or issues:
- Email: georgeprevalsky@gmail.com
- Phone: (972) 977-5605
