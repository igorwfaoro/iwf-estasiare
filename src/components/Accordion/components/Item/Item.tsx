import { ReactElement, cloneElement } from 'react';
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
  return (
    <div className={twMerge('', className)}>
      {children && cloneElement(children[0], { onToggle })}
      {isOpen && children && children[1]}
    </div>
  );
}
