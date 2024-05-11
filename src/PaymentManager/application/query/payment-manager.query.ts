import { IPaymentManagerQuery } from "./payment-manager.interface";

export class PaymentManagerQuery implements IPaymentManagerQuery {
  getTransaction(): Promise<Record<string, string>[]> {
    throw new Error("Method not implemented.");
  }
  getPaymentAccount(): Promise<Record<string, string>[]> {
    throw new Error("Method not implemented.");
  }
  getPaymentHistory(): Promise<Record<string, string>[]> {
    throw new Error("Method not implemented.");
  }
}
