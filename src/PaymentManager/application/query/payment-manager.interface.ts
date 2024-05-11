export interface IPaymentManagerQuery {
  getTransaction(): Promise<Array<Record<string, string>>>;
  getPaymentAccount(): Promise<Array<Record<string, string>>>;
  getPaymentHistory(): Promise<Array<Record<string, string>>>;
}
