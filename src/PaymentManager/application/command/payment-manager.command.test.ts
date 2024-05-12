import { TPaymentAccountDTO, TTransactionDTO } from "@/PaymentManager/constant/payment-manager.type";
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
    const paymentAccount = await this._service.getPaymentAccount(transaction.accountId);
    if (!paymentAccount) {
      return "Sorry this account id does not exist please create payment account first";
    }

    return this._processTransaction(transaction)
      .then((transactionId) => {
        console.log("Send transaction processing completed for:", transactionId);
        return `Send transaction processing completed for this transaction id: ${transactionId}`;
      })
      .catch((error: any) => {
        console.error("Send transaction processing failed:", error.message);
        return `Send transaction processing failed: ${error.message}`;
      });
  }

  async withdraw(transaction: TTransactionDTO): Promise<string> {
    const paymentAccount = await this._service.getPaymentAccount(transaction.accountId);
    if (!paymentAccount) {
      return "Sorry this account id does not exist please create payment account first";
    }
    return this._processTransaction(transaction)
      .then((transactionId) => {
        console.log("Withdraw transaction processing completed for:", transactionId);
        return `Withdraw Transaction processing completed for this transaction id: ${transactionId}`;
      })
      .catch((error: any) => {
        console.error("Withdraw transaction processing failed:", error.message);
        return `Withdraw transaction processing failed: ${error.message}`;
      });
  }

  async createAccount(data: TPaymentAccountDTO): Promise<string | undefined> {
    try {
      const account = await this._service.addPaymentAccount(data);
      return account as string;
    } catch (error: any) {}
  }
}
