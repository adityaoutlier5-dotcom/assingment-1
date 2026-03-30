const cropMap = {
  loamy: { kharif: ['Rice', 'Maize'], rabi: ['Wheat', 'Mustard'] },
  alluvial: { kharif: ['Paddy', 'Jute'], rabi: ['Potato', 'Lentil'] },
  black: { kharif: ['Cotton', 'Soybean'], rabi: ['Gram', 'Wheat'] }
};

export const recommendCrop = async (req, res) => {
  const { soilType, season, location } = req.body;
  const soil = soilType?.toLowerCase();
  const seasonKey = season?.toLowerCase();
  const crops = cropMap[soil]?.[seasonKey] || ['Millets', 'Pulses'];

  res.json({
    location,
    recommendedCrops: crops,
    reasoning: `Based on ${soilType} soil and ${season} season conditions in ${location}.`
  });
};
