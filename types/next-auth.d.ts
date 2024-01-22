import NextAuth from 'next-auth';
import { AuthUser } from '../src/auth/auth-user';

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
  }
}
