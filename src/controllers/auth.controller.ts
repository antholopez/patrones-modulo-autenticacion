import { Request, Response } from 'express';
import { Database } from "../database";


class AuthController {

  async signup(req: Request, res: Response) {
    try {
      const users = await (Database.userRepository()).find();
      console.log(users);
      return res.status(201).json(req.body)
    } catch (error) {
      console.log(error)
    }
  }

  async signin() {

  }
}

export const authController = new AuthController();