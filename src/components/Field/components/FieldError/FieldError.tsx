import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface FieldErrorProps {
  className?: string;
  children: ReactNode;
}

export default function FieldError({ className, children }: FieldErrorProps) {
  return (
    <span className={twMerge('text-sm text-red-600', className)}>
      {children}
    </span>
  );
}
