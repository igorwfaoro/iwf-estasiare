'use client';

import Button from '../../../../../../../../components/Button/Button';
import Card from '../../../../../../../../components/Card/Card';
import Skeleton from '../../../../../../../../components/Skeleton/Skeleton';
import HandbookItem from './components/HandbookItem/HandbookItem';
import { useHandbooksTabContext } from './contexts/HandbooksTabContext';

interface HandBooksTabProps {}

export default function HandBooksTab({}: HandBooksTabProps) {
  const { isLoading, openForm, remove, handbooks } = useHandbooksTabContext();

  const renderLoading = () =>
    Array.from({ length: 4 }).map((_, i) => (
      <Card key={i} className="space-y-2 p-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-28" />
      </Card>
    ));

  return (
    <>
      <div className="mb-4 flex justify-end w-full">
        <Button onClick={() => openForm()} className="px-4 md:px-10">
          Novo
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading
          ? renderLoading()
          : handbooks.map((handbook) => (
              <HandbookItem
                key={handbook.id}
                handbook={handbook}
                handleEdit={openForm}
                handleDelete={remove}
              />
            ))}
      </div>
    </>
  );
}
