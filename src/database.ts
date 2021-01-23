import { createConnection, Connection } from "typeorm";
import "reflect-metadata";

export class Database {
  private static instance: Database;
  private connection: Promise<Connection>;

  private constructor() {
    this.connection = this.connect();
  }

  private async connect() {
    const connection: Connection = await createConnection({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["*/entities/**/*.{js,ts}"],
      logging: true
    });
    return connection;
  }

  public static getInstance() {
    if (!Database.instance) Database.instance = new Database();

    return Database.instance;
  }

  public async query() {
    return await this.connection;
  }
}
