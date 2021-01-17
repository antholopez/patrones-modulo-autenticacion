import { createPool, Pool } from "mysql2/promise";

export class Database {
  private static instance: Database;
  private connection: Pool;

  private constructor() {
    this.connection = this.connect();
  }

  private connect() {
    return createPool({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'db_patrones',
      connectionLimit: 10
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