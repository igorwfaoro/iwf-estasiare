'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import { arrayMoveImmutable } from 'array-move';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import {
  MdArrowDownward,
  MdArrowUpward,
  MdDelete,
  MdEdit
} from 'react-icons/md';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import Button from '../../../components/Button/Button';
import Card from '../../../components/Card/Card';
import Skeleton from '../../../components/Skeleton/Skeleton';
import { useAlert } from '../../../contexts/AlertContext';
import { useLoader } from '../../../contexts/LoaderContext';
import { useModal } from '../../../contexts/ModalContext';
import { useToast } from '../../../contexts/ToastContext';
import { ProviderLinkCreateInputModel } from '../../../models/input-models/provider-link-create.input';
import { ProviderLinkUpdateInputModel } from '../../../models/input-models/provider-link-update.input';
import { ProviderLinkViewModel } from '../../../models/view-models/provider-link.view-model';
import { useProviderLinkClientService } from '../../../services/client/provider-link.client-service';
import { isMobile } from '../../../util/helpers/is-mobile.helper';
import AdminPageBase from '../components/AdminPageBase/AdminPageBase';
import LinkModal, {
  LinkModalProps,
  LinkModalResult
} from './components/LinkModal/LinkModal';

interface AccountPageProps {}

export default function AccountPage({}: AccountPageProps) {
  const { data: sessionData, status: sessionStatus } = useSession();
  const loader = useLoader();
  const toast = useToast();
  const alert = useAlert();
  const modal = useModal();

  const providerLinkService = useProviderLinkClientService();

  const [links, setLinks] = useState<ProviderLinkViewModel[]>([]);
  const [linksIsLoading, setLinksIsLoading] = useState(true);

  const sessionIsLoading = sessionStatus === 'loading';

  useEffect(() => {
    getLinks();
  }, []);

  const getLinks = () => {
    setLinksIsLoading(true);
    providerLinkService
      .getAllByProvider()
      .then((response) => setLinks(response.sort((a, b) => a.index - b.index)))
      .catch(() => toast.open('Erro ao carregar links', 'error'))
      .finally(() => setLinksIsLoading(false));
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    const newLinksOrder = arrayMoveImmutable(links, oldIndex, newIndex).map(
      (it, i) => ({
        ...it,
        index: i
      })
    );

    loader.show();
    providerLinkService
      .reorder(newLinksOrder.map(({ id, index }) => ({ id, index })))
      .then(() => {
        setLinks(newLinksOrder);
      })
      .catch(() => toast.open('Erro ao reordenar', 'error'))
      .finally(loader.hide);
  };

  const handleReorderButtonClicked = (index: number, to: 'up' | 'down') => {
    if (to === 'up' && index > 0) onSortEnd(index, index - 1);
    else if (to === 'down' && index < links.length - 1)
      onSortEnd(index, index + 1);
  };

  const handleDelete = (link: ProviderLinkViewModel) => {
    alert.open({
      title: 'Excluir Link',
      message: 'Excluir este link?',
      buttons: [
        {
          text: 'Cancelar',
          theme: 'light'
        },
        {
          text: 'Excluir',
          theme: 'danger',
          closeOnClick: false,
          onClick: (modalRef) => {
            loader.show();
            providerLinkService
              .remove(link.id)
              .then(() => {
                toast.open('Excluído com sucesso', 'success');
                getLinks();
                modalRef.close();
              })
              .catch((error) => {
                toast.open('Erro ao excluir', 'error');
                console.error(error);
              })
              .finally(() => loader.hide());
          }
        }
      ]
    });
  };

  const handleIsActiveChange = (
    link: ProviderLinkViewModel,
    checked: boolean
  ) => {
    setLinks((curr) =>
      curr.map((it) => (it.id === link.id ? { ...it, isActive: checked } : it))
    );

    loader.show();
    providerLinkService
      .update(link.id, { isActive: checked })
      .catch(() => {
        toast.open(`Erro ao ${checked ? 'habilitar' : 'desabilitar'}`);
        setLinks((curr) =>
          curr.map((it) =>
            it.id === link.id ? { ...it, isActive: !checked } : it
          )
        );
      })
      .finally(loader.hide);
  };

  const handleCreate = () => {
    modal.open({
      component: LinkModal,
      title: 'Novo link',
      width: isMobile() ? '90%' : '50%',
      onClose: (result: LinkModalResult) => {
        if (result.link) {
          loader.show();
          providerLinkService
            .create(result.link as ProviderLinkCreateInputModel)
            .then(() => {
              toast.open('Link criada!', 'success');
              getLinks();
            })
            .catch(() => toast.open('Erro ao criar link', 'error'))
            .finally(() => loader.hide());
        }
      }
    });
  };

  const handleUpdate = (link: ProviderLinkViewModel) => {
    modal.open({
      component: LinkModal,
      title: 'Editar link',
      width: isMobile() ? '90%' : '50%',
      props: { link } as LinkModalProps,
      onClose: (result: LinkModalResult) => {
        if (result.link) {
          loader.show();
          providerLinkService
            .update(link.id, result.link as ProviderLinkUpdateInputModel)
            .then(() => {
              toast.open('Link salva!', 'success');
              getLinks();
            })
            .catch(() => toast.open('Erro salvar link', 'error'))
            .finally(() => loader.hide());
        }
      }
    });
  };

  const renderLoading = () => (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="space-y-2 p-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-36" />
        </Card>
      ))}
    </div>
  );

  if (!sessionIsLoading && !sessionData?.user.provider)
    return (
      <AdminPageBase>
        <div>Você não é um fornecedor ainda</div>
      </AdminPageBase>
    );

  return (
    <AdminPageBase>
      <AdminPageBase.Title>Meus Links</AdminPageBase.Title>

      <Button onClick={handleCreate} className="mb-4">
        Criar novo Link
      </Button>

      {!linksIsLoading && !links.length && (
        <div>Você ainda não criou nenhum link. Crie o primeiro!</div>
      )}

      {!linksIsLoading ? (
        <div className="space-y-2">
          {links.map((link, i) => (
            <Card
              key={link.id}
              className="flex gap-3 justify-between items-center p-3 bg-white"
            >
              <div className="space-y-1 truncate">
                <div className="flex items-center gap-1 truncate">
                  <Icon icon={link.type!.icon} />
                  <span className="text-sm truncate">{link.label}</span>
                </div>

                <div className="font-bold truncate">
                  {link.urlKey || link.url}
                </div>

                <div className="flex items-center gap-2">
                  <MdEdit
                    size={24}
                    className="cursor-pointer"
                    onClick={() => handleUpdate(link)}
                  />
                  <MdDelete
                    size={24}
                    className="cursor-pointer"
                    onClick={() => handleDelete(link)}
                  />
                  <MdArrowDownward
                    size={24}
                    className="cursor-pointer"
                    onClick={() => handleReorderButtonClicked(i, 'down')}
                  />
                  <MdArrowUpward
                    size={24}
                    className="cursor-pointer"
                    onClick={() => handleReorderButtonClicked(i, 'up')}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link href={link.url} target="_blank" className="text-blue-500">
                  <FaExternalLinkAlt size={16} />
                </Link>

                <Toggle
                  checked={link.isActive}
                  onChange={(e) => handleIsActiveChange(link, e.target.checked)}
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        renderLoading()
      )}
    </AdminPageBase>
  );
}
