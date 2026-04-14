import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type OnRampStatus =
  | "RECEIPT_SUBMITTED"
  | "BANK_VERIFIED"
  | "ONCHAIN_SETTLED"
  | "ACTION_REQUIRED";

export interface IOnRamp extends Document {
  user: Types.ObjectId;
  walletAddress: string;
  tokenAddress: string;
  tokenAmount: string;
  fiatAmount: string;
  fiatCurrency: string;
  receiptId: string;
  status: OnRampStatus;
  bankVerificationReference?: string;
  ownerSettlementTxHash?: string;
  contractTxId?: string;
  note?: string;
  lastError?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OnRampSchema = new Schema<IOnRamp>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    walletAddress: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    tokenAddress: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    tokenAmount: { type: String, required: true },
    fiatAmount: { type: String, required: true },
    fiatCurrency: { type: String, required: true, default: "ETB", uppercase: true },
    receiptId: { type: String, required: true, trim: true, index: true },
    status: {
      type: String,
      required: true,
      enum: [
        "RECEIPT_SUBMITTED",
        "BANK_VERIFIED",
        "ONCHAIN_SETTLED",
        "ACTION_REQUIRED",
      ],
      default: "RECEIPT_SUBMITTED",
    },
    bankVerificationReference: { type: String, trim: true },
    ownerSettlementTxHash: { type: String, trim: true, lowercase: true },
    contractTxId: { type: String, trim: true },
    note: { type: String, trim: true },
    lastError: { type: String, trim: true },
  },
  { timestamps: true },
);

export const OnRamp =
  (mongoose.models.OnRamp as Model<IOnRamp>) ||
  mongoose.model<IOnRamp>("OnRamp", OnRampSchema);
