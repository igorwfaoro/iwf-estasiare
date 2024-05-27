import { ReactNode } from 'react';

export interface ContentProps {
  children?: ReactNode;
}

export default function Content({ children }: ContentProps) {
  return <div>{children}</div>;
}
