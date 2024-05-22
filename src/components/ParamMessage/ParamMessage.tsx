'use client';

import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '../Card/Card';

interface ParamMessageProps {
  duration?: number;
}

export default function ParamMessage({ duration = 3000 }: ParamMessageProps) {
  const searchParams = useSearchParams();
  const successMessage = searchParams.get('successMessage');

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={classNames(
        'fixed bottom-0 left-0 max-w-full z-[99999] px-4 transition duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <Card className="p-4 bg-green-500 text-white mb-4 border-none drop-shadow-xl font-bold">
        {successMessage}
      </Card>
    </div>
  );
}
