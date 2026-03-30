import PushSubscription from '../models/PushSubscription.js';

export const saveSubscription = async (req, res) => {
  const existing = await PushSubscription.findOne({ 'subscription.endpoint': req.body.endpoint });
  if (existing) return res.json({ ok: true });

  await PushSubscription.create({ user: req.user.id, subscription: req.body });
  res.status(201).json({ ok: true });
};
