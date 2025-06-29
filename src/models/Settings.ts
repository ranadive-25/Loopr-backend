// src/models/Settings.ts
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  notificationsEnabled: { type: Boolean, default: true },
  preferredCurrency: { type: String, default: 'USD' },
  timezone: { type: String, default: 'UTC' },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  language: { type: String, default: 'en' },
}, { timestamps: true });

export const Settings = mongoose.model('Settings', settingsSchema);
