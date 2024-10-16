'use client';

import Button from '../../../../../../../../components/Button/Button';
import Card from '../../../../../../../../components/Card/Card';
import Field from '../../../../../../../../components/Field/Field';
import Skeleton from '../../../../../../../../components/Skeleton/Skeleton';
import GiftItem from './components/GiftItem/GiftItem';
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
    remove,
    handleOpenGiftRegistriesModal
  } = useGiftsTabContext();

  const renderLoading = () => (
    <div className="space-y-4">
      <Card className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-white">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-12 w-28 rounded-xl w-full md:w-auto" />
      </Card>

      <div className="flex justify-between gap-4 w-full">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-28 rounded-xl px-4 md:px-10" />
      </div>

      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="flex gap-2">
          <Skeleton className="h-20 w-28 bg-center bg-cover rounded-xl m-3" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>
        </Card>
      ))}
    </div>
  );

  const showGiftsHeader = !showEmptyFinancialInfoMessage;

  return isLoading ? (
    renderLoading()
  ) : (
    <div className="space-y-4">
      <Card className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-white">
        <div>
          <h3 className="text-lg font-bold">Listas de presentes externas</h3>
          <span>
            Se você já tem listas de presentes em lojas, pode disponibiliza-las
            aqui para os convidados
          </span>
        </div>
        <Button
          theme="primary-outline"
          onClick={handleOpenGiftRegistriesModal}
          className="w-full md:w-auto"
        >
          Acessar
        </Button>
      </Card>

      {showGiftsHeader && (
        <div className="mb-4 flex justify-between gap-4 w-full">
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

      {(() => {
        if (showEmptyFinancialInfoMessage)
          return (
            <div className="text-center space-y-4 my-8">
              <div className="text-xl font-bold">
                Para cadastrar presentes, você precisa configurar o recebimento
                dos valores antes
              </div>
              <Button onClick={handleOpenFinancialInfo}>
                Configurar agora
              </Button>
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
      })()}
    </div>
  );
}
