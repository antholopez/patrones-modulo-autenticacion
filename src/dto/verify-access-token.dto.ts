import { IsNotEmpty, IsJWT } from "class-validator";
import { IVerifyAccessToken } from "../interfaces/verify-access-token.interface";

export class VerifyAccessTokenDto implements IVerifyAccessToken {
  @IsNotEmpty({
    message: "accessToken es requerido.",
  })
  @IsJWT({
    message: "accessToken debe de ser un jwt token.",
  })
  readonly accessToken: string;

  constructor(
    user: IVerifyAccessToken = {
      accessToken: "",
    }
  ) {
    this.accessToken = user.accessToken;
  }
}
