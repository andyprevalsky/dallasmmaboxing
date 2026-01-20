import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Mocked database connection for now
// This will be replaced with actual PostgreSQL connection when deployed to Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export const query = async (text: string, params?: any[]): Promise<any> => {
  // Mock implementation - returns empty results
  console.log('🔵 [MOCKED DB QUERY]:', text, params);
  return { rows: [], rowCount: 0 };
};

export const getClient = async () => {
  // Mock implementation
  console.log('🔵 [MOCKED DB CLIENT]: Getting database client');
  return pool.connect();
};

export default pool;
