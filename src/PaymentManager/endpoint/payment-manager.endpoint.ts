import Elysia, { Cookie } from "elysia";
import { TPaymentAccountDTO, TTransactionDTO } from "../constant/payment-manager.type";
import { IPaymentManagerEndpoint } from "./payment-manager.interface";

export class PaymentManagerEndpoint implements IPaymentManagerEndpoint {
  registerRoute(): Promise<{ default: Elysia<"", false, { decorator: {}; store: {}; derive: {}; resolve: {}; }, { type: {}; error: {}; }, { schema: {}; macro: {}; }, {}, { derive: {}; resolve: {}; schema: {}; }, { derive: {}; resolve: {}; schema: {}; }> | undefined; }> {
    throw new Error("Method not implemented.");
  }
  createAccount(auth: Cookie<any>, req: TPaymentAccountDTO): Promise<string> {
    throw new Error("Method not implemented.");
  }
  sendTransaction(auth: Cookie<any>, req: TTransactionDTO): Promise<string> {
    throw new Error("Method not implemented.");
  }
  withdrawTransaction(auth: Cookie<any>, req: TTransactionDTO): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
