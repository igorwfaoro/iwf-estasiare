import { ReactNode } from 'react';
import './index.scss';
import classNames from 'classnames';

interface CardProps {
  children?: ReactNode | ReactNode[];
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return <div className={classNames('app-card', className)}>{children}</div>;
}
