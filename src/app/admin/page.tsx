'use client';

import { useSession } from 'next-auth/react';
import EventsList from './components/EventsList/EventsList';

interface AdminPageProps {}

export default function AdminPage({}: AdminPageProps) {
  const session = useSession();

  if (session.status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <EventsList />
    </div>
  );
}
