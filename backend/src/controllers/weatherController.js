import { getSevenDayWeather } from '../services/weatherService.js';

export const getWeather = async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ message: 'lat and lon are required' });
  }
  const weather = await getSevenDayWeather({ lat, lon });
  res.json(weather);
};
