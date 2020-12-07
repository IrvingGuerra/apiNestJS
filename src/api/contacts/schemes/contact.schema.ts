import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema(
  {
    userId: String,
    friendPhone: String,
    friendFirstName: String,
    friendLastName: String,
    bnextUser: Boolean,
  },
  {
    versionKey: false,
  },
);
