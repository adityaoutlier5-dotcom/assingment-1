import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export const detectDisease = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Image is required' });

  const form = new FormData();
  form.append('file', fs.createReadStream(req.file.path));

  const { data } = await axios.post(`${process.env.AI_SERVICE_URL}/predict`, form, {
    headers: form.getHeaders()
  });

  fs.unlink(req.file.path, () => {});
  res.json(data);
};
