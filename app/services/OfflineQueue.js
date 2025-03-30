import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const QUEUE_KEY = 'offlineQueue';

export async function addAction(action) {
  const queue = await getQueue();
  queue.push(action);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export async function getQueue() {
  const stored = await AsyncStorage.getItem(QUEUE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function clearQueue() {
  await AsyncStorage.removeItem(QUEUE_KEY);
}

export async function processQueue(processAction) {
  const queue = await getQueue();
  for (const action of queue) {
    try {
      await processAction(action);
    } catch (error) {
      console.error('Failed to process action:', action, error);
      return; // stop processing on first failure;
    }
  }
  await clearQueue();
}

// Automatically process the queue when online.
NetInfo.addEventListener((state) => {
  if (state.isConnected) {
    processQueue(async (action) => {
      await fetch(action.url, action.options);
    });
  }
});

