import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import Button from '../../../../../../../../../../components/Button/Button';
import Card from '../../../../../../../../../../components/Card/Card';
import Skeleton from '../../../../../../../../../../components/Skeleton/Skeleton';
import { useAlert } from '../../../../../../../../../../contexts/AlertContext';
import { useLoader } from '../../../../../../../../../../contexts/LoaderContext';
import { useModal } from '../../../../../../../../../../contexts/ModalContext';
import { useToast } from '../../../../../../../../../../contexts/ToastContext';
import { EventDetailViewModel } from '../../../../../../../../../../models/view-models/event-detail.view-model';
import { GiftRegistryViewModel } from '../../../../../../../../../../models/view-models/gift-registry.view-model';
import { useGiftRegistryClientService } from '../../../../../../../../../../services/client/gift-registry.client-service';
import { isMobile } from '../../../../../../../../../../util/helpers/is-mobile.helper';
import FormModal, {
  FormModalProps,
  FormModalResult
} from './components/FormModal/FormModal';

interface GiftRegistriesModalProps {
  event: EventDetailViewModel;
}

export default function GiftRegistriesModal({
  event
}: GiftRegistriesModalProps) {
  const loader = useLoader();
  const toast = useToast();
  const modal = useModal();
  const alert = useAlert();

  const giftRegistryService = useGiftRegistryClientService();

  const [giftRegistries, setGiftRegistries] = useState<GiftRegistryViewModel[]>(
    []
  );
  const [giftRegistriesIsLoading, setGiftRegistriesIsLoading] = useState(false);

  useEffect(() => {
    getGiftRegistries();
  }, []);

  const getGiftRegistries = () => {
    loader.show();
    setGiftRegistriesIsLoading(true);
    giftRegistryService
      .getAllByEvent(event.id)
      .then(setGiftRegistries)
      .catch(() => toast.open('Erro ao carregar listas', 'error'))
      .finally(() => {
        loader.hide();
        setGiftRegistriesIsLoading(false);
      });
  };

  const handleCreate = () => {
    modal.open({
      component: FormModal,
      title: 'Nova lista de presentes',
      width: isMobile() ? '90%' : '50%',
      onClose: (result: FormModalResult) => {
        if (result.giftRegistry) {
          loader.show();
          giftRegistryService
            .create(event.id, result.giftRegistry)
            .then(() => {
              toast.open('Lista criada!', 'success');
              getGiftRegistries();
            })
            .catch(() => toast.open('Erro ao criar lista', 'error'))
            .finally(() => loader.hide());
        }
      }
    });
  };

  const handleUpdate = (giftRegistry: GiftRegistryViewModel) => {
    modal.open({
      component: FormModal,
      title: 'Editar lista de presentes',
      width: isMobile() ? '90%' : '50%',
      props: { giftRegistry } as FormModalProps,
      onClose: (result: FormModalResult) => {
        if (result.giftRegistry) {
          loader.show();
          giftRegistryService
            .update(event.id, giftRegistry.id, result.giftRegistry)
            .then(() => {
              toast.open('Lista salva!', 'success');
              getGiftRegistries();
            })
            .catch(() => toast.open('Erro salvar lista', 'error'))
            .finally(() => loader.hide());
        }
      }
    });
  };

  const handleRemove = (giftRegistry: GiftRegistryViewModel) => {
    alert.open({
      title: 'Remover lista',
      message: 'Remover esta lista?',
      buttons: [
        {
          text: 'Cancelar',
          theme: 'light'
        },
        {
          text: 'Remover',
          theme: 'danger',
          closeOnClick: false,
          onClick: (modalRef) => {
            loader.show();
            giftRegistryService
              .remove(event.id, giftRegistry.id)
              .then(() => {
                toast.open('Removido com sucesso', 'success');
                getGiftRegistries();
                modalRef.close();
              })
              .catch((error) => {
                toast.open('Erro ao remover', 'error');
                console.error(error);
              })
              .finally(() => loader.hide());
          }
        }
      ]
    });
  };

  if (giftRegistriesIsLoading)
    return (
      <div className="space-y-5 mt-5">
        <Skeleton className="h-7 w-44" />

        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="space-y-2 p-4">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-28" />
            </Card>
          ))}
        </div>
      </div>
    );

  return (
    <div className="space-y-5 mt-5">
      <Button onClick={() => handleCreate()} size="small">
        Criar lista
      </Button>

      {!!giftRegistries.length ? (
        <div className="space-y-4">
          {giftRegistries.map((it) => (
            <Card key={it.id} className="flex justify-between w-full p-2">
              <div className="w-[80%]">
                <h1 className="font-bold truncate">{it.storeName}</h1>
                <div className="text-sm truncate">{it.description}</div>
                {it.url && (
                  <Link
                    href={it.url}
                    target="_blank"
                    className="text-blue-600 underline truncate block"
                  >
                    {it.url}
                  </Link>
                )}
              </div>

              <div className="flex gap-1 text-xl ml-3 items-start">
                <button onClick={() => handleUpdate(it)}>
                  <MdEdit />
                </button>
                <button onClick={() => handleRemove(it)}>
                  <MdDelete />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div>Você ainda não criou nenhuma lista 😟</div>
      )}
    </div>
  );
}
