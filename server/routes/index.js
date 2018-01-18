import express from 'express';
import geolocationRoutes from './geolocation';

const router = express.Router();

router.use('/geolocation', geolocationRoutes);

export default router;
