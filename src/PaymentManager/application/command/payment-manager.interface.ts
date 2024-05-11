import { TPaymentAccountDTO, TTransactionDTO } from "@/PaymentManager/constant/payment-manager.type";

export interface IPaymentManagerCommand {
  send(transaction: TTransactionDTO): Promise<string>;
  withdraw(transaction: TTransactionDTO): Promise<string>;
  createAccount(data: TPaymentAccountDTO): Promise<string | undefined>;
}
