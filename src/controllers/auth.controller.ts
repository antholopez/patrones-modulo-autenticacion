import { Request, Response } from "express";
import { Database } from "../database";
import { ISignup } from "../interfaces/signup.interface";
import { ISignin } from "../interfaces/signin.interface";
import { ILogout } from "../interfaces/logout.interface";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

import { encryptPassword, validatePassword } from "../utils/hash-password";
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
      }: ISignup = req.body;

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
      return res.status(500).json(error.message)
    }
  }

  async signin(req: Request, res: Response) {
    try {
      const { username, password }: ISignin = req.body;

      let user = await Database.userRepository().findOne({ username });

      if (!user)
        return res.status(400).json({
          statusCode: 400,
          error: "Bad Request",
          message: `Usuario y/o contraseña es incorrecto.`,
        });
  
      const correctPassword = await validatePassword(password, user.password);
      if (!correctPassword)
        return res.status(400).json({
          statusCode: 400,
          error: "Bad Request",
          message: `Contraseña invalidad. Intentelo nuevamente.`,
        });

      const payload = {
        id: user.idUser,
        username: user.username,
        idRole: user.idRole,
      };
      const tokenSecret = String(process.env.TOKEN_SECRET);
      const token: string = jwt.sign(payload, tokenSecret, { expiresIn: "1h" });
      await Database.userRepository().update(
        { idUser: user.idUser },
        { accessToken: token }
      );
      user.accessToken = token;

      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error.message)
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { username }: ILogout = req.body;

      await Database.userRepository().update(
        { username },
        { accessToken: '' }
      );

      return res.status(201).json('Logout ok.')
    } catch (error) {
      console.log(error)
      return res.status(500).json(error.message)
    }
  }
}

export const authController = new AuthController();
