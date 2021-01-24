import { Request, Response, NextFunction } from "express";
import { IPayload } from "../interfaces/payload.interface";
import { ILogout } from "../interfaces/logout.interface";
import { Database } from "../database";
import jwt from "jsonwebtoken";

class TokenMiddleware {
  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      const { username }: ILogout = req.body;
      const user = await Database.userRepository().findOne({ username });

      if (token && user) {
        const tokenSecret = String(process.env.TOKEN_SECRET);
        jwt.verify(token, tokenSecret);

        if (token === user.accessToken) next();
        else
          return res.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            message: `El Token ya no existe.`,
          });
      } else {
        return res.status(400).json({
          statusCode: 400,
          error: "Bad Request",
          message: `Hubo problemas al obtener el token.`,
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
