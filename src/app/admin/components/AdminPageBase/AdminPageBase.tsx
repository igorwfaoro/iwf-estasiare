import { ReactElement, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface AdminPageBaseProps {
  children: ReactNode;
}

export default function AdminPageBase({ children }: AdminPageBaseProps) {
  return <div className="p-5 pt-7 bg-gray-100">{children}</div>;
}

// ---------------------------

interface AdminPageTitleProps {
  children: ReactElement | ReactElement[] | string;
  className?: string;
}

function AdminPageTitle({ children, className }: AdminPageTitleProps) {
  return (
    <h1 className={twMerge('text-3xl font-bold mb-3', className)}>
      {children}
    </h1>
  );
}

AdminPageBase.Title = AdminPageTitle;
