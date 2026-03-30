import mongoose from 'mongoose';

const marketPriceSchema = new mongoose.Schema(
  {
    commodity: { type: String, required: true },
    mandi: { type: String, required: true },
    state: { type: String, required: true },
    minPrice: Number,
    maxPrice: Number,
    modalPrice: Number,
    unit: { type: String, default: 'INR/quintal' },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('MarketPrice', marketPriceSchema);
