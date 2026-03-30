import axios from 'axios';

export const getSevenDayWeather = async ({ lat, lon }) => {
  const url = 'https://api.openweathermap.org/data/3.0/onecall';
  const { data } = await axios.get(url, {
    params: {
      lat,
      lon,
      exclude: 'minutely,hourly,alerts',
      units: 'metric',
      appid: process.env.OPENWEATHER_API_KEY
    }
  });

  return data;
};
