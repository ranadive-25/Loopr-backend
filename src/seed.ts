import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Import your models
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

const loadData = async () => {
  const filePath = path.join(__dirname, '../loopr_seed_data.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  try {
    await connectDB();

    // Optional: clear previous data
    await User.deleteMany({});
    await Wallet.deleteMany({});
    await Transaction.deleteMany({});
    await Message.deleteMany({});
    await AnalyticsConfig.deleteMany({});
    await Settings.deleteMany({});

    // Insert data
    await User.insertMany(jsonData.users);
    await Wallet.insertMany(jsonData.wallets);
    await Transaction.insertMany(jsonData.transactions);
    await Message.insertMany(jsonData.messages);
    await AnalyticsConfig.insertMany(jsonData.analyticsConfigs);
    await Settings.insertMany(jsonData.settings);

    console.log('🌱 Seed data inserted successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error inserting data:', err);
    process.exit(1);
  }
};

loadData();
