import { customFetch } from './customFetch';
import { AuthError } from './errors/AuthError';

export async function authCustomFetch(input: string, init?: RequestInit) {
  const authToken = localStorage.getItem('auth');
  if (!authToken) throw new AuthError('Unauthenticated');

  return customFetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${authToken}`,
    },
  });
}
