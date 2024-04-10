'use client';

import classNames from 'classnames';
import { ReactElement, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Skeleton from '../Skeleton/Skeleton';

export interface TabItem {
  label?: string;
  component: ReactElement;
}

interface TabsProps {
  tabs: TabItem[];
  className?: string;
  contentClassName?: string;
  isLoading?: boolean;
}

export default function Tabs({
  tabs,
  className,
  contentClassName,
  isLoading
}: TabsProps) {
  const [index, setIndex] = useState(0);

  const currentTab = tabs[index];

  return (
    <div className={className}>
      <div className="flex justify-between items-center w-full">
        {tabs.map((step, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={twMerge(
              'border rounded-t-xl bg-gray-200 w-full p-1 font-bold',
              classNames({ 'border-b-0 bg-transparent': i === index })
            )}
            style={{ width: `${100 / tabs.length}%` }}
            disabled={isLoading}
          >
            {isLoading ? <div className='flex justify-center'><Skeleton className="h-4 w-40 rounded" /></div> : step.label}
          </button>
        ))}
      </div>

      <div className={twMerge('p-4', contentClassName)}>
        {currentTab.component}
      </div>
    </div>
  );
}
