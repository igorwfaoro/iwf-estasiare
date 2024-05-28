import { ReactNode } from 'react';
import { MdArrowDropDown, MdArrowRight } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

export interface HeaderProps {
  onToggle?: () => void;
  children?: ReactNode;
  className?: string;
  isOpen?: boolean;
}

export default function Header({
  onToggle,
  children,
  className,
  isOpen
}: HeaderProps) {
  return (
    <div
      onClick={onToggle}
      className={twMerge(
        'cursor-pointer bg-gray-200 font-bold p-4 rounded-t-2xl flex items-center gap-2',
        className
      )}
    >
      {isOpen ? <MdArrowDropDown size={24} /> : <MdArrowRight size={24} />}
      <div>{children}</div>
    </div>
  );
}
