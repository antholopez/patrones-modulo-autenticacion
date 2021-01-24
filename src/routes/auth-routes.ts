import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { signinMiddleware } from "../middlewares/signin.midlleware";

class AuthRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/signup", signinMiddleware.validateRequest, authController.signup);
  }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
