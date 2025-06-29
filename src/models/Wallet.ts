import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  name: String,
  balance: Number,
  currency: String,
  type: { type: String, enum: ['Bank', 'Cash', 'Credit', 'Crypto'], default: 'Bank' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Wallet = mongoose.model('Wallet', walletSchema);
