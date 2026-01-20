# Notification System Documentation

## Overview

The notification system automatically sends SMS and email notifications when payments are completed. It notifies both the gym owner and the client with payment confirmation details.

## Features

- **Dual Notification**: Sends both SMS and email
- **Automatic Triggers**: Notifications sent on payment completion
- **Mock Implementation**: Currently using mock services for testing
- **Production Ready Structure**: Easy to integrate with real SMS/Email providers

## Recipients

### SMS Notifications
- **Gym Owner**: 972-977-5605
- **Client**: Uses phone number from client record

### Email Notifications
- **Gym Owner**: georgeprevalsky@gmail.com
- **Client**: Uses email from client record

## Notification Content

Each notification includes:
- Client name
- Payment amount
- Payment ID
- Payment date
- Confirmation page URL
- Release form URL (when available)

## Technical Implementation

### Service Location
`/backend/src/services/notificationService.ts`

### Integration Points

1. **Create Payment** (`paymentController.ts:87-120`)
   - Triggered when a payment is created with status "completed"

2. **Update Payment** (`paymentController.ts:154-182`)
   - Triggered when payment status changes from non-completed to "completed"

### Code Example

```typescript
import { notificationService } from '../services/notificationService';

// Send notification after successful payment
await notificationService.sendPaymentConfirmationNotifications({
  clientName: 'John Doe',
  clientEmail: 'john@example.com',
  clientPhone: '(214) 555-0100',
  confirmationUrl: 'http://example.com/confirmation/123',
  releaseFormUrl: 'http://example.com/forms/release-123.pdf',
  paymentAmount: 150.00,
  paymentId: 123,
});
```

## Testing

The system currently uses mock implementations that log to console.

### Test Creating a Payment

```bash
curl -X POST http://localhost:3001/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": 1,
    "amount": 150.00,
    "status": "completed",
    "description": "Test payment"
  }'
```

### Test Updating a Payment Status

```bash
curl -X PUT http://localhost:3001/api/payments/2 \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

### Expected Console Output

```
🔔 Starting notification process for payment confirmation
   Client: John Doe
   Amount: $150
📱 [MOCKED SMS] Sending SMS
   To: 972-977-5605
   Message: Dallas MMA Boxing - Payment Confirmed!
   ...
   ✅ SMS sent successfully (mocked)
📧 [MOCKED EMAIL] Sending Email
   To: georgeprevalsky@gmail.com
   Subject: Payment Confirmation - Dallas MMA Boxing
   ...
   ✅ Email sent successfully (mocked)
✅ All notifications sent successfully
```

## Production Integration

### SMS Service (Twilio Example)

Replace the mock SMS service in `notificationService.ts:28-42` with:

```typescript
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async sendSMS(to: string, message: string): Promise<boolean> {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: to
  });
  return true;
}
```

### Email Service (SendGrid Example)

Replace the mock email service in `notificationService.ts:73-97` with:

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async sendEmail(to: string, subject: string, htmlBody: string, textBody: string): Promise<boolean> {
  await sgMail.send({
    to,
    from: process.env.EMAIL_FROM || 'noreply@dallasmmaboxing.com',
    subject,
    text: textBody,
    html: htmlBody,
  });
  return true;
}
```

### Environment Variables

Add to `.env`:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@dallasmmaboxing.com

# Frontend URL (for confirmation links)
FRONTEND_URL=https://dallasmmaboxing.com
```

### Dependencies

For production, install the necessary packages:

```bash
# For Twilio
npm install twilio

# For SendGrid
npm install @sendgrid/mail
```

## Error Handling

- Notification failures do not prevent payment creation/update
- All errors are logged to console
- Failed notifications should be monitored and potentially retried

## Future Enhancements

1. **Notification Queue**: Implement a message queue (Redis, RabbitMQ) for reliable delivery
2. **Retry Logic**: Automatic retry on failure
3. **Delivery Tracking**: Store notification delivery status in database
4. **Templates**: External template system for easier content updates
5. **Preferences**: Allow clients to opt-in/out of notifications
6. **Multi-language**: Support for Spanish and other languages

## Troubleshooting

### Notifications Not Sending

1. Check that payment status is "completed"
2. Verify client exists in database
3. Check console logs for error messages
4. Ensure client has valid email and phone

### Invalid Phone Format

Ensure phone numbers are in E.164 format for production:
- Correct: +12145550100
- Incorrect: (214) 555-0100

### Email Delivery Issues

For production email delivery:
1. Verify sender domain is authenticated
2. Check SPF/DKIM records
3. Monitor bounce rates
4. Use a transactional email service (SendGrid, AWS SES, Mailgun)
