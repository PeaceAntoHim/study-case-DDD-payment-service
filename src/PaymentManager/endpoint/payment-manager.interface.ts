import Elysia, { Cookie } from "elysia";
import { TPaymentAccountDTO, TPaymentRes, TTransactionDTO } from "../constant/payment-manager.type";
import { JWTPayloadSpec } from "@elysiajs/jwt";

export interface IJWT extends JWTPayloadSpec {
  verify(param: string): Promise<string>;
  sign(morePayload: Record<string, string | number> & JWTPayloadSpec): Promise<Bun.BlobOrStringOrBuffer>;
}

export interface IPaymentManagerEndpoint {
  registerRoute(): Promise<{ default: Elysia | undefined }>;

  createAccount(
    jwtAccess: Record<string, string | number> & IJWT,
    auth: Cookie<any>,
    req: TPaymentAccountDTO
  ): Promise<TPaymentRes>;
  sendTransaction(
    jwtAccess: Record<string, string | number> & IJWT,
    auth: Cookie<any>,
    req: TTransactionDTO
  ): Promise<TPaymentRes>;
  withdrawTransaction(
    jwtAccess: Record<string, string | number> & IJWT,
    auth: Cookie<any>,
    req: TTransactionDTO
  ): Promise<TPaymentRes>;
}

export interface IJwtAccessSetup
  extends Elysia<
    "",
    false,
    {
      decorator: {
        jwtAccess: {
          readonly sign: (morePayload: { id: string } & JWTPayloadSpec) => Promise<string>;
          readonly verify: (jwt?: string | undefined) => Promise<false | ({ id: string } & JWTPayloadSpec)>;
        };
      };
      store: {};
      derive: {};
      resolve: {};
    },
    { type: {}; error: {} },
    { schema: {}; macro: {} },
    {},
    { derive: {}; resolve: {}; schema: {} },
    { derive: {}; resolve: {}; schema: {}; decorator: {}; store: {} }
  > {}
