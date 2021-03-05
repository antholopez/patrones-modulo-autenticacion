import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../controllers/auth.controller";
import { MessageUtil } from "../utils/message";

class TokenMiddleware {
  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const getToken = await verifyToken(req);
      if (getToken) {
        req.body.username = getToken.username;
        next();
      } else {
        return res
          .status(400)
          .json(MessageUtil.error(400, "El token ya no existe."));
      }
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json(MessageUtil.error(400, "El Token es inválido o ha expirado."));
    }
  }
}

export const tokenMiddleware = new TokenMiddleware();
