'use client';

import { useSession } from 'next-auth/react';
import GoogleButton from '../GoogleButton';

interface ProfileProps {}

export default function Profile({}: ProfileProps) {
  const session = useSession();

  return (
    <>
      <GoogleButton />
      <br />
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </>
  );
}
