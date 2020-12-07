import { Document } from 'mongoose';

export interface IContact extends Document {
  readonly userId: string;
  readonly friendPhone: string;
  readonly friendFirstName: string;
  readonly friendLastName: string;
  readonly bnextUser: boolean;
}
