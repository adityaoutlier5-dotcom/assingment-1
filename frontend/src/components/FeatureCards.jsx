import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/client';
import { speakText, startSpeechToText } from '../utils/voice';

const card = 'glass-card p-4 space-y-3';

const FeatureCards = () => {
  const [weather, setWeather] = useState(null);
  const [cropReco, setCropReco] = useState(null);
  const [market, setMarket] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [chat, setChat] = useState({ message: '', answer: '' });
  const [disease, setDisease] = useState(null);

  const getLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { data } = await api.get('/features/weather', { params: { lat: coords.latitude, lon: coords.longitude } });
      setWeather(data.daily?.slice(0, 7) || []);
    });
  };

  const runCropReco = async () => {
    const { data } = await api.post('/features/crop-recommendation', {
      soilType: 'Alluvial',
      season: 'Kharif',
      location: 'Bihar'
    });
    setCropReco(data);
  };

  const fetchMarket = async () => {
    const { data } = await api.get('/features/market-prices', { params: { state: 'Bihar' } });
    setMarket(data);
  };

  const fetchSchemes = async () => {
    const { data } = await api.get('/features/schemes', { params: { state: 'Bihar' } });
    setSchemes(data);
  };

  const sendChat = async () => {
    const { data } = await api.post('/features/chat', { message: chat.message, language: 'hi' });
    setChat((prev) => ({ ...prev, answer: data.answer }));
  };

  const uploadDiseaseImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await api.post('/features/disease-detection', formData);
    setDisease(data);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4 text-white">
      <motion.section whileHover={{ y: -4 }} className={card}>
        <h2 className="font-semibold">🌦️ Weather (7-day)</h2>
        <button className="px-3 py-2 rounded bg-emerald-500 text-black" onClick={getLocationWeather}>Use My Location</button>
        <ul className="text-sm">{weather?.map((d, i) => <li key={i}>Day {i + 1}: {d.temp.day}°C</li>)}</ul>
      </motion.section>

      <motion.section whileHover={{ y: -4 }} className={card}>
        <h2 className="font-semibold">🌱 Crop Recommendation</h2>
        <button className="px-3 py-2 rounded bg-emerald-500 text-black" onClick={runCropReco}>Recommend</button>
        {cropReco && <p>{cropReco.recommendedCrops.join(', ')} — {cropReco.reasoning}</p>}
      </motion.section>

      <motion.section whileHover={{ y: -4 }} className={card}>
        <h2 className="font-semibold">🦠 Disease Detection</h2>
        <input type="file" accept="image/*" onChange={(e) => uploadDiseaseImage(e.target.files[0])} />
        {disease && <p>{disease.disease} ({disease.confidence}%) - {disease.treatment}</p>}
      </motion.section>

      <motion.section whileHover={{ y: -4 }} className={card}>
        <h2 className="font-semibold">💰 Mandi Prices</h2>
        <button className="px-3 py-2 rounded bg-emerald-500 text-black" onClick={fetchMarket}>Load Prices</button>
        <ul>{market.map((m) => <li key={`${m.commodity}-${m.mandi}`}>{m.commodity} {m.modalPrice}</li>)}</ul>
      </motion.section>

      <motion.section whileHover={{ y: -4 }} className={card}>
        <h2 className="font-semibold">🏛️ Government Schemes</h2>
        <button className="px-3 py-2 rounded bg-emerald-500 text-black" onClick={fetchSchemes}>Load Schemes</button>
        <ul>{schemes.map((s) => <li key={s._id}>{s.title}</li>)}</ul>
      </motion.section>

      <motion.section whileHover={{ y: -4 }} className={card}>
        <h2 className="font-semibold">🤖 AI Assistant</h2>
        <div className="flex gap-2">
          <input className="w-full p-2 rounded bg-slate-800" value={chat.message} onChange={(e) => setChat({ ...chat, message: e.target.value })} placeholder="Ask in Hindi/English" />
          <button className="px-3 py-2 rounded bg-cyan-500 text-black" onClick={() => startSpeechToText((text) => setChat((p) => ({ ...p, message: text })))}>🎤</button>
        </div>
        <button className="px-3 py-2 rounded bg-emerald-500 text-black" onClick={sendChat}>Send</button>
        {chat.answer && <p onClick={() => speakText(chat.answer)}>{chat.answer}</p>}
      </motion.section>
    </div>
  );
};

export default FeatureCards;
