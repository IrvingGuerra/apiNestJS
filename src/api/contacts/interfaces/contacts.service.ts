import { IContact } from './contacts.interface';

export interface IContactsService {
  findAll(): Promise<IContact[]>;
  findById(ID: string): Promise<IContact[] | null>;
  findCommon(idA: string, idB: string): Promise<IContact[] | null>;
  create(user: IContact): Promise<IContact | string>;
  update(ID: number, newValue: IContact): Promise<IContact | null>;
  delete(ID: number): Promise<string>;
}
