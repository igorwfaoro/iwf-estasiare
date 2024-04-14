'use client';

import Card from '../../../../../../../../components/Card/Card';
import Skeleton from '../../../../../../../../components/Skeleton/Skeleton';
import GiftItem from './components/GiftItem/GiftItem';
import Field from '../../../../../../../../components/Field/Field';
import Button from '../../../../../../../../components/Button/Button';
import { useGiftsTabContext } from './contexts/GiftsTabContext';

interface GiftsTabProps {}

export default function GiftsTab({}: GiftsTabProps) {
  const {
    search,
    setSearch,
    isLoading,
    showEmptyFinancialInfoMessage,
    handleOpenFinancialInfo,
    filteredGifts,
    openForm,
    remove
  } = useGiftsTabContext();

  const renderLoading = () =>
    Array.from({ length: 6 }).map((_, i) => (
      <Card key={i} className="flex gap-2">
        <Skeleton className="h-20 w-28 bg-center bg-cover rounded-xl m-3" />
        <div className="space-y-2 p-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
      </Card>
    ));

  const render = () => {
    if (isLoading) return renderLoading();
    else if (showEmptyFinancialInfoMessage)
      return (
        <div className="text-center space-y-4 my-8">
          <div className="text-xl font-bold">
            Para cadastrar presentes, você precisa configurar o recebimento dos
            valores antes
          </div>
          <Button onClick={handleOpenFinancialInfo}>Configurar agora</Button>
        </div>
      );
    else if (!filteredGifts.length)
      return <div>Nenhum presente encontrado</div>;
    else
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGifts.map((gift) => (
            <GiftItem
              key={gift.id}
              gift={gift}
              handleEdit={openForm}
              handleDelete={remove}
            />
          ))}
        </div>
      );
  };

  const showHeader = !isLoading && !showEmptyFinancialInfoMessage;

  return (
    <>
      {showHeader && (
        <div className="mb-4 flex justify-between gap-2 w-full">
          <Field.Input
            placeholder="Digite sua busca"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            containerClassName="w-full"
            handleClickSearchButton={() => true}
          />

          <Button onClick={() => openForm()} className="px-4 md:px-10">
            Novo
          </Button>
        </div>
      )}

      {render()}
    </>
  );
}
