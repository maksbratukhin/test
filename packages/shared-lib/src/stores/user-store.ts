import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@product-portal/types';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => {
        set({ user: { ...user, isLoggedIn: true } });
      },

      logout: () => {
        set({ user: null });
      },

      isLoggedIn: () => {
        return get().user?.isLoggedIn ?? false;
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
