import { ReactElement, cloneElement, useRef, useEffect, useState } from 'react';
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
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (isOpen) {
      setHeight(`${contentRef.current?.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [isOpen]);

  return (
    <div className={twMerge('border border-gray-200 rounded-2xl overflow-hidden', className)}>
      {children && cloneElement(children[0], { onToggle, isOpen })}
      <div
        ref={contentRef}
        className={`transition-all duration-300 ease-in-out`}
        style={{ maxHeight: height }}
      >
        {children && children[1]}
      </div>
    </div>
  );
}
