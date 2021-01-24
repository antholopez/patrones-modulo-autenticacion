import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { signupMiddleware } from "../middlewares/signup.middleware";
import { signinMiddleware } from "../middlewares/signin.middleware";
import { logoutMiddleware } from "../middlewares/logout.middleware";
import { tokenMiddleware } from "../middlewares/verify-token.middleware";

class AuthRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/signup", signupMiddleware.validateRequest, authController.signup);
    this.router.post('/signin', signinMiddleware.validateRequest, authController.signin);
    this.router.post('/logout', logoutMiddleware.validateRequest, tokenMiddleware.verify, authController.logout)
  }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
