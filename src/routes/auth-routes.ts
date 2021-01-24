import { Router } from "express";
import { authController } from "../controllers/auth.controller";

class AuthRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/signup", authController.signup);
  }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
