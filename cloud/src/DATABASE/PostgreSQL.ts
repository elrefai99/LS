import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.POSTGRESQL_USER as string,
  host: process.env.POSTGRESQL_HOST as string,
  database: process.env.POSTGRESQL_DATABASE as string,
  password: process.env.POSTGRESQL_PASWORD as string,
  port: process.env.POSTGRESQL_PORT as any,
});

export async function connectToDatabase() {
  try {
    const client = await pool.connect();
    console.log('PostgreSQL is running');

    client.release();
  } catch (err) {
    console.error('Database connection error:', err);
  }
}
