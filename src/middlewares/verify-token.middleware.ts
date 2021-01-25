import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../controllers/auth.controller";

class TokenMiddleware {
  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const getToken = await verifyToken(req);
      if (getToken) {
        req.body.username = getToken.username;
        next();
      } else {
        return res.status(400).json({
          statusCode: 400,
          error: "Bad Request",
          message: `El token ya no existe.`,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        statusCode: 400,
        error: "Bad Request",
        message: `El Token es inválido o ha expirado.`,
      });
    }
  }
}

export const tokenMiddleware = new TokenMiddleware();
