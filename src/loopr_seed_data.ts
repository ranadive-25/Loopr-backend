import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Types } from 'mongoose';

// Import models
import { User } from './models/User';
import { Wallet } from './models/Wallet';
import { Transaction } from './models/Transaction';
import { Message } from './models/Message';
import { AnalyticsConfig } from './models/AnalyticsConfig';
import { Settings } from './models/Settings';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

const convertIds = (jsonData: any) => {
  const userMap: Record<string, Types.ObjectId> = {};
  const walletMap: Record<string, Types.ObjectId> = {};

  // Replace user _ids with ObjectIds
  jsonData.users.forEach((user: any) => {
    const newId = new mongoose.Types.ObjectId();
    userMap[user._id] = newId;
    user._id = newId;
  });

  // Replace wallet _ids and link to real user ObjectId
  jsonData.wallets.forEach((wallet: any) => {
    const newId = new mongoose.Types.ObjectId();
    walletMap[wallet._id] = newId;
    wallet._id = newId;
    wallet.user_id = userMap[wallet.user_id];
  });

  // Update transactions
  jsonData.transactions.forEach((txn: any) => {
    txn.user_id = userMap[txn.user_id];
    txn.wallet_id = walletMap[txn.wallet_id];
  });

  // Update messages
  jsonData.messages.forEach((msg: any) => {
    msg.user_id = userMap[msg.user_id];
  });

  // Update analytics configs
  jsonData.analyticsConfigs.forEach((ac: any) => {
    ac.user_id = userMap[ac.user_id];
    ac.lastUsedFilters.wallet_id = walletMap[ac.lastUsedFilters.wallet_id];
  });

  // Update settings
  jsonData.settings.forEach((s: any) => {
    s.user_id = userMap[s.user_id];
  });

  return jsonData;
};

const seedDatabase = async () => {
  const filePath = path.join(__dirname, '../loopr_seed_data.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(rawData);

  const updatedData = convertIds(jsonData);

  try {
    await connectDB();

    // Clear collections
    await User.deleteMany({});
    await Wallet.deleteMany({});
    await Transaction.deleteMany({});
    await Message.deleteMany({});
    await AnalyticsConfig.deleteMany({});
    await Settings.deleteMany({});

    // Insert new data
    await User.insertMany(updatedData.users);
    await Wallet.insertMany(updatedData.wallets);
    await Transaction.insertMany(updatedData.transactions);
    await Message.insertMany(updatedData.messages);
    await AnalyticsConfig.insertMany(updatedData.analyticsConfigs);
    await Settings.insertMany(updatedData.settings);

    console.log('🌱 Seed data inserted successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error inserting data:', err);
    process.exit(1);
  }
};

seedDatabase();
