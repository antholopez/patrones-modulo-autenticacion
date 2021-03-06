import { IsEmail, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ISignup } from "../interfaces/signup.interface";

export class SignupDto implements ISignup {
  @IsNotEmpty({
    message: "firstName es requerido.",
  })
  @IsString({
    message: "firstName debe de ser un string.",
  })
  readonly firstName: string;

  @IsNotEmpty({
    message: "lastName es requerido.",
  })
  @IsString({
    message: "lastName debe de ser un string.",
  })
  readonly lastName: string;

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

  @IsNotEmpty({
    message: "idRole es requerido.",
  })
  @IsNumber(undefined, {
    message: "idRole debe de ser un número.",
  })
  readonly idRole: number;

  constructor(
    user: ISignup = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      idRole: 0,
    }
  ) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.password = user.password;
    this.idRole = user.idRole;
  }
}
