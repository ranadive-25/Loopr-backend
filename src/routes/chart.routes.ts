import express from 'express';
import { getChartData } from '../controllers/chart.controller';

const router = express.Router();

router.get('/chart-data', getChartData);

export default router;
