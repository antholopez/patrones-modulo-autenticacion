import express, { Application } from "express";
import morgan from "morgan";
import { Database } from "./database";
require("dotenv").config();

// Routes
import IndexRoutes from "./routes/index.routes";
import AuthRoutes from "./routes/auth-routes";

export class App {
  private app: Application;
  private connectDB: Database;

  constructor(private port?: number | string) {
    this.connectDB = Database.getInstance();
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings() {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }

  private middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(IndexRoutes);
    this.app.use("/api", AuthRoutes);
  }

  async listen() {
    this.app.listen(this.app.get("port"));
    console.log("Server running on port", this.app.get("port"));
  }
}
