// import { query } from '../config/database';

export interface Class {
  id: number;
  name: string;
  description: string;
  schedule: string;
  price: number;
  created_at?: Date;
  updated_at?: Date;
}

export class ClassModel {
  // Mock data for demonstration
  private static mockClasses: Class[] = [
    {
      id: 1,
      name: 'Beginner Boxing',
      description: 'Introduction to boxing fundamentals',
      schedule: 'Mon, Wed, Fri - 6:00 PM',
      price: 120.00,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: 'Advanced MMA',
      description: 'Mixed martial arts for experienced fighters',
      schedule: 'Tue, Thu - 7:00 PM',
      price: 150.00,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  static async findAll(): Promise<Class[]> {
    console.log('🔵 [MOCKED]: Fetching all classes');
    // TODO: Replace with actual database query
    // const result = await query('SELECT * FROM classes ORDER BY id');
    // return result.rows;
    return this.mockClasses;
  }

  static async findById(id: number): Promise<Class | null> {
    console.log(`🔵 [MOCKED]: Fetching class with id ${id}`);
    // TODO: Replace with actual database query
    // const result = await query('SELECT * FROM classes WHERE id = $1', [id]);
    // return result.rows[0] || null;
    return this.mockClasses.find(c => c.id === id) || null;
  }

  static async create(classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>): Promise<Class> {
    console.log('🔵 [MOCKED]: Creating new class', classData);
    // TODO: Replace with actual database query
    // const result = await query(
    //   'INSERT INTO classes (name, description, schedule, price) VALUES ($1, $2, $3, $4) RETURNING *',
    //   [classData.name, classData.description, classData.schedule, classData.price]
    // );
    // return result.rows[0];
    const newClass: Class = {
      id: this.mockClasses.length + 1,
      ...classData,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.mockClasses.push(newClass);
    return newClass;
  }

  static async update(id: number, classData: Partial<Omit<Class, 'id' | 'created_at'>>): Promise<Class | null> {
    console.log(`🔵 [MOCKED]: Updating class ${id}`, classData);
    // TODO: Replace with actual database query
    const index = this.mockClasses.findIndex(c => c.id === id);
    if (index === -1) return null;

    this.mockClasses[index] = {
      ...this.mockClasses[index],
      ...classData,
      updated_at: new Date(),
    };
    return this.mockClasses[index];
  }

  static async delete(id: number): Promise<boolean> {
    console.log(`🔵 [MOCKED]: Deleting class ${id}`);
    // TODO: Replace with actual database query
    const index = this.mockClasses.findIndex(c => c.id === id);
    if (index === -1) return false;

    this.mockClasses.splice(index, 1);
    return true;
  }
}
