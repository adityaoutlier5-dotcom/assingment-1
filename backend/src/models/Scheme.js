import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    state: { type: String, default: 'All' },
    link: String,
    eligibility: String,
    tags: [String]
  },
  { timestamps: true }
);

export default mongoose.model('Scheme', schemeSchema);
