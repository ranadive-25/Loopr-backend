import { Request, Response } from 'express';
import { Message } from '../models/Message';
import { sendSuccess, sendError } from '../utils/responseHandler';

export const getAllMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, type, isRead } = req.query;
    const filter: any = {};

    if (user_id) filter.user_id = user_id;
    if (type) filter.type = type;
    if (isRead !== undefined) filter.isRead = isRead === 'true';

    const messages = await Message.find(filter)
      .populate('user_id', '-password -__v')
      .sort({ createdAt: -1 });

    sendSuccess(res, messages, 'Messages fetched successfully');
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    sendError(res, 'Error fetching messages');
  }
};

export const getMessageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await Message.findById(req.params.id).populate('user_id', '-password -__v');
    if (!message) {
      sendError(res, 'Message not found', 404);
      return;
    }
    sendSuccess(res, message, 'Message fetched successfully');
  } catch (error) {
    console.error('❌ Error fetching message by ID:', error);
    sendError(res, 'Error fetching message by ID');
  }
};

export const createMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const newMessage = new Message(req.body);
    const saved = await newMessage.save();
    sendSuccess(res, saved, 'Message created successfully', 201);
  } catch (error) {
    console.error('❌ Error creating message:', error);
    sendError(res, 'Error creating message');
  }
};

export const updateMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      sendError(res, 'Message not found', 404);
      return;
    }
    sendSuccess(res, updated, 'Message updated successfully');
  } catch (error) {
    console.error('❌ Error updating message:', error);
    sendError(res, 'Error updating message');
  }
};

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, 'Message not found', 404);
      return;
    }
    sendSuccess(res, { id: deleted._id }, 'Message deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting message:', error);
    sendError(res, 'Error deleting message');
  }
};
