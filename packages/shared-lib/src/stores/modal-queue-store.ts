import { create } from 'zustand';
import { ModalQueueItem } from '@product-portal/types';
import { MODAL_QUEUE_MAX_SIZE } from '@product-portal/constants';

interface ModalQueueState {
  queue: ModalQueueItem[];
  currentModal: ModalQueueItem | null;
  addModal: (modal: Omit<ModalQueueItem, 'id'>) => void;
  removeModal: (id: string) => void;
  showNext: () => void;
  clearQueue: () => void;
}

export const useModalQueueStore = create<ModalQueueState>((set, get) => ({
  queue: [],
  currentModal: null,

  addModal: (modal) => {
    const id = `modal-${Date.now()}-${Math.random()}`;
    const newModal: ModalQueueItem = { ...modal, id };

    set((state) => {
      if (state.queue.length >= MODAL_QUEUE_MAX_SIZE) {
        console.warn('[Modal Queue] Maximum size reached, dropping oldest modal');
        return {
          queue: [...state.queue.slice(1), newModal],
        };
      }

      const sortedQueue = [...state.queue, newModal].sort(
        (a, b) => (b.priority || 0) - (a.priority || 0)
      );

      if (!state.currentModal) {
        const [next, ...rest] = sortedQueue;
        return {
          currentModal: next || null,
          queue: rest,
        };
      }

      return { queue: sortedQueue };
    });
  },

  removeModal: (id) => {
    set((state) => ({
      queue: state.queue.filter((modal) => modal.id !== id),
      currentModal: state.currentModal?.id === id ? null : state.currentModal,
    }));

    if (get().currentModal === null) {
      get().showNext();
    }
  },

  showNext: () => {
    set((state) => {
      const [next, ...rest] = state.queue;
      return {
        currentModal: next || null,
        queue: rest,
      };
    });
  },

  clearQueue: () => {
    set({ queue: [], currentModal: null });
  },
}));
