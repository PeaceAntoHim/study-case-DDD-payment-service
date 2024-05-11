import { IAccountManagerService } from "@/AccountManager/domain/account-manager.interface";
import { INVALID_INPUT, NOT_FOUND } from "@/AccountManager/constant/account-manager.constant";
import { IAccountManagerQuery } from "./account-manager.interface";

export class AccountManagerQuery implements IAccountManagerQuery {
  private _service;

  constructor(edtechService: IAccountManagerService) {
    this._service = edtechService;
  }

  private _validateEmail = (param: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(param);
  };

  async signin(email: string, password: string): Promise<any> {
    if (!email || !password) {
      return INVALID_INPUT;
    }

    if (!this._validateEmail(email)) {
      return "Invalid Email";
    }

    const existingUser = await this._service.get(email);
    if (!existingUser) {
      return `User ${NOT_FOUND}`;
    }

    const authToken = await this._service.getToken(existingUser.id);
    console.log("authToken sfsdf" + authToken);
    if (authToken.hashedToken) {
      return "User was authenticated";
    }

    const validPassword = await Bun.password.verify(password, existingUser.password);

    if (!validPassword) {
      return "Invalid Credentials";
    }

    return {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };
  }
}
