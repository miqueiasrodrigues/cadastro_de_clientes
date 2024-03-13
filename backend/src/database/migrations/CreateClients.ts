import pool from "../pool";
import MigrationInterface from "./MigrationInterface";

export class CreateClients implements MigrationInterface {
  public async up(): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS clients (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(50) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          phone VARCHAR(20) NOT NULL UNIQUE,
          avatar VARCHAR(255) DEFAULT '',
          x_coordinate FLOAT NOT NULL,
          y_coordinate FLOAT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } finally {
      client.release();
    }
  }

  public async down(): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query("DROP TABLE IF EXISTS clients");
    } finally {
      client.release();
    }
  }
}
