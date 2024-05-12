import { TRepositoryPrisma } from "@/AccountManager/constant/account-manager.type";
import { IPaymentManagerRepository } from "../payment-manager.repository.interface";
import { TPaymentAccountDTO, TTransactionDTO } from "@/PaymentManager/constant/payment-manager.type";

export class PaymentManagerRepository implements IPaymentManagerRepository {
  private _TAG;
  private _prisma: TRepositoryPrisma;
  constructor(prisma: TRepositoryPrisma) {
    this._TAG = "PaymentManager";
    this._prisma = prisma;
  }
  async findPaymentAccount(accountId: number): Promise<any> {
    try {
      const paymentAccount = await this._prisma.paymentAccount.findUnique({
        where: { id: accountId },
        select: {
          accountId: true,
        },
      });
      return paymentAccount?.accountId;
    } catch (error: any) {
      console.error(`${this._TAG} Got Error at func: findPaymentAccount(): ${error.message}`);
    }
  }

  async findPaymentHistory(accountId: number): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async insertPaymentAccount(DTO: TPaymentAccountDTO): Promise<string | undefined> {
    try {
      const paymentAccount = await this._prisma.paymentAccount.create({
        data: {
          ...DTO,
        },
      });
      return paymentAccount.accountId;
    } catch (error: any) {
      console.error(`${this._TAG} Got Error at func: insertPaymentAccount(): ${error.message}`);
    }
  }
  async insertPaymentHistory(DTO: TTransactionDTO): Promise<string | undefined> {
    try {
      const paymentAccount = await this._prisma.paymentHistory.create({
        data: {
          ...DTO,
        },
      });
      return paymentAccount.transactionId;
    } catch (error: any) {
      console.error(`${this._TAG} Got Error at func: insertPaymentHistory(): ${error.message}`);
    }
  }
}
