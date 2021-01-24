import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ILogout } from "../interfaces/logout.interface";

export class LogoutDto implements ILogout {
  @IsNotEmpty({
    message: "username es requerido.",
  })
  @IsEmail(undefined, {
    message: "username debe de ser un correo.",
  })
  readonly username: string;

  constructor(
    user: ILogout = {
      username: "",
    }
  ) {
    this.username = user.username;
  }
}
