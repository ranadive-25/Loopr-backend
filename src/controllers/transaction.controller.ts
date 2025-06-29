import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';
import { sendSuccess, sendError } from '../utils/responseHandler';

export const getAllTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search = '',
      category,
      status,
      user_id,
      wallet_id,
      sortBy = 'date',
      order = 'desc',
      page = '1',
      limit = '10',
    } = req.query;

    const filter: any = {};
    if (search) filter.description = { $regex: search, $options: 'i' };
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (user_id) filter.user_id = user_id;
    if (wallet_id) filter.wallet_id = wallet_id;

    const sortOrder = order === 'asc' ? 1 : -1;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const transactions = await Transaction.find(filter)
      .populate('user_id wallet_id')
      .sort({ [sortBy as string]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit as string));

    const total = await Transaction.countDocuments(filter);

    sendSuccess(res, {
      data: transactions,
      total,
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      totalPages: Math.ceil(total / parseInt(limit as string)),
    }, 'Transactions fetched successfully');
  } catch (error) {
    console.error('❌ Error fetching transactions:', error);
    sendError(res, 'Error fetching transactions');
  }
};



export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('user_id wallet_id');
    if (!transaction) {
      sendError(res, 'Transaction not found', 404);
      return;
    }
    sendSuccess(res, transaction, 'Transaction fetched successfully');
  } catch (error) {
    console.error('❌ Error fetching transaction by ID:', error);
    sendError(res, 'Error fetching transaction by ID');
  }
};

