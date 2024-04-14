import classNames from 'classnames';
import { CSSProperties } from 'react';

interface ChipProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Chip({ children, className, style }: ChipProps) {
  return (
    <div
      style={style}
      className={classNames(
        'bg-gray-300 py-[1px] px-2 font-bold rounded-xl',
        className
      )}
    >
      {children}
    </div>
  );
}
