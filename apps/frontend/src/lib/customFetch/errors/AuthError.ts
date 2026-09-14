export class AuthError extends Error {
  constructor(message?: string) {
    super(message ?? 'Authentication Failed');
    this.name = 'AuthError';
  }
}
