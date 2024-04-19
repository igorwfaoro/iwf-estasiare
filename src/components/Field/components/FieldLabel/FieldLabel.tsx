import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface FieldLabelProps {
  className?: string;
  children: ReactNode;
}

export default function FieldLabel({ className, children }: FieldLabelProps) {
  return (
    <label className={twMerge('text-gray-700 text-sm mb-1', className)}>
      {children}
    </label>
  );
}
