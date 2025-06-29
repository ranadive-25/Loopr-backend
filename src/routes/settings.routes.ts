import express from 'express';
import {
  getSettingsByUserId,
  createOrUpdateSettings,
  updateSettings,
  deleteSettings
} from '../controllers/settings.controller';

const router = express.Router();

router.get('/:userId', getSettingsByUserId);
router.post('/', createOrUpdateSettings);
router.put('/:userId', updateSettings); // <-- new update route
router.delete('/:userId', deleteSettings);

export default router;
