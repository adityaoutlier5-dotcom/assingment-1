import { Router } from 'express';
import multer from 'multer';
import { getWeather } from '../controllers/weatherController.js';
import { recommendCrop } from '../controllers/cropController.js';
import { detectDisease } from '../controllers/diseaseController.js';
import { getMarketPrices } from '../controllers/marketController.js';
import { getSchemes } from '../controllers/schemeController.js';
import { chat } from '../controllers/chatController.js';
import { saveSubscription } from '../controllers/notificationController.js';
import { protect } from '../middleware/auth.js';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.get('/weather', getWeather);
router.post('/crop-recommendation', recommendCrop);
router.post('/disease-detection', upload.single('image'), detectDisease);
router.get('/market-prices', getMarketPrices);
router.get('/schemes', getSchemes);
router.post('/chat', chat);
router.post('/notifications/subscribe', protect, saveSubscription);

export default router;
