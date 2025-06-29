import { Request, Response } from 'express';
import { AnalyticsConfig } from '../models/AnalyticsConfig';

export const getAllAnalyticsConfigs = async (req: Request, res: Response): Promise<void> => {
  try {
    const configs = await AnalyticsConfig.find();
    res.status(200).json({ data: configs });
  } catch (error) {
    console.error('❌ Error fetching configs:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

import mongoose from 'mongoose'; // Required for ObjectId

export const getAnalyticsConfigByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const config = await AnalyticsConfig.findOne({ user_id: req.params.userId }).populate('user_id', '-password -__v');

    if (!config) {
      res.status(404).json({ error: 'Analytics config not found' });
      return;
    }

    res.status(200).json(config);
  } catch (error) {
    console.error('❌ Error getting analytics config:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const createAnalyticsConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const config = new AnalyticsConfig(req.body);
    const saved = await config.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Error creating config:', error);
    res.status(400).json({ error: 'Invalid data', detail: error });
  }
};

export const updateAnalyticsConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await AnalyticsConfig.findOneAndUpdate(
      { user_id: req.params.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ error: 'Analytics config not found' });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error('❌ Error updating analytics config:', error);
    res.status(400).json({ error: 'Update failed', detail: error });
  }
};

export const deleteAnalyticsConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await AnalyticsConfig.findOneAndDelete({ user_id: req.params.userId });

    if (!deleted) {
      res.status(404).json({ error: 'Analytics config not found' });
      return;
    }

    res.status(200).json({ message: 'Analytics config deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting analytics config:', error);
    res.status(500).json({ error: 'Delete failed' });
  }
};
