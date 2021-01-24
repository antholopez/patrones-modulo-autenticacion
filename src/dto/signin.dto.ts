import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ISignin } from "../interfaces/signin.interface";

export class SigninDto implements ISignin {
  @IsNotEmpty({
    message: "username es requerido.",
  })
  @IsEmail(undefined, {
    message: "username debe de ser un correo.",
  })
  readonly username: string;

  @IsNotEmpty({
    message: "password es requerido.",
  })
  @IsString({
    message: "password debe de ser un string.",
  })
  readonly password: string;

  constructor(
    user: ISignin = {
      username: "",
      password: "",
    }
  ) {
    this.username = user.username;
    this.password = user.password;
  }
}
