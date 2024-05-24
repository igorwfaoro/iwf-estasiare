import { MouseEventHandler, ReactNode, RefObject } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children?: ReactNode | ReactNode[];
  className?: string;
  ref?: RefObject<HTMLDivElement>;
  bgImageUrl?: string | null;
  bgColor?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function Card({
  children,
  className,
  ref,
  bgImageUrl,
  bgColor,
  onClick
}: CardProps) {
  return (
    <div
      className={twMerge('rounded-2xl border', className)}
      ref={ref}
      style={{
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : '',
        backgroundColor: bgColor
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
