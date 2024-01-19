import { ReactNode } from 'react';

interface EventPageBaseProps {
  children: ReactNode;
}

export default function EventPageBase({ children }: EventPageBaseProps) {
  return <div className="p-5 pt-12 bg-gray-100">{children}</div>;
}
