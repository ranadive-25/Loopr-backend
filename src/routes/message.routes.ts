import express from 'express';
import {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/message.controller';

const router = express.Router();

router.get('/', getAllMessages);        // ✅ Just pass the function, do not call it
router.get('/:id', getMessageById);     // ✅ No () after function name
router.post('/', createMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;
