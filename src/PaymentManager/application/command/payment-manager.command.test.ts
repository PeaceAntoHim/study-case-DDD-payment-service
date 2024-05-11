import { TTransactionDTO } from "@/PaymentManager/constant/payment-manager.type";
import { IPaymentManagerCommand } from "./payment-manager.interface";
import { IPaymentManagerService } from "@/PaymentManager/domain/payment-manager.interface";

export class PaymentManagerCommand implements IPaymentManagerCommand {
  private _service: IPaymentManagerService;
  constructor(service: IPaymentManagerService) {
    this._service = service;
  }
  private _processTransaction(transaction: TTransactionDTO): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log("Transaction processing started for:", transaction);

      // Simulate long running process
      setTimeout(async () => {
        // After 3 seconds, we assume the transaction is processed successfully
        console.log("transaction processed for:", transaction);
        const res = await this._service.addTransaction(transaction);

        resolve(res as string);
      }, 3000); // 3 seconds
    });
  }

  async send(transaction: TTransactionDTO): Promise<string> {
    return this._processTransaction(transaction)
      .then((transactionId) => {
        console.log("transaction processing completed for:", transactionId);
        return `Transaction processing completed for this transaction id: ${transactionId}`;
      })
      .catch((error: any) => {
        console.error("transaction processing failed:", error.message);
        return `transaction processing failed: ${error.message}`;
      });
  }

  async withdraw(transaction: TTransactionDTO): Promise<string> {
    return this._processTransaction(transaction)
      .then((transactionId) => {
        console.log("transaction processing completed for:", transactionId);
        return `Transaction processing completed for this transaction id: ${transactionId}`;
      })
      .catch((error: any) => {
        console.error("transaction processing failed:", error.message);
        return `transaction processing failed: ${error.message}`;
      });
  }
}
