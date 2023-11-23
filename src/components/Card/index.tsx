import { CSSProperties, ReactNode, RefObject } from 'react';
import './index.scss';
import classNames from 'classnames';

interface CardProps {
  children?: ReactNode | ReactNode[];
  className?: string;
  elementRef?: RefObject<HTMLDivElement>;
  style?: CSSProperties;
}

export default function Card({
  children,
  className,
  elementRef,
  style,
}: CardProps) {
  return (
    <div
      className={classNames('app-card', className)}
      ref={elementRef}
      style={style}
    >
      {children}
    </div>
  );
}
