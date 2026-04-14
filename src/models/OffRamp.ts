import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type OffRampStatus =
  | "AWAITING_USER_TRANSFER"
  | "PENDING_CHAIN_CONFIRMATION"
  | "CRYPTO_RECEIVED"
  | "PAYOUT_COMPLETED"
  | "ONCHAIN_FINALIZED"
  | "ACTION_REQUIRED";

export interface IOffRamp extends Document {
  user: Types.ObjectId;
  walletAddress: string;
  tokenAddress: string;
  tokenAmount: string;
  fiatAmount: string;
  fiatCurrency: string;
  status: OffRampStatus;
  chainTxHash?: string;
  contractTxId?: string;
  payoutReference?: string;
  ownerSettlementTxHash?: string;
  note?: string;
  lastError?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OffRampSchema = new Schema<IOffRamp>(
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
    status: {
      type: String,
      required: true,
      enum: [
        "AWAITING_USER_TRANSFER",
        "PENDING_CHAIN_CONFIRMATION",
        "CRYPTO_RECEIVED",
        "PAYOUT_COMPLETED",
        "ONCHAIN_FINALIZED",
        "ACTION_REQUIRED",
      ],
      default: "AWAITING_USER_TRANSFER",
    },
    chainTxHash: { type: String, trim: true, lowercase: true },
    contractTxId: { type: String, trim: true },
    payoutReference: { type: String, trim: true },
    ownerSettlementTxHash: { type: String, trim: true, lowercase: true },
    note: { type: String, trim: true },
    lastError: { type: String, trim: true },
  },
  { timestamps: true },
);

OffRampSchema.index({ chainTxHash: 1 }, { sparse: true, unique: true });

export const OffRamp =
  (mongoose.models.OffRamp as Model<IOffRamp>) ||
  mongoose.model<IOffRamp>("OffRamp", OffRampSchema);
