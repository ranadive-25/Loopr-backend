import express from 'express';
import { getAllTransactions } from '../controllers/transaction.controller';

const router = express.Router();

router.get('/', getAllTransactions);

export default router;
