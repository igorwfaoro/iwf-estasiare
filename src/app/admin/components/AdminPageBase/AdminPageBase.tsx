import { ReactNode } from 'react';

interface AdminPageBaseProps {
  children: ReactNode;
}

export default function AdminPageBase({ children }: AdminPageBaseProps) {
  return <div className="p-5 pt-7 bg-gray-100">{children}</div>;
}

// ---------------------------

interface AdminPageTitleProps {
  children: string;
}

function AdminPageTitle({ children }: AdminPageTitleProps) {
  return <h1 className="text-3xl font-bold mb-3">{children}</h1>;
}

AdminPageBase.Title = AdminPageTitle;
