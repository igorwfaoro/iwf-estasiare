import NextAuth from 'next-auth';
import { UserViewModel } from '../src/models/view-models/user.view-model';

declare module 'next-auth' {
  interface Session {
    user: UserViewModel;
  }
}
