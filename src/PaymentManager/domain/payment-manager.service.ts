import { TPaymentAccountDTO, TTransactionDTO } from "../constant/payment-manager.type";
import { IPaymentManagerRepository } from "../infrastructure/repository/payment-manager.repository.interface";
import { IPaymentManagerService } from "./payment-manager.interface";

export class PaymentManagerService implements IPaymentManagerService {
  _repository: IPaymentManagerRepository;
  constructor(repository: IPaymentManagerRepository) {
    this._repository = repository;
  }

  async addPaymentAccount(DTO: TPaymentAccountDTO): Promise<string | undefined> {
    return await this._repository.insertPaymentAccount(DTO);
  }
  addTransaction(DTO: TTransactionDTO): Promise<string | undefined> {
    return this._repository.insertPaymentHistory(DTO);
  }
  getPaymentAccount(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getTransaction(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
