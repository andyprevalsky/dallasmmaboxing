// import { query } from '../config/database';

export interface ReleaseForm {
  id: number;
  client_id: number;
  signed_pdf_url?: string;
  signed_date?: Date;
  is_signed: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class ReleaseFormModel {
  // Mock data for demonstration
  private static mockForms: ReleaseForm[] = [
    {
      id: 1,
      client_id: 1,
      signed_pdf_url: 'https://storage.example.com/forms/client-1-release.pdf',
      signed_date: new Date('2026-01-15'),
      is_signed: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      client_id: 2,
      signed_pdf_url: undefined,
      signed_date: undefined,
      is_signed: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  static async findAll(): Promise<ReleaseForm[]> {
    console.log('🔵 [MOCKED]: Fetching all release forms');
    // TODO: Replace with actual database query
    // const result = await query('SELECT * FROM release_forms ORDER BY id');
    // return result.rows;
    return this.mockForms;
  }

  static async findById(id: number): Promise<ReleaseForm | null> {
    console.log(`🔵 [MOCKED]: Fetching release form with id ${id}`);
    // TODO: Replace with actual database query
    // const result = await query('SELECT * FROM release_forms WHERE id = $1', [id]);
    // return result.rows[0] || null;
    return this.mockForms.find(f => f.id === id) || null;
  }

  static async findByClientId(clientId: number): Promise<ReleaseForm | null> {
    console.log(`🔵 [MOCKED]: Fetching release form for client ${clientId}`);
    // TODO: Replace with actual database query
    // const result = await query('SELECT * FROM release_forms WHERE client_id = $1', [clientId]);
    // return result.rows[0] || null;
    return this.mockForms.find(f => f.client_id === clientId) || null;
  }

  static async create(formData: Omit<ReleaseForm, 'id' | 'created_at' | 'updated_at'>): Promise<ReleaseForm> {
    console.log('🔵 [MOCKED]: Creating new release form', formData);
    // TODO: Replace with actual database query
    // const result = await query(
    //   'INSERT INTO release_forms (client_id, signed_pdf_url, signed_date, is_signed) VALUES ($1, $2, $3, $4) RETURNING *',
    //   [formData.client_id, formData.signed_pdf_url, formData.signed_date, formData.is_signed]
    // );
    // return result.rows[0];
    const newForm: ReleaseForm = {
      id: this.mockForms.length + 1,
      ...formData,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.mockForms.push(newForm);
    return newForm;
  }

  static async update(id: number, formData: Partial<Omit<ReleaseForm, 'id' | 'created_at'>>): Promise<ReleaseForm | null> {
    console.log(`🔵 [MOCKED]: Updating release form ${id}`, formData);
    // TODO: Replace with actual database query
    const index = this.mockForms.findIndex(f => f.id === id);
    if (index === -1) return null;

    this.mockForms[index] = {
      ...this.mockForms[index],
      ...formData,
      updated_at: new Date(),
    };
    return this.mockForms[index];
  }

  static async delete(id: number): Promise<boolean> {
    console.log(`🔵 [MOCKED]: Deleting release form ${id}`);
    // TODO: Replace with actual database query
    const index = this.mockForms.findIndex(f => f.id === id);
    if (index === -1) return false;

    this.mockForms.splice(index, 1);
    return true;
  }
}
