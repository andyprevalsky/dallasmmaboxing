/**
 * Notification Service
 * Handles SMS and Email notifications for payment confirmations
 * Currently using mock implementations for testing
 */

export interface NotificationData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  confirmationUrl: string;
  releaseFormUrl?: string;
  paymentAmount: number;
  paymentId: number;
}

/**
 * Mock SMS Service
 * In production, integrate with Twilio, AWS SNS, or similar service
 */
class SMSService {
  private readonly gymPhone = '972-977-5605';

  async sendSMS(to: string, message: string): Promise<boolean> {
    console.log('📱 [MOCKED SMS] Sending SMS');
    console.log(`   To: ${to}`);
    console.log(`   Message: ${message}`);
    console.log('   ✅ SMS sent successfully (mocked)');

    // TODO: Replace with actual SMS service
    // Example with Twilio:
    // const client = twilio(accountSid, authToken);
    // await client.messages.create({
    //   body: message,
    //   from: twilioPhoneNumber,
    //   to: to
    // });

    return true;
  }

  async sendPaymentConfirmation(data: NotificationData): Promise<void> {
    const message = this.buildConfirmationMessage(data);

    // Send to gym owner
    await this.sendSMS(this.gymPhone, message);

    // Send to client
    await this.sendSMS(data.clientPhone, message);
  }

  private buildConfirmationMessage(data: NotificationData): string {
    let message = `Dallas MMA Boxing - Payment Confirmed!\n\n`;
    message += `Client: ${data.clientName}\n`;
    message += `Amount: $${data.paymentAmount.toFixed(2)}\n`;
    message += `Confirmation: ${data.confirmationUrl}\n`;

    if (data.releaseFormUrl) {
      message += `Release Form: ${data.releaseFormUrl}\n`;
    }

    return message;
  }
}

/**
 * Mock Email Service
 * In production, integrate with SendGrid, AWS SES, Mailgun, or similar service
 */
class EmailService {
  private readonly gymEmail = 'georgeprevalsky@gmail.com';

  async sendEmail(to: string, subject: string, htmlBody: string, textBody: string): Promise<boolean> {
    console.log('📧 [MOCKED EMAIL] Sending Email');
    console.log(`   To: ${to}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Body (text): ${textBody.substring(0, 100)}...`);
    console.log(`   HTML length: ${htmlBody.length} characters`);
    console.log('   ✅ Email sent successfully (mocked)');

    // TODO: Replace with actual email service
    // Example with SendGrid:
    // const msg = {
    //   to,
    //   from: 'noreply@dallasmmaboxing.com',
    //   subject,
    //   text: textBody,
    //   html: htmlBody,
    // };
    // await sgMail.send(msg);

    return true;
  }

  async sendPaymentConfirmation(data: NotificationData): Promise<void> {
    const subject = 'Payment Confirmation - Dallas MMA Boxing';
    const { htmlBody, textBody } = this.buildConfirmationEmail(data);

    // Send to gym owner
    await this.sendEmail(this.gymEmail, subject, htmlBody, textBody);

    // Send to client
    await this.sendEmail(data.clientEmail, subject, htmlBody, textBody);
  }

  private buildConfirmationEmail(data: NotificationData): { htmlBody: string; textBody: string } {
    // Text version
    const textBody = `
Dallas MMA Boxing - Payment Confirmation

Dear ${data.clientName},

Thank you for your payment! Your transaction has been processed successfully.

Payment Details:
- Amount: $${data.paymentAmount.toFixed(2)}
- Payment ID: #${data.paymentId}
- Date: ${new Date().toLocaleDateString()}

View your confirmation: ${data.confirmationUrl}
${data.releaseFormUrl ? `Download release form: ${data.releaseFormUrl}` : ''}

If you have any questions, please contact us.

Best regards,
Dallas MMA Boxing Team
    `.trim();

    // HTML version
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9fafb; padding: 20px; margin: 20px 0; }
    .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #dc2626; }
    .button { display: inline-block; background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 10px 0; }
    .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Payment Confirmation</h1>
    </div>

    <div class="content">
      <p>Dear ${data.clientName},</p>

      <p>Thank you for your payment! Your transaction has been processed successfully.</p>

      <div class="details">
        <h3>Payment Details</h3>
        <p><strong>Amount:</strong> $${data.paymentAmount.toFixed(2)}</p>
        <p><strong>Payment ID:</strong> #${data.paymentId}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      </div>

      <p style="text-align: center;">
        <a href="${data.confirmationUrl}" class="button">View Confirmation</a>
      </p>

      ${data.releaseFormUrl ? `
      <p style="text-align: center;">
        <a href="${data.releaseFormUrl}" class="button">Download Release Form</a>
      </p>
      ` : ''}

      <p>If you have any questions, please don't hesitate to contact us.</p>

      <p>Best regards,<br>
      <strong>Dallas MMA Boxing Team</strong></p>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Dallas MMA Boxing. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    return { htmlBody, textBody };
  }
}

/**
 * Main Notification Service
 * Orchestrates SMS and Email notifications
 */
export class NotificationService {
  private smsService: SMSService;
  private emailService: EmailService;

  constructor() {
    this.smsService = new SMSService();
    this.emailService = new EmailService();
  }

  /**
   * Send payment confirmation notifications
   * Sends both SMS and Email to gym owner and client
   */
  async sendPaymentConfirmationNotifications(data: NotificationData): Promise<void> {
    console.log('🔔 Starting notification process for payment confirmation');
    console.log(`   Client: ${data.clientName}`);
    console.log(`   Amount: $${data.paymentAmount}`);

    try {
      // Send SMS notifications
      await this.smsService.sendPaymentConfirmation(data);

      // Send Email notifications
      await this.emailService.sendPaymentConfirmation(data);

      console.log('✅ All notifications sent successfully');
    } catch (error) {
      console.error('❌ Error sending notifications:', error);
      throw new Error('Failed to send notifications');
    }
  }

  /**
   * Send individual SMS (for custom use cases)
   */
  async sendSMS(to: string, message: string): Promise<boolean> {
    return this.smsService.sendSMS(to, message);
  }

  /**
   * Send individual email (for custom use cases)
   */
  async sendEmail(to: string, subject: string, htmlBody: string, textBody: string): Promise<boolean> {
    return this.emailService.sendEmail(to, subject, htmlBody, textBody);
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
