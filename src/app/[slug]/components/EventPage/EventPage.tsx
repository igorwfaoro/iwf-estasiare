import { ReactNode } from 'react';

interface EventPageProps {
  children: ReactNode;
}

export default function EventPage({ children }: EventPageProps) {
  return <div className="p-5 pt-12 bg-gray-100">{children}</div>;
}
