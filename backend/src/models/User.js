import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    language: { type: String, enum: ['en', 'hi'], default: 'hi' },
    location: {
      state: { type: String, default: 'Bihar' },
      district: { type: String },
      lat: Number,
      lon: Number
    },
    crops: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
