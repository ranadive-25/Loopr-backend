import { Router } from 'express';
import {
  getAllWallets,
  createWallet,
  getWalletById,
  updateWallet,
  deleteWallet
} from '../controllers/wallet.controller';

const router = Router();

router.get('/', getAllWallets);
router.post('/', createWallet);
router.get('/:id', getWalletById);
router.put('/:id', updateWallet);
router.delete('/:id', deleteWallet);

export default router;
