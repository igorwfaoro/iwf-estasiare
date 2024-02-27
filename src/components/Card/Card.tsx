import { CSSProperties, ReactNode, RefObject } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children?: ReactNode | ReactNode[];
  className?: string;
  elementRef?: RefObject<HTMLDivElement>;
  bgImageUrl?: string;
}

export default function Card({
  children,
  className,
  elementRef,
  bgImageUrl
}: CardProps) {
  return (
    <div
      className={twMerge('rounded-2xl border', className)}
      ref={elementRef}
      style={{ backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : '' }}
    >
      {children}
    </div>
  );
}
