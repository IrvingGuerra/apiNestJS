import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: String,
    phone: String,
  },
  {
    versionKey: false,
  },
);
