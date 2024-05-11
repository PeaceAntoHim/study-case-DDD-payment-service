export interface IPaymentManagerCommand {
  send(): Promise<string>;
  withdraw(): Promise<string>;
}
