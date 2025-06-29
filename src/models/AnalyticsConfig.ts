import mongoose from 'mongoose';

const analyticsConfigSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  favoriteCharts: [{ type: String }], // e.g., ["revenue-vs-expense", "category-breakdown"]
  lastUsedFilters: {
    category: String,
    status: String,
    wallet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  },
}, { timestamps: true });

export const AnalyticsConfig = mongoose.model('AnalyticsConfig', analyticsConfigSchema);
