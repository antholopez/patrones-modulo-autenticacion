import express, { Application } from "express";
import morgan from "morgan";
import "reflect-metadata";

// Routes
import IndexRoutes from './routes/index.routes'

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings() {
    this.app.set('port', this.port || process.env.PORT || 3000);
  }

  private middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(IndexRoutes);
  }

  async listen() {
    this.app.listen(this.app.get('port'));
    console.log('Server running on port', this.app.get('port'));
  }
}