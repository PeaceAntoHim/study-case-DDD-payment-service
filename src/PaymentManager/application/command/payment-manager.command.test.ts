import { IPaymentManagerCommand } from "./payment-manager.interface";

export class PaymentManagerCommand implements IPaymentManagerCommand {
  send(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  withdraw(): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
