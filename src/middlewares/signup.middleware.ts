import { Request, Response, NextFunction } from "express";
import { SignupDto } from "../dto/signup.dto";
import { validateOrReject, ValidationError } from "class-validator";

class SignupMiddleware {
  async validateRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const userRequest = new SignupDto(req.body);
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

export const signupMiddleware = new SignupMiddleware();
