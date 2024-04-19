'use client';

import classNames from 'classnames';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

import Skeleton from '../Skeleton/Skeleton';

export interface TabItem {
  key: string;
  label: string;
  component: ReactElement;
}

interface TabsProps {
  tabs: TabItem[];
  className?: string;
  contentClassName?: string;
  isLoading?: boolean;
  enableQueryParamControl?: boolean;
}

const QUERY_PARAM_KEY = 'tab';

export default function Tabs({
  tabs,
  className,
  contentClassName,
  isLoading
}: TabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const key = searchParams.get(QUERY_PARAM_KEY) || tabs[0]?.key;

  const handleSelectTab = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(QUERY_PARAM_KEY, tabs[index].key);
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentTab = tabs.find((t) => t.key === key) || tabs[0];

  return (
    <div className={className}>
      <div className="flex justify-between items-center w-full">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => handleSelectTab(i)}
            className={twMerge(
              'border rounded-t-xl bg-gray-200 w-full p-1 font-bold',
              classNames({ 'border-b-0 bg-transparent': tab.key === key })
            )}
            style={{ width: `${100 / tabs.length}%` }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center">
                <Skeleton className="h-4 w-40 rounded" />
              </div>
            ) : (
              tab.label
            )}
          </button>
        ))}
      </div>

      <div className={twMerge('p-4', contentClassName)}>
        {currentTab?.component || ''}
      </div>
    </div>
  );
}
