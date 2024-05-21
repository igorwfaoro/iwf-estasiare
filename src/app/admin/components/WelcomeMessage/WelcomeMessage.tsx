'use client';

import { useSession } from 'next-auth/react';

interface WelcomeMessageProps {}

export default function WelcomeMessage({}: WelcomeMessageProps) {
  const { data: sessionData } = useSession();

  if (!sessionData?.user) return 'Bem vindo(a)!';

  const name = sessionData.user.name.split(' ')[0];

  return `Bem vindo(a), ${name}`;
}
