import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cron from 'node-cron';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import featureRoutes from './routes/featureRoutes.js';
import { ensureMarketSeed } from './services/marketService.js';
import { seedSchemes } from './controllers/schemeController.js';
import { sendWeatherAlert } from './services/notificationService.js';

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/features', featureRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

const start = async () => {
  await connectDB();
  await Promise.all([ensureMarketSeed(), seedSchemes()]);

  cron.schedule('0 6 * * *', async () => {
    await sendWeatherAlert({
      title: 'KrishiAI Alert',
      body: 'Check today weather before irrigation.'
    });
  });

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Backend running on port ${process.env.PORT || 5000}`);
  });
};

start();
