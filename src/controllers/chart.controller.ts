import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';

export const getChartData = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find();

    const monthlyData: { [key: string]: { income: number; expenses: number } } = {};

    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString('default', { month: 'short', year: 'numeric' });

      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expenses: 0 };
      }

      if (t.amount > 0) {
        monthlyData[month].income += t.amount;
      } else {
        monthlyData[month].expenses += Math.abs(t.amount);
      }
    });

    const formattedData = Object.keys(monthlyData).map((month) => ({
      month,
      income: monthlyData[month].income,
      expenses: monthlyData[month].expenses,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error('❌ Error in getChartData:', error);
    res.status(500).json({ message: 'Error fetching chart data', error });
  }
};
