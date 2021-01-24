import { Request, Response, NextFunction } from "express";
import { IPayload } from "../interfaces/payload.interface";

class TokenMiddleware {
  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.headers)
      next();
    } catch (error) {
      console.log(error)
    }
  }
}

export const tokenMiddleware = new TokenMiddleware();