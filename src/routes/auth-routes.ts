import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { signupMiddleware } from "../middlewares/signup.middleware";
import { signinMiddleware } from "../middlewares/signin.middleware";

class AuthRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/signup", signupMiddleware.validateRequest, authController.signup);
    this.router.post('/signin', signinMiddleware.validateRequest, authController.signin);
  }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
