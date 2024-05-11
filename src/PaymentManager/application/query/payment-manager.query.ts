import { IPaymentManagerService } from "@/PaymentManager/domain/payment-manager.interface";
import { IPaymentManagerQuery } from "./payment-manager.interface";

export class PaymentManagerQuery implements IPaymentManagerQuery {
  private _service: IPaymentManagerService;
  constructor(service: IPaymentManagerService) {
    this._service = service;
  }

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
