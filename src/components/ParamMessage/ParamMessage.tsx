'use client';

import classNames from 'classnames';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '../Card/Card';

interface ParamMessageProps {
  duration?: number;
}

export default function ParamMessage({ duration = 3000 }: ParamMessageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    setMessage(searchParams.get('successMessage') || undefined);
  }, []);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  useEffect(() => {
    if (!isVisible) {
      if (!searchParams.get('successMessage')) return;

      const params = new URLSearchParams(searchParams.toString());
      params.delete('successMessage');
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [isVisible]);

  if (!message) return <></>;

  return (
    <div
      className={classNames(
        'fixed bottom-0 left-0 max-w-full z-[99999] px-4 transition duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <Card className="p-4 bg-green-500 text-white mb-4 border-none drop-shadow-xl font-bold">
        {message}
      </Card>
    </div>
  );
}
