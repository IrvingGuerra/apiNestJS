import { IUser } from './users.interface';

export interface IUsersService {
  findAll(): Promise<IUser[]>;
  findById(ID: number): Promise<IUser | null>;
  create(user: IUser): Promise<IUser | string>;
  update(ID: number, newValue: IUser): Promise<IUser | null>;
  delete(ID: number): Promise<string>;
}
