/**
 * PDF Generation Service
 * Generates PDF documents for release forms
 * Uses PDFKit for PDF generation
 *
 * For production:
 * - Add AWS S3 or cloud storage integration to save PDFs
 * - Add digital signature support
 * - Add watermarking for security
 */

import PDFDocument from 'pdfkit';
import { Client } from '../models/Client';

export interface ReleaseFormData {
  client: Client;
  signatureDate?: Date;
  signatureImage?: Buffer | string;
}

export interface GeneratedPDF {
  buffer: Buffer;
  filename: string;
  url?: string; // For cloud storage
}

class PDFService {
  /**
   * Generate a release form PDF
   */
  async generateReleaseForm(data: ReleaseFormData): Promise<GeneratedPDF> {
    return new Promise((resolve, reject) => {
      try {
        console.log('📄 [PDF SERVICE]: Generating release form');
        console.log(`   Client: ${data.client.name}`);

        // Create a PDF document
        const doc = new PDFDocument({
          size: 'LETTER',
          margins: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50,
          },
        });

        // Buffer to store PDF data
        const buffers: Buffer[] = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          const filename = `release-form-${data.client.id}-${Date.now()}.pdf`;

          console.log(`   ✅ Generated PDF: ${filename} (${pdfBuffer.length} bytes)`);

          resolve({
            buffer: pdfBuffer,
            filename,
            url: `https://storage.example.com/forms/${filename}`, // Mock URL
          });
        });

        doc.on('error', (error) => {
          console.error('Error generating PDF:', error);
          reject(error);
        });

        // Add content to PDF
        this.addReleaseFormContent(doc, data);

        // Finalize the PDF
        doc.end();
      } catch (error) {
        console.error('Error creating PDF document:', error);
        reject(error);
      }
    });
  }

  /**
   * Add content to release form PDF
   */
  private addReleaseFormContent(doc: PDFKit.PDFDocument, data: ReleaseFormData): void {
    const { client, signatureDate } = data;

    // Header
    doc
      .fontSize(24)
      .font('Helvetica-Bold')
      .fillColor('#DC2626')
      .text('DALLAS MMA BOXING', { align: 'center' })
      .moveDown(0.5);

    doc
      .fontSize(18)
      .fillColor('#000000')
      .text('Liability Release and Waiver Form', { align: 'center' })
      .moveDown(2);

    // Introduction
    doc
      .fontSize(11)
      .font('Helvetica')
      .text(
        'This Liability Release and Waiver Form is entered into by and between Dallas MMA Boxing ("Gym") and the participant identified below ("Participant").',
        { align: 'justify' }
      )
      .moveDown(1.5);

    // Participant Information
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('PARTICIPANT INFORMATION')
      .moveDown(0.5);

    doc
      .fontSize(11)
      .font('Helvetica')
      .text(`Name: ${client.name}`)
      .text(`Email: ${client.email}`)
      .text(`Phone: ${client.phone}`);

    if (client.address) {
      doc.text(`Address: ${client.address}`);
    }

    doc.moveDown(1.5);

    // Terms and Conditions
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('TERMS AND CONDITIONS')
      .moveDown(0.5);

    const terms = [
      {
        title: '1. Assumption of Risk',
        content:
          'I acknowledge that participating in boxing, mixed martial arts (MMA), and related combat sports activities involves inherent risks, including but not limited to physical injury, property damage, and death. I voluntarily assume all such risks.',
      },
      {
        title: '2. Release of Liability',
        content:
          'I hereby release, waive, discharge, and covenant not to sue Dallas MMA Boxing, its owners, employees, instructors, and agents from any and all liability, claims, demands, or causes of action arising from my participation in activities at the Gym.',
      },
      {
        title: '3. Medical Clearance',
        content:
          'I certify that I am physically fit and have no medical conditions that would prevent my safe participation in the activities offered at the Gym. I agree to immediately notify the Gym of any changes to my health status.',
      },
      {
        title: '4. Safety Rules',
        content:
          'I agree to follow all safety rules and instructions provided by the Gym staff and instructors. I understand that failure to follow these rules may result in termination of my membership without refund.',
      },
      {
        title: '5. Equipment and Facilities',
        content:
          'I agree to use all equipment properly and in accordance with instructions. I will immediately report any damaged or unsafe equipment to Gym staff.',
      },
    ];

    doc.fontSize(11).font('Helvetica');

    terms.forEach((term) => {
      doc
        .font('Helvetica-Bold')
        .text(term.title)
        .font('Helvetica')
        .text(term.content, { align: 'justify' })
        .moveDown(0.8);
    });

    // Add new page if needed
    if (doc.y > 650) {
      doc.addPage();
    }

    doc.moveDown(1);

    // Acknowledgment
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('ACKNOWLEDGMENT')
      .moveDown(0.5);

    doc
      .fontSize(11)
      .font('Helvetica')
      .text(
        'I have read this Liability Release and Waiver Form and fully understand its contents. I voluntarily agree to its terms and conditions.',
        { align: 'justify' }
      )
      .moveDown(2);

    // Signature Section
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('SIGNATURE')
      .moveDown(1);

    // Signature line
    doc
      .fontSize(11)
      .font('Helvetica')
      .text('Participant Signature: _________________________________')
      .moveDown(0.5);

    // If signature image is provided (for future implementation)
    // if (data.signatureImage) {
    //   doc.image(data.signatureImage, {
    //     fit: [150, 50],
    //     align: 'left',
    //   });
    // }

    doc
      .text(`Participant Name: ${client.name}`)
      .moveDown(0.5)
      .text(`Date: ${signatureDate ? signatureDate.toLocaleDateString() : new Date().toLocaleDateString()}`)
      .moveDown(2);

    // Footer
    doc
      .fontSize(9)
      .fillColor('#666666')
      .text('Dallas MMA Boxing', { align: 'center' })
      .text('Contact: georgeprevalsky@gmail.com | Phone: (972) 977-5605', { align: 'center' })
      .text(`Generated: ${new Date().toLocaleString()}`, { align: 'center' });
  }

  /**
   * Generate a payment receipt PDF
   */
  async generatePaymentReceipt(paymentData: {
    client: Client;
    amount: number;
    paymentId: number;
    description?: string;
    paymentDate: Date;
  }): Promise<GeneratedPDF> {
    return new Promise((resolve, reject) => {
      try {
        console.log('📄 [PDF SERVICE]: Generating payment receipt');
        console.log(`   Client: ${paymentData.client.name}`);
        console.log(`   Amount: $${paymentData.amount.toFixed(2)}`);

        const doc = new PDFDocument({
          size: 'LETTER',
          margins: { top: 50, bottom: 50, left: 50, right: 50 },
        });

        const buffers: Buffer[] = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          const filename = `receipt-${paymentData.paymentId}-${Date.now()}.pdf`;

          console.log(`   ✅ Generated receipt: ${filename}`);

          resolve({
            buffer: pdfBuffer,
            filename,
            url: `https://storage.example.com/receipts/${filename}`, // Mock URL
          });
        });

        doc.on('error', reject);

        // Header
        doc
          .fontSize(24)
          .font('Helvetica-Bold')
          .fillColor('#DC2626')
          .text('DALLAS MMA BOXING', { align: 'center' })
          .moveDown(0.5);

        doc
          .fontSize(18)
          .fillColor('#000000')
          .text('Payment Receipt', { align: 'center' })
          .moveDown(2);

        // Receipt details
        doc
          .fontSize(12)
          .font('Helvetica')
          .text(`Receipt #: ${paymentData.paymentId}`)
          .text(`Date: ${paymentData.paymentDate.toLocaleDateString()}`)
          .moveDown(1.5);

        // Customer information
        doc
          .fontSize(14)
          .font('Helvetica-Bold')
          .text('CUSTOMER INFORMATION')
          .moveDown(0.5);

        doc
          .fontSize(11)
          .font('Helvetica')
          .text(`Name: ${paymentData.client.name}`)
          .text(`Email: ${paymentData.client.email}`)
          .moveDown(1.5);

        // Payment details
        doc
          .fontSize(14)
          .font('Helvetica-Bold')
          .text('PAYMENT DETAILS')
          .moveDown(0.5);

        doc
          .fontSize(11)
          .font('Helvetica')
          .text(`Description: ${paymentData.description || 'Class Membership'}`)
          .moveDown(1);

        doc
          .fontSize(16)
          .font('Helvetica-Bold')
          .text(`Amount Paid: $${paymentData.amount.toFixed(2)}`)
          .moveDown(2);

        // Thank you message
        doc
          .fontSize(12)
          .font('Helvetica')
          .text('Thank you for your payment!', { align: 'center' })
          .moveDown(0.5)
          .fontSize(10)
          .text('We look forward to training with you.', { align: 'center' })
          .moveDown(3);

        // Footer
        doc
          .fontSize(9)
          .fillColor('#666666')
          .text('Dallas MMA Boxing', { align: 'center' })
          .text('Contact: georgeprevalsky@gmail.com | Phone: (972) 977-5605', { align: 'center' });

        doc.end();
      } catch (error) {
        console.error('Error creating receipt PDF:', error);
        reject(error);
      }
    });
  }

  /**
   * Upload PDF to cloud storage (mock implementation)
   * In production, integrate with AWS S3, Google Cloud Storage, etc.
   */
  async uploadToStorage(pdfBuffer: Buffer, filename: string): Promise<string> {
    console.log('☁️  [MOCKED]: Uploading PDF to cloud storage');
    console.log(`   Filename: ${filename}`);
    console.log(`   Size: ${pdfBuffer.length} bytes`);

    // TODO: Implement real cloud storage upload
    // Example with AWS S3:
    // const s3 = new AWS.S3();
    // const params = {
    //   Bucket: process.env.AWS_S3_BUCKET || '',
    //   Key: `forms/${filename}`,
    //   Body: pdfBuffer,
    //   ContentType: 'application/pdf',
    //   ACL: 'private',
    // };
    // const result = await s3.upload(params).promise();
    // return result.Location;

    // Mock URL
    const mockUrl = `https://storage.example.com/forms/${filename}`;
    console.log(`   ✅ Mock upload complete: ${mockUrl}`);

    return mockUrl;
  }
}

// Export singleton instance
export const pdfService = new PDFService();
