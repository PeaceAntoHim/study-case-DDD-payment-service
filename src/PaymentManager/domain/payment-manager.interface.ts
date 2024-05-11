export interface IPaymentManagerService {
  addPaymentAccount(): Promise<Record<string, string>>;
  addTransaction(): Promise<Record<string, string>>;

  getPaymentAccount(): Promise<any>;
  getTransaction(): Promise<any>;
}
