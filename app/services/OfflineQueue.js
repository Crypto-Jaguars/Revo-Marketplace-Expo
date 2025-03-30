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
  const failedActions = [];

  for (const action of queue) {
    try {
      await processAction(action);
    } catch (error) {
      console.error('Failed to process action:', action, error);
      failedActions.push({ ...action, error: error.message });
      // Continue processing other actions
    }
  }

  if (failedActions.length > 0) {
    // Save failed actions back to the queue for retry later
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(failedActions));
    console.log(`${failedActions.length} actions failed and will be retried later.`);
  } else {
    // All actions processed successfully, clear the queue
    await clearQueue();
  }

  return {
    processed: queue.length - failedActions.length,
    failed: failedActions.length,
  };
}

// Dedicated process function to use with processQueue that checks HTTP errors.
async function fetchAction(action) {
  const response = await fetch(action.url, action.options);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response;
}

// Create a named subscription that can be unsubscribed when needed.
let netInfoUnsubscribe = null;

export function initNetworkListener() {
  // Avoid duplicate listeners
  if (netInfoUnsubscribe) {
    netInfoUnsubscribe();
  }

  // Initial check if online to process any queued actions immediately.
  NetInfo.fetch().then((state) => {
    if (state.isConnected) {
      processQueue(fetchAction);
    }
  });

  // Subscribe to network changes.
  netInfoUnsubscribe = NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      processQueue(fetchAction);
    }
  });
}

export function cleanupNetworkListener() {
  if (netInfoUnsubscribe) {
    netInfoUnsubscribe();
    netInfoUnsubscribe = null;
  }
}

// Initialize the listener
initNetworkListener();
