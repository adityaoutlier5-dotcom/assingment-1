import axios from 'axios';

export const askAI = async ({ message, language = 'hi', context = '' }) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are KrishiAI assistant for farmers. Give practical agriculture advice. Reply in user language. Keep response concise and safe.'
        },
        {
          role: 'user',
          content: `Language: ${language}. Context: ${context}. Question: ${message}`
        }
      ],
      temperature: 0.3
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  );

  return response.data.choices?.[0]?.message?.content || '';
};
