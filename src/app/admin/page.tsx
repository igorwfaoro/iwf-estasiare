'use client';

import { useSession } from 'next-auth/react';

interface AdminPageProps {}

export default function AdminPage({}: AdminPageProps) {
  const session = useSession();

  if (session.status === 'loading') {
    return <div>Loading...</div>;
  }

  return <div>admin</div>
}
