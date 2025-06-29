import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, enum: ['Revenue', 'Expense'], required: true },
  status: { type: String, enum: ['Paid', 'Pending'], required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wallet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  description: { type: String },
  user_profile: { type: String }
}, { timestamps: true });

export const Transaction = mongoose.model('Transaction', transactionSchema);
