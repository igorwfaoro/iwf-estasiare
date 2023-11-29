'use client';

import { useSession } from 'next-auth/react';

interface ProfileProps {}

export default function Profile({}: ProfileProps) {
  const session = useSession();

  return (
    <>
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </>
  );
}
