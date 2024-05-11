import { IPaymentManagerService } from "./payment-manager.interface";

export class PaymentManagerService implements IPaymentManagerService {
  addPaymentAccount(): Promise<Record<string, string>> {
    throw new Error("Method not implemented.");
  }
  addTransaction(): Promise<Record<string, string>> {
    throw new Error("Method not implemented.");
  }
  getPaymentAccount(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getTransaction(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
