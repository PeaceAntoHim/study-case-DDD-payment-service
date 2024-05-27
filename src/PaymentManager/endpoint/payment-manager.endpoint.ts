import Elysia, { Cookie } from "elysia";
import { TPaymentAccountDTO, TPaymentRes, TTransactionDTO } from "../constant/payment-manager.type";
import { IJWT, IJwtAccessSetup, IPaymentManagerEndpoint } from "./payment-manager.interface";
import { IPaymentManagerQuery } from "../application/query/payment-manager.interface";
import { IPaymentManagerCommand } from "../application/command/payment-manager.interface";
import { jwtAccessSetup } from "@/dependency-injection/dependency-injection.init";
import { sleep } from "../constant/payment-manager.constant";
import { TCustomSetElysia, TSigninRes } from "@/AccountManager/constant/account-manager.type";
import { STATUS_CODE } from "@/AccountManager/constant/account-manager.constant";

export class PaymentManagerEndpoint implements IPaymentManagerEndpoint {
  private _TAG: string;
  private _query: IPaymentManagerQuery;
  private _command: IPaymentManagerCommand;
  private _router: Elysia<"/payment">;
  private _jwtAccessSetup;

  constructor(
    query: IPaymentManagerQuery,
    command: IPaymentManagerCommand,
    router: Elysia<"/payment">,
    jwtAccessSetup: IJwtAccessSetup
  ) {
    this._TAG = "PaymentManagerEndpoint";
    this._query = query;
    this._command = command;
    this._router = router;
    this._jwtAccessSetup = jwtAccessSetup;
  }

  registerRoute(): any {
    return this._router
      .use(this._jwtAccessSetup)
      .post(
        "/account",
        async ({
          jwtAccess,
          cookie: { auth },
          body,
        }: {
          jwtAccess: Record<string, string | number> & IJWT;
          cookie: { auth: Cookie<any> };
          body: TPaymentAccountDTO;
        }) => await this.createAccount(jwtAccess, auth, body),
        {
          beforeHandle: [
            function setup() {},
            async function delay() {
              await sleep();
            },
          ],
          afterHandle({ response, set }: { response: TPaymentRes | any; set: TCustomSetElysia }) {
            if (response.statusCode === 200) {
              console.log(response);
              set.status = response.statusCode;
              return response.message;
            }
            set.status = response.statusCode;
            return response;
          },
        }
      )
      .post(
        "/send",
        async ({
          jwtAccess,
          cookie: { auth },
          body,
        }: {
          jwtAccess: Record<string, string | number> & IJWT;
          cookie: { auth: Cookie<any> };
          body: TTransactionDTO;
        }) => await this.sendTransaction(jwtAccess, auth, body),
        {
          beforeHandle: [
            function setup() {},
            async function delay() {
              await sleep();
            },
          ],
          afterHandle({ response, set }: { response: TPaymentRes | any; set: TCustomSetElysia }) {
            if (response.statusCode === 200) {
              console.log(response);
              set.status = response.statusCode;
              return response.message;
            }
            set.status = response.statusCode;
            return response;
          },
        }
      )
      .post(
        "/withdraw",
        async ({
          jwtAccess,
          cookie: { auth },
          body,
        }: {
          jwtAccess: Record<string, string | number> & IJWT;
          cookie: { auth: Cookie<any> };
          body: TTransactionDTO;
        }) => await this.withdrawTransaction(jwtAccess, auth, body),
        {
          beforeHandle: [
            function setup() {},
            async function delay() {
              await sleep();
            },
          ],
          afterHandle({ response, set }: { response: TPaymentRes | any; set: TCustomSetElysia }) {
            if (response.statusCode === 200) {
              console.log(response);
              set.status = response.statusCode;
              return response.message;
            }
            set.status = response.statusCode;
            return response;
          },
        }
      );
  }

  async createAccount(
    jwtAccess: Record<string, string | number> & IJWT,
    auth: Cookie<any>,
    req: TPaymentAccountDTO
  ): Promise<TPaymentRes> {
    const authUser: any = await jwtAccess.verify(auth.value);
    if (!authUser) {
      return {
        statusCode: STATUS_CODE.UNAUTHORIZED,
        message: "Unauthorized",
      };
    }

    const dtoAccount: TPaymentAccountDTO = {
      userId: Number(authUser.id) || req.userId,
      type: req.type,
      paymentNumber: req.paymentNumber,
      balance: req.balance,
    };

    const resCreateAccount = await this._command.createAccount(dtoAccount);
    return {
      statusCode: STATUS_CODE.CREATED,
      message: resCreateAccount as string,
    };
  }
  async sendTransaction(
    jwtAccess: Record<string, string | number> & IJWT,
    auth: Cookie<any>,
    req: TTransactionDTO
  ): Promise<TPaymentRes> {
    const authUser = await jwtAccess.verify(auth.value);
    if (!authUser) {
      return {
        statusCode: STATUS_CODE.UNAUTHORIZED,
        message: "Unauthorized",
      };
    }

    // const accountId = await 
    const resSendTransaction = await this._command.send(req);
    return {
      statusCode: STATUS_CODE.CREATED,
      message: resSendTransaction,
    };
  }

  async withdrawTransaction(
    jwtAccess: Record<string, string | number> & IJWT,
    auth: Cookie<any>,
    req: TTransactionDTO
  ): Promise<TPaymentRes> {
    const authUser = await jwtAccess.verify(auth.value);
    if (!authUser) {
      return {
        statusCode: STATUS_CODE.UNAUTHORIZED,
        message: "Unauthorized" + authUser,
      };
    }

    const resWithdrawTransaction = await this._command.withdraw(req);
    return {
      statusCode: STATUS_CODE.CREATED,
      message: resWithdrawTransaction,
    };
  }
}
