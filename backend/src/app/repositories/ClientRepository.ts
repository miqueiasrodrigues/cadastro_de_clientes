import pool from "src/database/pool";
import IClient from "../models/interfaces/Client";
import IClientFilter from "../models/interfaces/ClientFilter";
import AppError from "src/utils/AppError";

class ClientRepository {
  constructor() {}

  async findByEmail(email: string) {
    const connection = await pool.connect();
    try {
      const query = "SELECT * FROM clients WHERE email = $1";
      const values = [email];
      const result = await connection.query(query, values);
      return result.rows[0] || null;
    } finally {
      connection.release();
    }
  }

  async findByPhone(phone: string) {
    const connection = await pool.connect();
    try {
      const query = "SELECT * FROM clients WHERE phone = $1";
      const values = [phone];
      const result = await connection.query(query, values);
      return result.rows[0] || null;
    } finally {
      connection.release();
    }
  }

  async findByCoordinates(
    x_coordinate: number,
    y_coordinate: number
  ): Promise<IClient[] | null> {
    const connection = await pool.connect();
    try {
      const query =
        "SELECT * FROM clients WHERE x_coordinate = $1 AND y_coordinate = $2";
      const values = [x_coordinate, y_coordinate];

      const result = await connection.query(query, values);
      return result.rows;
    } finally {
      connection.release();
    }
  }

  async findByFilters(
    filters: IClientFilter,
    limit: number,
    offset: number
  ): Promise<IClient[] | null> {
    const connection = await pool.connect();
    try {
      let query = "SELECT * FROM clients WHERE ";
      const filterKeys = Object.keys(filters);

      filterKeys.forEach((key, index) => {
        if (index !== 0) query += " AND ";
        query += `${key} ILIKE '%' || $${index + 1} || '%'`;
      });

      const values = filterKeys.map(
        (key) => filters[key as keyof IClientFilter]
      );

      query += ` LIMIT $${filterKeys.length + 1} OFFSET $${
        filterKeys.length + 2
      }`;

      values.push(limit.toString(), offset.toString());

      const result = await connection.query(query, values);
      return result.rows;
    } finally {
      connection.release();
    }
  }

  async find(id: number) {
    const connection = await pool.connect();
    try {
      const query = "SELECT * FROM clients WHERE id = $1";
      const values = [id];
      const result = await connection.query(query, values);
      return result.rows[0] || null;
    } finally {
      connection.release();
    }
  }

  async findAll(limit?: number, offset?: number): Promise<IClient[] | null> {
    const client = await pool.connect();
    try {
      let query = "SELECT * FROM clients";
      const values: any[] = [];

      if (limit !== undefined) {
        query += " LIMIT $1";
        values.push(limit);
      }
      if (offset !== undefined) {
        query += " OFFSET $" + (values.length + 1);
        values.push(offset);
      }
      query += ";";
      const result = await client.query(query, values);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async countAll(filters?: IClientFilter): Promise<number> {
    const connection = await pool.connect();
    try {
      let query = "SELECT COUNT(*) FROM clients";

      if (filters && Object.keys(filters).length > 0) {
        query += " WHERE ";
        const filterKeys = Object.keys(filters);

        filterKeys.forEach((key, index) => {
          if (index !== 0) query += " AND ";
          query += `${key} ILIKE '%' || $${index + 1} || '%'`;
        });

        const values = filterKeys.map(
          (key) => filters[key as keyof IClientFilter]
        );

        const result = await connection.query(query, values);
        return parseInt(result.rows[0].count);
      } else {
        const result = await connection.query(query);
        return parseInt(result.rows[0].count);
      }
    } finally {
      connection.release();
    }
  }

  async save(client: IClient) {
    const connection = await pool.connect();
    try {
      const query = `
        INSERT INTO clients (first_name, last_name, email, phone, avatar, x_coordinate, y_coordinate)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`;
      const values = [
        client.first_name,
        client.last_name,
        client.email,
        client.phone,
        client.avatar,
        client.x_coordinate,
        client.y_coordinate,
      ];
      const result = await connection.query(query, values);
      return result.rows[0];
    } finally {
      connection.release();
    }
  }

  async update(id: number, ClientUpdate: IClient) {
    const connection = await pool.connect();
    try {
      const query = `
        UPDATE clients
        SET first_name = $1, last_name = $2, email = $3, phone = $4, avatar = $5, x_coordinate = $6, y_coordinate = $7, updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *`;
      const values = [
        ClientUpdate.first_name,
        ClientUpdate.last_name,
        ClientUpdate.email,
        ClientUpdate.phone,
        ClientUpdate.avatar,
        ClientUpdate.x_coordinate,
        ClientUpdate.y_coordinate,
        id,
      ];
      const result = await connection.query(query, values);
      return result.rows[0];
    } finally {
      connection.release();
    }
  }

  async delete(id: number) {
    const connection = await pool.connect();
    try {
      const query = "DELETE FROM clients WHERE id = $1 RETURNING *";
      const values = [id];
      const result = await connection.query(query, values);
      return result.rows[0] || null;
    } finally {
      connection.release();
    }
  }
}

export default ClientRepository;
