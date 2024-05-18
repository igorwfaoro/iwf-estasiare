import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface EventPageHeaderProps {
  children: ReactNode;
  className?: string;
}

export default function EventPageHeader({
  children,
  className
}: EventPageHeaderProps) {
  return (
    <div className={twMerge('pt-6 pb-16 px-4', className)}>{children}</div>
  );
}

// ----------------

interface EventPageTitleProps {
  children: string;
  color?: string;
}

function EventPageHeaderTitle({ children, color }: EventPageTitleProps) {
  return (
    <h1 className="text-3xl font-bold text-center mb-6" style={{ color }}>
      {children}
    </h1>
  );
}

EventPageHeader.Title = EventPageHeaderTitle;

// ----------------

interface EventPageHeaderSubProps {
  children: ReactNode;
}

function EventPageHeaderSub({ children }: EventPageHeaderSubProps) {
  return (
    <div className="max-w-[672px] mx-auto text-lg text-center text-gray-800 space-y-3">
      {children}
    </div>
  );
}

EventPageHeader.Sub = EventPageHeaderSub;
