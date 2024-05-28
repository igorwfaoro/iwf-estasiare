import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ContentProps {
  children?: ReactNode;
  className?: string;
}

export default function Content({ children, className }: ContentProps) {
  return <div className={twMerge('p-4 rounded-b-2xl', className)}>{children}</div>;
}
