import { TInsert, TInsertToken } from "../constant/account-manager.type";

export interface IAccountManagerService {
  add(DTO: TInsert): Promise<Record<string, string>>;
  addToken(DTO: TInsertToken): Promise<void>;
  get(email: string): Promise<any>;
  getToken(id: number): Promise<Record<string, string>>;
}
