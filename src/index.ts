import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import transactionRoutes from './routes/transaction.routes';
import walletRoutes from './routes/wallet.routes';
import messageRoutes from './routes/message.routes';
import analyticsConfigRoutes from './routes/analyticsConfig.routes';
import settingsRoutes from './routes/settings.routes';
import userRoutes from './routes/user.routes';
import statsRoutes from './routes/stats.routes';
import chartRoutes from './routes/chart.routes';


import './models/User';
import './models/Wallet';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/analytics', analyticsConfigRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/users', userRoutes);
app.use('/api', statsRoutes);
app.use('/api', chartRoutes);




// Test route
app.get('/', (req, res) => {
  res.send('Loopr API is working 🎉');
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});


