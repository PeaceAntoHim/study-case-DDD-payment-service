import Elysia, { Cookie } from "elysia";
import { TPaymentAccountDTO, TTransactionDTO } from "../constant/payment-manager.type";

export interface IPaymentManagerEndpoint {
  registerRoute(): Promise<{ default: Elysia | undefined }>;
  createAccount(auth: Cookie<any>, req: TPaymentAccountDTO): Promise<string>;
  sendTransaction(auth: Cookie<any>, req: TTransactionDTO): Promise<string>;
  withdrawTransaction(auth: Cookie<any>, req: TTransactionDTO): Promise<string>;
}
