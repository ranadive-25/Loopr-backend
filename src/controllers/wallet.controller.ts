import { Request, Response } from 'express';
import { Wallet } from '../models/Wallet';
import { User } from '../models/User';
import { sendSuccess, sendError } from '../utils/responseHandler';

export const getAllWallets = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      user_id,
      currency,
      type,
      search = '',
      sortBy = 'balance',
      order = 'desc',
      page = '1',
      limit = '10',
    } = req.query;

    const filter: any = {};
    if (user_id) filter.user_id = user_id;
    if (currency) filter.currency = currency;
    if (type) filter.type = type;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const sortOrder = order === 'asc' ? 1 : -1;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const wallets = await Wallet.find(filter)
      .populate('user_id', '-password -__v')
      .sort({ [sortBy as string]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit as string));

    const total = await Wallet.countDocuments(filter);

    sendSuccess(res, {
      data: wallets,
      total,
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      totalPages: Math.ceil(total / parseInt(limit as string)),
    }, 'Wallets fetched successfully');
  } catch (error) {
    console.error('❌ Error fetching wallets:', error);
    sendError(res, 'Error fetching wallets');
  }
};

export const createWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const wallet = new Wallet(req.body);
    const saved = await wallet.save();
    sendSuccess(res, saved, 'Wallet created successfully', 201);
  } catch (error) {
    console.error('❌ Error creating wallet:', error);
    sendError(res, 'Error creating wallet');
  }
};

export const getWalletById = async (req: Request, res: Response): Promise<void> => {
  try {
    const wallet = await Wallet.findById(req.params.id).populate('user_id', '-password -__v');
    if (!wallet) {
      sendError(res, 'Wallet not found', 404);
      return;
    }
    sendSuccess(res, wallet, 'Wallet fetched successfully');
  } catch (error) {
    console.error('❌ Error fetching wallet:', error);
    sendError(res, 'Error fetching wallet');
  }
};

export const updateWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const wallet = await Wallet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!wallet) {
      sendError(res, 'Wallet not found', 404);
      return;
    }
    sendSuccess(res, wallet, 'Wallet updated successfully');
  } catch (error) {
    console.error('❌ Error updating wallet:', error);
    sendError(res, 'Error updating wallet');
  }
};

export const deleteWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const wallet = await Wallet.findByIdAndDelete(req.params.id);
    if (!wallet) {
      sendError(res, 'Wallet not found', 404);
      return;
    }
    sendSuccess(res, { id: wallet._id }, 'Wallet deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting wallet:', error);
    sendError(res, 'Error deleting wallet');
  }
};
