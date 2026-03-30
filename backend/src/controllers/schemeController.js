import Scheme from '../models/Scheme.js';

export const seedSchemes = async () => {
  const count = await Scheme.countDocuments();
  if (count) return;

  await Scheme.insertMany([
    {
      title: 'PM-KISAN',
      description: 'Income support of ₹6000 per year to eligible farmer families.',
      state: 'All',
      eligibility: 'Small and marginal farmers',
      link: 'https://pmkisan.gov.in',
      tags: ['income support']
    },
    {
      title: 'Bihar Krishi Input Anudan',
      description: 'Subsidy support on seeds and farm inputs for Bihar farmers.',
      state: 'Bihar',
      eligibility: 'Registered Bihar farmers',
      link: 'https://dbtagriculture.bihar.gov.in',
      tags: ['subsidy', 'bihar']
    }
  ]);
};

export const getSchemes = async (req, res) => {
  const { state = 'Bihar' } = req.query;
  const schemes = await Scheme.find({ $or: [{ state: 'All' }, { state }] });
  res.json(schemes);
};
