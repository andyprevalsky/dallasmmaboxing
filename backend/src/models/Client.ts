// import { query } from '../config/database';

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class ClientModel {
  // Mock data for demonstration
  private static mockClients: Client[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(214) 555-0100',
      address: '123 Main St, Dallas, TX 75201',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '(214) 555-0200',
      address: '456 Oak Ave, Dallas, TX 75202',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  static async findAll(): Promise<Client[]> {
    console.log('🔵 [MOCKED]: Fetching all clients');
    // TODO: Replace with actual database query
    // const result = await query('SELECT * FROM clients ORDER BY id');
    // return result.rows;
    return this.mockClients;
  }

  static async findById(id: number): Promise<Client | null> {
    console.log(`🔵 [MOCKED]: Fetching client with id ${id}`);
    // TODO: Replace with actual database query
    // const result = await query('SELECT * FROM clients WHERE id = $1', [id]);
    // return result.rows[0] || null;
    return this.mockClients.find(c => c.id === id) || null;
  }

  static async findByEmail(email: string): Promise<Client | null> {
    console.log(`🔵 [MOCKED]: Fetching client with email ${email}`);
    // TODO: Replace with actual database query
    // const result = await query('SELECT * FROM clients WHERE email = $1', [email]);
    // return result.rows[0] || null;
    return this.mockClients.find(c => c.email === email) || null;
  }

  static async create(clientData: Omit<Client, 'id' | 'created_at' | 'updated_at'>): Promise<Client> {
    console.log('🔵 [MOCKED]: Creating new client', clientData);
    // TODO: Replace with actual database query
    // const result = await query(
    //   'INSERT INTO clients (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
    //   [clientData.name, clientData.email, clientData.phone, clientData.address]
    // );
    // return result.rows[0];
    const newClient: Client = {
      id: this.mockClients.length + 1,
      ...clientData,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.mockClients.push(newClient);
    return newClient;
  }

  static async update(id: number, clientData: Partial<Omit<Client, 'id' | 'created_at'>>): Promise<Client | null> {
    console.log(`🔵 [MOCKED]: Updating client ${id}`, clientData);
    // TODO: Replace with actual database query
    const index = this.mockClients.findIndex(c => c.id === id);
    if (index === -1) return null;

    this.mockClients[index] = {
      ...this.mockClients[index],
      ...clientData,
      updated_at: new Date(),
    };
    return this.mockClients[index];
  }

  static async delete(id: number): Promise<boolean> {
    console.log(`🔵 [MOCKED]: Deleting client ${id}`);
    // TODO: Replace with actual database query
    const index = this.mockClients.findIndex(c => c.id === id);
    if (index === -1) return false;

    this.mockClients.splice(index, 1);
    return true;
  }
}
