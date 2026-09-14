import { create } from 'zustand';
import { authCustomFetch } from '../lib/customFetch';
import { z } from 'zod';

interface User {
  firstname: string;
  lastname: string;
  email: string;
}
interface AuthState {
  type: 'success' | 'error' | 'pending' | '';
  user: User | null;
}
interface AuthActions {
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
  register: (data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => void;
}
export interface Auth extends AuthState, AuthActions {}

const defaultState: AuthState = {
  type: '',
  user: null,
};

const BASE_ROUTE = 'api/v1/auth';

export const useAuth = create<Auth>()((set) => ({
  ...defaultState,
  login: async (data: { email: string; password: string }) => {
    try {
      set({ type: 'pending' });
      localStorage.removeItem('auth');

      const URL = BASE_ROUTE + '/login';
      const response = await authCustomFetch(URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await response.json();
      const parsedToken = TokenSchema.parse(json);
      localStorage.setItem('auth', parsedToken);
      set({ type: 'success' });
    } catch {
      set({ type: 'error' });
    }
  },
  logout: async () => {
    try {
      set({ type: 'pending' });
      localStorage.removeItem('auth');
      set({ type: '' });
    } catch {
      set({ type: 'error' });
    }
  },
  register: async (data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    try {
      set({ type: 'pending' });
      localStorage.removeItem('auth');

      const URL = BASE_ROUTE + '/register';
      const response = await authCustomFetch(URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await response.json();
      const parsedToken = TokenSchema.parse(json);
      localStorage.setItem('auth', parsedToken);
      set({ type: 'success' });
    } catch {
      set({ type: 'error' });
    }
  },
}));

const TokenSchema = z.string();
