import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { signupMiddleware } from "../middlewares/signup.middleware";
import { signinMiddleware } from "../middlewares/signin.middleware";
import { verifyAccessTokenMiddleware } from "../middlewares/verify-access-token.middleware";
import { tokenMiddleware } from "../middlewares/verify-token.middleware";

class AuthRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/signup", signupMiddleware.validateRequest, authController.signup);
    this.router.post('/signin', signinMiddleware.validateRequest, authController.signin);
    this.router.post('/logout', tokenMiddleware.verify, authController.logout);
    this.router.post('/verify-access-token', verifyAccessTokenMiddleware.validateRequest, authController.verifyTokenAccess);
  }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
