import { Pool, PoolClient, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * PostgreSQL Database Configuration
 *
 * In development with mock data:
 * - Set MOCK_DATABASE=true in .env
 * - No actual database connection will be made
 *
 * In production with real database:
 * - Set DATABASE_URL in .env (Render provides this automatically)
 * - Ensure schema.sql has been run to create tables
 */

const useMockDatabase = process.env.MOCK_DATABASE === 'true';

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Connection pool settings
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error if connection takes longer than 2 seconds
});

// Test database connection on startup
if (!useMockDatabase) {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('❌ Error connecting to database:', err.stack);
      console.log('💡 Set MOCK_DATABASE=true in .env to use mock data during development');
    } else {
      console.log('✅ Database connected successfully');
      if (client) {
        release();
      }
    }
  });

  // Handle pool errors
  pool.on('error', (err) => {
    console.error('❌ Unexpected database pool error:', err);
  });
}

/**
 * Execute a SQL query
 * @param text SQL query string
 * @param params Query parameters
 * @returns Query result
 */
export const query = async (text: string, params?: any[]): Promise<QueryResult> => {
  if (useMockDatabase) {
    console.log('🔵 [MOCKED DB QUERY]:', text.substring(0, 100) + (text.length > 100 ? '...' : ''));
    if (params && params.length > 0) {
      console.log('   Params:', params);
    }
    return {
      rows: [],
      rowCount: 0,
      command: '',
      oid: 0,
      fields: [],
    } as QueryResult;
  }

  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;

    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 [DB QUERY]:', text.substring(0, 100) + (text.length > 100 ? '...' : ''));
      console.log(`   Duration: ${duration}ms | Rows: ${result.rowCount}`);
    }

    return result;
  } catch (error) {
    console.error('❌ Database query error:', error);
    console.error('   Query:', text);
    if (params) {
      console.error('   Params:', params);
    }
    throw error;
  }
};

/**
 * Get a client from the pool for transactions
 * Remember to release the client when done
 */
export const getClient = async (): Promise<PoolClient> => {
  if (useMockDatabase) {
    console.log('🔵 [MOCKED DB CLIENT]: Getting database client');
    // Return a mock client for development
    return pool.connect();
  }

  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error('❌ Error getting database client:', error);
    throw error;
  }
};

/**
 * Execute a transaction
 * @param callback Function that performs queries within a transaction
 */
export const transaction = async <T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> => {
  if (useMockDatabase) {
    console.log('🔵 [MOCKED TRANSACTION]: Running transaction');
    const client = await pool.connect();
    try {
      return await callback(client);
    } finally {
      client.release();
    }
  }

  const client = await getClient();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Check if database is healthy
 */
export const healthCheck = async (): Promise<boolean> => {
  if (useMockDatabase) {
    console.log('🔵 [MOCKED]: Database health check (always healthy in mock mode)');
    return true;
  }

  try {
    await query('SELECT 1');
    return true;
  } catch (error) {
    console.error('❌ Database health check failed:', error);
    return false;
  }
};

/**
 * Close all connections in the pool
 * Use this when shutting down the application
 */
export const closePool = async (): Promise<void> => {
  try {
    await pool.end();
    console.log('✅ Database pool closed');
  } catch (error) {
    console.error('❌ Error closing database pool:', error);
  }
};

// Export pool for advanced usage
export default pool;
