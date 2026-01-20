// import { query } from '../config/database';

export interface Payment {
  id: number;
  client_id: number;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  stripe_id?: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class PaymentModel {
  // Mock data for demonstration
  private static mockPayments: Payment[] = [
    {
      id: 1,
      client_id: 1,
      amount: 120.00,
      status: 'completed',
      stripe_id: 'ch_mock_123456',
      description: 'Monthly membership - January 2026',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      client_id: 2,
      amount: 150.00,
      status: 'pending',
      stripe_id: 'ch_mock_789012',
      description: 'Monthly membership - January 2026',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  static async findAll(): Promise<Payment[]> {
    console.log('🔵 [MOCKED]: Fetching all payments');
    // TODO: Replace with actual database query
    // const result = await query('SELECT * FROM payments ORDER BY created_at DESC');
    // return result.rows;
    return this.mockPayments;
  }

  static async findById(id: number): Promise<Payment | null> {
    console.log(`🔵 [MOCKED]: Fetching payment with id ${id}`);
    // TODO: Replace with actual database query
    // const result = await query('SELECT * FROM payments WHERE id = $1', [id]);
    // return result.rows[0] || null;
    return this.mockPayments.find(p => p.id === id) || null;
  }

  static async findByClientId(clientId: number): Promise<Payment[]> {
    console.log(`🔵 [MOCKED]: Fetching payments for client ${clientId}`);
    // TODO: Replace with actual database query
    // const result = await query('SELECT * FROM payments WHERE client_id = $1 ORDER BY created_at DESC', [clientId]);
    // return result.rows;
    return this.mockPayments.filter(p => p.client_id === clientId);
  }

  static async create(paymentData: Omit<Payment, 'id' | 'created_at' | 'updated_at'>): Promise<Payment> {
    console.log('🔵 [MOCKED]: Creating new payment', paymentData);
    // TODO: Replace with actual database query
    // const result = await query(
    //   'INSERT INTO payments (client_id, amount, status, stripe_id, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    //   [paymentData.client_id, paymentData.amount, paymentData.status, paymentData.stripe_id, paymentData.description]
    // );
    // return result.rows[0];
    const newPayment: Payment = {
      id: this.mockPayments.length + 1,
      ...paymentData,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.mockPayments.push(newPayment);
    return newPayment;
  }

  static async update(id: number, paymentData: Partial<Omit<Payment, 'id' | 'created_at'>>): Promise<Payment | null> {
    console.log(`🔵 [MOCKED]: Updating payment ${id}`, paymentData);
    // TODO: Replace with actual database query
    const index = this.mockPayments.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.mockPayments[index] = {
      ...this.mockPayments[index],
      ...paymentData,
      updated_at: new Date(),
    };
    return this.mockPayments[index];
  }

  static async delete(id: number): Promise<boolean> {
    console.log(`🔵 [MOCKED]: Deleting payment ${id}`);
    // TODO: Replace with actual database query
    const index = this.mockPayments.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.mockPayments.splice(index, 1);
    return true;
  }
}
