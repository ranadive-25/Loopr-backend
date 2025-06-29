import express from 'express';
import {
  getAllAnalyticsConfigs,
  getAnalyticsConfigByUser,
  createAnalyticsConfig,
  updateAnalyticsConfig,
  deleteAnalyticsConfig
} from '../controllers/analyticsConfig.controller';

const router = express.Router();

router.get('/', getAllAnalyticsConfigs);
router.get('/:userId', getAnalyticsConfigByUser);
router.post('/', createAnalyticsConfig);
router.put('/:userId', updateAnalyticsConfig);
router.delete('/:userId', deleteAnalyticsConfig);

export default router;
