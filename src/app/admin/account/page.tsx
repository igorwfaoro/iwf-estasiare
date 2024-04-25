'use client';

import { useSession } from 'next-auth/react';

interface AccountPageProps {}

export default function AccountPage({}: AccountPageProps) {
  const { data } = useSession();

  return (
    <div>
      <h1>Account</h1>

      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
