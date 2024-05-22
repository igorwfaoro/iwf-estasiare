import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface EventPageBaseProps {
  children: ReactNode;
  className?: string;
}

export default function EventPageBase({
  children,
  className
}: EventPageBaseProps) {
  return (
    <div className={twMerge('p-5 pt-12 bg-gray-100', className)}>
      {children}
    </div>
  );
}
