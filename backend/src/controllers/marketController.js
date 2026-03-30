import MarketPrice from '../models/MarketPrice.js';

export const getMarketPrices = async (req, res) => {
  const { state = 'Bihar', commodity } = req.query;
  const query = { state };
  if (commodity) query.commodity = new RegExp(commodity, 'i');

  const prices = await MarketPrice.find(query).sort({ updatedAt: -1 });
  res.json(prices);
};
