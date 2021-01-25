import "reflect-metadata";
import {
  createConnection,
  Connection,
  Repository,
  getManager,
} from "typeorm";

import { User } from "./entities/User";

export class Database {
  private static instance: Database;
  private connection: Promise<Connection>;

  private constructor() {
    this.connection = this.connect();
  }

  private async connect(): Promise<Connection> {
    return await createConnection({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [String(process.env.DB_ENTTIES)],
      logging: true,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) Database.instance = new Database();
    return Database.instance;
  }

  public static userRepository(): Repository<User> {
    return getManager().getRepository(User);
  }
}
