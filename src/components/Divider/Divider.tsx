import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface DividerProps extends InputHTMLAttributes<HTMLDivElement> {}

export default function Divider({ className, ...otherProps }: DividerProps) {
  return (
    <div
      className={twMerge('w-full bg-gray-300 h-[1px]', className)}
      {...otherProps}
    />
  );
}
