import webpush from 'web-push';
import PushSubscription from '../models/PushSubscription.js';

if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails('mailto:support@krishiai.app', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
}

export const sendWeatherAlert = async (payload) => {
  const subscriptions = await PushSubscription.find();
  await Promise.all(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(sub.subscription, JSON.stringify(payload));
      } catch (error) {
        console.error('Push failed', error.message);
      }
    })
  );
};
