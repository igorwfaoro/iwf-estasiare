import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface FieldHelpTextProps {
  className?: string;
  children: ReactNode;
}

export default function FieldHelpText({
  className,
  children
}: FieldHelpTextProps) {
  return (
    <small className={twMerge('text-neutral-500', className)}>{children}</small>
  );
}
