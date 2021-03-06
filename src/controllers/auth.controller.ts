import { Request, Response } from "express";
import { Database } from "../database";
import { ISignup } from "../interfaces/signup.interface";
import { ISignin } from "../interfaces/signin.interface";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

import { encryptPassword, validatePassword } from "../utils/hash-password";
import { MessageUtil } from "../utils/message";

class AuthController {
  constructor() {}

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
        return res
          .status(400)
          .json(MessageUtil.error(400, `El usuario ${username} ya existe.`));

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

      let resUser: any = newUser;
      delete resUser.password;

      return res.status(200).json(MessageUtil.sucess(200, "exitoso", resUser));
    } catch (error) {
      console.log(error);
      return res.status(500).json(MessageUtil.error(500, error.message));
    }
  }

  async signin(req: Request, res: Response) {
    try {
      const { username, password }: ISignin = req.body;

      let user = await Database.userRepository().findOne({ username });

      if (!user)
        return res
          .status(400)
          .json(
            MessageUtil.error(400, "Usuario y/o contraseña es incorrecto.")
          );

      const correctPassword = await validatePassword(password, user.password);
      if (!correctPassword)
        return res
          .status(400)
          .json(
            MessageUtil.error(400, "Contraseña inválida. Intentelo nuevamente.")
          );

      const payload = {
        id: user.idUser,
        username: user.username,
        idRole: user.idRole,
      };
      const tokenSecret = String(process.env.TOKEN_SECRET);
      const token: string = jwt.sign(payload, tokenSecret, { expiresIn: "1d" });
      await Database.userRepository().update(
        { idUser: user.idUser },
        { accessToken: token }
      );
      user.accessToken = token;

      let resUser: any = user;
      delete resUser.password;

      return res.status(200).json(MessageUtil.sucess(200, "exitoso", resUser));
    } catch (error) {
      console.log(error);
      return res.status(500).json(MessageUtil.error(500, error.message));
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { username } = req.body;

      await Database.userRepository().update({ username }, { accessToken: "" });

      return res.status(200).json(MessageUtil.sucess(200, "exitoso"));
    } catch (error) {
      console.log(error);
      return res.status(500).json(MessageUtil.error(500, error.message));
    }
  }

  async verifyTokenAccess(req: Request, res: Response) {
    try {
      const getToken = await verifyToken(req);
      if (getToken)
        return res
          .status(200)
          .json(MessageUtil.sucess(200, "exitoso", getToken));
      else {
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

export const verifyToken = async (req: Request) => {
  let token: string = req.body.accessToken
    ? req.body.accessToken
    : req.headers.authorization?.split(" ")[1];

  const tokenSecret = String(process.env.TOKEN_SECRET);
  let payload: any = jwt.verify(token, tokenSecret);

  const user = await Database.userRepository().findOne({ idUser: payload.id });

  if (token === user?.accessToken) return payload;
  else {
  }
};

export const authController = new AuthController();
