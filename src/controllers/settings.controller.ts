// src/controllers/settings.controller.ts
import { Request, Response } from 'express';
import { Settings } from '../models/Settings';
import { User } from '../models/User'; // for population

export const getSettingsByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = await Settings.findOne({ user_id: req.params.userId }).populate('user_id', '-password');
    if (!settings) {
      res.status(404).json({ error: 'Settings not found for this user' });
      return;
    }
    res.status(200).json(settings);
  } catch (error) {
    console.error('❌ Error fetching settings:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createOrUpdateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, ...updateData } = req.body;
    const updated = await Settings.findOneAndUpdate(
      { user_id },
      { $set: updateData },
      { upsert: true, new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    console.error('❌ Error saving settings:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Settings.findOneAndDelete({ user_id: req.params.userId });
    if (!deleted) {
      res.status(404).json({ error: 'Settings not found to delete' });
      return;
    }
    res.status(200).json({ message: 'Settings deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Settings.findOneAndUpdate(
      { user_id: req.params.userId },
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ error: 'Settings not found' });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error('❌ Error updating settings:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
