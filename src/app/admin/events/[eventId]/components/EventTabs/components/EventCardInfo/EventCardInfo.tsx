import { ReactElement } from 'react';
import { MdEdit } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

import Card from '../../../../../../../../components/Card/Card';

interface EventCardInfoProps {
  children: ReactElement | ReactElement[];
  title?: string;
  handleClickEdit?: () => void;
  className?: string;
}

export default function EventCardInfo({
  children,
  title,
  handleClickEdit,
  className
}: EventCardInfoProps) {
  return (
    <Card className={twMerge('p-3', className)}>
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">{title}</h1>
        {handleClickEdit && (
          <button onClick={handleClickEdit}>
            <MdEdit className="text-blue-500 text-xl" />
          </button>
        )}
      </div>

      <div>{children}</div>
    </Card>
  );
}
