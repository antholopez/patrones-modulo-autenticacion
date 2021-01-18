import { createPool, Pool } from "mysql2/promise";

export class Database {
  private static instance: Database;
  private connection: Pool;

  private constructor() {
    this.connection = this.connect();
  }

  private connect() {
    return createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT)
    })
  }

  public static getInstance() {
    if (!Database.instance) 
      Database.instance = new Database();
    
    return Database.instance;
  }
  
  public async query(sql: string, parameters?: []) {
    return await this.connection.query(sql, parameters);
  }
}