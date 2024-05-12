import Elysia, { Cookie, t } from "elysia";
import { IAccountManagerQuery } from "../application/query/account-manager.interface";
import { IAccountManagerEndpoint, IBasicAuth, IJWT, IJwtAccessSetup, IJwtRefreshToken } from "./account-manager.interface";
import {
  TCustomSetElysia,
  TInsert,
  TInsertToken,
  TReqSignin,
  TReqSignup,
  TSigninRes,
  TSignupRes,
} from "../constant/account-manager.type";
import { BAD_REQUEST, STATUS_CODE, sleep } from "../constant/account-manager.constant";
import { randomUUID } from "crypto";
import { IAccountManagerCommand } from "../application/command/account-manager.interface";

export class AccountManagerEndpoint implements IAccountManagerEndpoint {
  private _TAG: string;
  private _query: IAccountManagerQuery;
  private _command: IAccountManagerCommand;
  private _router: Elysia<"/auth">;
  private _basicAuthModel;
  private _jwtAccessSetup;
  private _jwtRefreshSetup;

  constructor(
    query: IAccountManagerQuery,
    command: IAccountManagerCommand,
    router: Elysia<"/auth">,
    basicAuthModel: IBasicAuth,
    jwtAccessSetup: IJwtAccessSetup,
    jwtRefreshSetup: IJwtRefreshToken
  ) {
    this._query = query;
    this._command = command;
    this._router = router;
    this._TAG = "AccountManagerEndpoint";
    this._basicAuthModel = basicAuthModel;
    this._jwtAccessSetup = jwtAccessSetup;
    this._jwtRefreshSetup = jwtRefreshSetup;
  }

  registerRoute(): any {
    return this._router
      .use(this._basicAuthModel)
      .use(this._jwtAccessSetup)
      .post(
        "/signin",
        async ({
          jwtAccess,
          cookie: { auth },
          body,
        }: {
          jwtAccess: Record<string, string | number> & IJWT;
          cookie: { auth: Cookie<any> };
          body: TReqSignin;
        }) => await this.signin(jwtAccess, auth, body),
        {
          body: "basicAuthModel",
          beforeHandle: [
            function setup() {},
            async function delay() {
              await sleep();
            },
          ],
        }
      )
      .post("/signup", async ({ body }: { body: TReqSignup }) => await this.signup(body), {
        body: t.Object({
          name: t.String({ minLength: 10, maxLength: 50 }),
          role: t.String({ minLength: 2, maxLength: 10 }),
          email: t.String({ minLength: 10, maxLength: 50 }),
          password: t.String({ minLength: 8, maxLength: 32 }),
        }),
        beforeHandle: [
          function setup() {},
          async function delay() {
            await sleep();
          },
        ],
      });
  }

  async signin(
    jwtAccess: Record<string, string | number> & IJWT,
    auth: Cookie<any>,
    req: TReqSignin
  ): Promise<TSigninRes | undefined> {
    try {
      const { email, password } = req;
      const dataRes = await this._query.signin(email, password);
      console.info(`${this._TAG} dataRes: ${JSON.stringify(dataRes)}`);
      const isAccess = await jwtAccess.verify(auth.value);
      if (isAccess) {
        return {
          message: "User was authenticated",
          token: "",
          statusCode: STATUS_CODE.UNAUTHORIZED,
        };
      }

      const jwtSign = await jwtAccess.sign({
        id: String(dataRes.id),
      });

      auth.set({
        value: jwtSign,
        httpOnly: true,
        maxAge: 5 * 600,
        sameSite: true,
        path: "/api",
      });

      return {
        message: dataRes,
        token: auth.value,
        statusCode: STATUS_CODE.OK,
      };
    } catch (err: any) {
      console.error(`${this._TAG} Got Error at func signin: ${err.message}`);
      return {
        token: "",
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: `${this._TAG} Got Error at func signin: ${err.message}`,
      };
    }
  }

  async signup(req: TReqSignup): Promise<TSignupRes | undefined> {
    try {
      const { name, role, email, password } = req;
      const dto: TInsert = {
        name: name,
        role: role,
        email: email,
        password: password,
      };
      const dataRes = await this._command.signup(dto);
      console.info(`${this._TAG} dataRes: ${dataRes}`);
      return {
        message: dataRes,
        statusCode: STATUS_CODE.OK,
      };
    } catch (err: any) {
      console.error(`${this._TAG} Got Error at func signup: ${err.message}`);
      return {
        message: "Internal Server Error",
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
