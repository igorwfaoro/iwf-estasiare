import { ReactNode } from 'react';

export interface HeaderProps {
  onToggle?: () => void;
  children?: ReactNode;
}

export default function Header({ onToggle, children }: HeaderProps) {
  return (
    <div onClick={onToggle} className="cursor-pointer">
      {children}
    </div>
  );
}
