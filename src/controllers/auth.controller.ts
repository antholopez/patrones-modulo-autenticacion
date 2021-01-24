import { Request, Response } from "express";
import { Database } from "../database";
import { IUser } from "../interfaces/user.interface";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

import { encryptPassword } from "../utils/hash-password";
import { ROLE } from "../constants";

class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const {
        firstName,
        lastName,
        username,
        password,
        idRole,
      }: IUser = req.body;

      const emailExists = await Database.userRepository().findOne({ username });
      if (emailExists)
        return res.status(400).json({
          statusCode: 400,
          error: "Bad Request",
          message: `El usuario ${username} ya existe.`,
        });

      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.username = username;
      user.idRole = idRole;
      user.password = await encryptPassword(password);

      let newUser: User = await Database.userRepository().save(user);

      const payload = {
        id: newUser.idUser,
        username: newUser.username,
        idRole: newUser.idRole,
      };
      const tokenSecret = String(process.env.TOKEN_SECRET);
      const token: string = jwt.sign(payload, tokenSecret, { expiresIn: "1d" });
      await Database.userRepository().update(
        { idUser: newUser.idUser },
        { accessToken: token }
      );

      newUser.accessToken = token;

      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  async signin() {}
}

export const authController = new AuthController();
