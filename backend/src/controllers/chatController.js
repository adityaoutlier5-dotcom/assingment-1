import { askAI } from '../services/openaiService.js';

export const chat = async (req, res) => {
  const { message, language, context } = req.body;
  const answer = await askAI({ message, language, context });
  res.json({ answer });
};
