import { ReactElement, cloneElement, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { ContentProps } from './components/Content/Content';
import { HeaderProps } from './components/Header/Header';

export interface ItemProps {
  children?: [ReactElement<HeaderProps>, ReactElement<ContentProps>];
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function Item({
  children,
  className,
  isOpen,
  onToggle
}: ItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={twMerge(
        'border border-gray-200 rounded-2xl overflow-hidden',
        className
      )}
    >
      {children && cloneElement(children[0], { onToggle, isOpen })}
      <div
        ref={contentRef}
        className={`transform transition-transform duration-300 ease-in-out origin-top ${isOpen ? 'scale-y-100 h-auto' : 'scale-y-0 h-0'}`}
        style={{ transformOrigin: 'top' }}
      >
        {children && children[1]}
      </div>
    </div>
  );
}
