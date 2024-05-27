import { TPaymentAccountDTO, TTransactionDTO } from "@/PaymentManager/constant/payment-manager.type";

export interface IPaymentManagerRepository {
  insertPaymentAccount(DTO: TPaymentAccountDTO): Promise<string | undefined>;
  insertPaymentHistory(DTO: TTransactionDTO): Promise<string | undefined>;
  findPaymentAccount(accountId: number): Promise<any>;
  findPaymentHistory(accountId: number): Promise<any>;
}
