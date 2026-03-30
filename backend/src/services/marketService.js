import MarketPrice from '../models/MarketPrice.js';

const seed = [
  { commodity: 'Wheat', mandi: 'Patna', state: 'Bihar', minPrice: 2200, maxPrice: 2450, modalPrice: 2320 },
  { commodity: 'Rice', mandi: 'Muzaffarpur', state: 'Bihar', minPrice: 2000, maxPrice: 2280, modalPrice: 2150 },
  { commodity: 'Maize', mandi: 'Gaya', state: 'Bihar', minPrice: 1850, maxPrice: 2100, modalPrice: 1980 }
];

export const ensureMarketSeed = async () => {
  const count = await MarketPrice.countDocuments();
  if (!count) {
    await MarketPrice.insertMany(seed);
  }
};
