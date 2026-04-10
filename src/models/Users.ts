import mongoose, { Schema, Document } from "mongoose";

const BankAccountDetailsSchema = new Schema({
  telebirr: {
    type: String,
    required: true,
    match: [
      /^\+2519\d{8}$/,
      "teleBirr must start with +2519 and have 8 more digits",
    ],
  },
  cbe: {
    type: String,
    required: true,
    match: [/^\d{13}$/, "CBE account number must be exactly 13 digits"],
  },
});

export interface IUser extends Document {
  walletAddress: string;
  fullName: string;
  bankAccountDetails: typeof BankAccountDetailsSchema;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  walletAddress: { type: String, required: true },
  fullName: { type: String, required: true },
  bankAccountDetails: { type: BankAccountDetailsSchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", UserSchema);
