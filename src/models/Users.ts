import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBankAccountDetails {
  telebirr: string;
  cbe: string;
}

export interface IUser extends Document {
  walletAddress: string;
  fullName: string;
  bankAccountDetails: IBankAccountDetails;
  createdAt: Date;
  updatedAt: Date;
}

const BankAccountDetailsSchema: Schema = new Schema<IBankAccountDetails>(
  {
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
  },
  { _id: false },
);

const UserSchema = new Schema<IUser>(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      match: [/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum wallet address"],
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    bankAccountDetails: {
      type: BankAccountDetailsSchema,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.index({ walletAddress: 1 }, { unique: true });

export const User =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
