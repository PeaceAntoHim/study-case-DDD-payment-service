import { TPaymentAccountDTO, TTransactionDTO } from "../constant/payment-manager.type";

export interface IPaymentManagerService {
  addPaymentAccount(DTO: TPaymentAccountDTO): Promise<string | undefined>;
  addTransaction(DTO: TTransactionDTO): Promise<string | undefined>;

  getPaymentAccount(accountId: number): Promise<any>;
  getTransaction(accountId: number): Promise<any>;
}
