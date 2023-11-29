import { SessionProvider } from 'next-auth/react';
import Profile from './components/Profile';

interface AdminPageProps {}

export default function AdminPage({}: AdminPageProps) {
  return (
    <SessionProvider>
      <Profile />
    </SessionProvider>
  );
}
