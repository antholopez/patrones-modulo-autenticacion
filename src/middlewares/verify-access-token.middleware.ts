import { Request, Response, NextFunction } from "express";
import { VerifyAccessTokenDto } from "../dto/verify-access-token.dto";
import { validateOrReject, ValidationError } from "class-validator";

class VerifyAccessTokenMiddleware {
  async validateRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const userRequest = new VerifyAccessTokenDto(req.body);
      await validateOrReject(userRequest);
      next();
    } catch (error) {
      let errorValidation: ValidationError[] = error;
      let validations = [];

      for (let i = 0; i < errorValidation.length; i++) {
        const err = errorValidation[i].constraints;
        for (const key in err) {
          if (Object.prototype.hasOwnProperty.call(err, key)) {
            validations.push(err[key]);
          }
        }
      }
      return res.status(400).json({
        statusCode: 400,
        error: "Bad Request",
        message: validations,
      });
    }
  }
}

export const verifyAccessTokenMiddleware = new VerifyAccessTokenMiddleware();
