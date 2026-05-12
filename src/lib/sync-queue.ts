import { Preferences } from '@capacitor/preferences';
import { ref, set } from 'firebase/database';
import { db } from './firebase';

export type ActionType = 'PUMP_TOGGLE' | 'CROP_SELECT';

export interface SyncAction {
  id: string;
  type: ActionType;
  payload: Record<string, unknown>;
  timestamp: number;
}

const QUEUE_KEY = 'offline_sync_queue';

export const SyncQueue = {
  async getQueue(): Promise<SyncAction[]> {
    const { value } = await Preferences.get({ key: QUEUE_KEY });
    if (!value) return [];
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error('Failed to parse sync queue', e);
      return [];
    }
  },

  async enqueueAction(type: ActionType, payload: Record<string, unknown>): Promise<void> {
    const queue = await this.getQueue();
    const newAction: SyncAction = {
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      type,
      payload,
      timestamp: Date.now(),
    };
    queue.push(newAction);
    await Preferences.set({ key: QUEUE_KEY, value: JSON.stringify(queue) });
    console.log(`Enqueued action ${type}:`, payload);
  },

  async clearQueue(): Promise<void> {
    await Preferences.remove({ key: QUEUE_KEY });
  },

  async processQueue(): Promise<void> {
    const queue = await this.getQueue();
    if (queue.length === 0) return;

    console.log(`Processing ${queue.length} items from sync queue...`);

    let successCount = 0;
    // Process actions sequentially
    for (const action of queue) {
      try {
        if (action.type === 'PUMP_TOGGLE') {
          await set(ref(db, '/plant/pump'), action.payload.status);
        } else if (action.type === 'CROP_SELECT') {
          await set(ref(db, '/plant/type'), action.payload.type);
          await set(ref(db, '/plant/threshold'), action.payload.threshold);
        }
        successCount++;
        console.log(`Successfully synced action ${action.type}`);
      } catch (e) {
        console.error(`Failed to process action ${action.type}`, e);
        // If one fails, we might want to stop processing or keep it in the queue.
        // For simplicity, we just keep the whole queue intact if there's an error.
        break;
      }
    }

    // Remove successfully processed actions
    if (successCount > 0) {
      const remainingQueue = queue.slice(successCount);
      await Preferences.set({ key: QUEUE_KEY, value: JSON.stringify(remainingQueue) });
      console.log(`Removed ${successCount} successfully synced items. ${remainingQueue.length} remaining.`);
    }
  }
};
