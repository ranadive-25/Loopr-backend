// src/controllers/stats.controller.ts
import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find();

    const balance: number = transactions.reduce((sum: number, t) => sum + t.amount, 0);
    const revenue: number = transactions
      .filter(t => t.amount > 0)
      .reduce((sum: number, t) => sum + t.amount, 0);

    const expenses: number = transactions
      .filter(t => t.amount < 0)
      .reduce((sum: number, t) => sum + Math.abs(t.amount), 0);

    const savings: number = balance - expenses;

    res.status(200).json({
      Balance: balance,
      Revenue: revenue,
      Expenses: expenses,
      Savings: savings,
    });
  } catch (error) {
    console.error('❌ Error in getStats:', error);
    res.status(500).json({ message: 'Error fetching stats', error });
  }
};
