export type TTransactionDTO = {
  accountId: number;
  amount: number;
  currency: string;
  toAddress: string;
  status: string;
};

export type TPaymentAccountDTO = {
  userId: number;
  type: string;
  paymentNumber: string;
  balance: number;
};
