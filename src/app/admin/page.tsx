import classNames from 'classnames';
import { cache } from 'react';
import { getAuthUser } from '../../auth/auth-config';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { createEventServerService } from '../../services/server/event.server-service';
import AdminPageBase from './components/AdminPageBase/AdminPageBase';
import EventsList from './components/EventsList/EventsList';
import ProviderProfile from './components/ProviderProfile/ProviderProfile';

const getEvents = cache(async () => {
  return await createEventServerService().getByUser();
});

interface Row {
  className: string;
  items: {
    title?: string;
    sub?: string;
    buttonLink?: {
      label: string;
      href: string;
    };
    content?: JSX.Element;
    bgImage?: string;
    show?: boolean;
  }[];
}

interface AdminPageProps {}

export default async function AdminPage({}: AdminPageProps) {
  const user = await getAuthUser();

  const events = await getEvents();

  const rows: Row[] = [
    {
      className: 'grid grid-cols-1',
      items: [
        {
          content: <ProviderProfile />,
          show: !!user.provider
        }
      ]
    },
    {
      className: 'grid grid-cols-1 ',
      items: [
        {
          title: 'Meus Eventos',
          content: <EventsList />,
          show: !!events.length
        }
      ]
    },
    {
      className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
      items: [
        {
          title: 'Novo evento',
          sub: 'Você pode criar um novo evento por aqui',
          bgImage: '/images/admin/event1.jpg',
          buttonLink: {
            label: 'Criar',
            href: '/admin/new-event'
          }
        },
        {
          title: 'Minha conta',
          sub: 'Configurações da conta, transformar em conta de fornecedor',
          bgImage: '/images/admin/gears.jpg',
          buttonLink: {
            label: 'Acessar',
            href: '/admin/account'
          }
        }
      ]
    }
  ];

  const welcomeMessage = `Bem vindo(a), ${user.name.split(' ')[0]}`;

  return (
    <AdminPageBase>
      <AdminPageBase.Title>{welcomeMessage}</AdminPageBase.Title>

      <div className="space-y-4">
        {rows.map((row, i) => (
          <div key={'row-' + i} className={row.className}>
            {row.items
              .filter((it) => it.show !== false)
              .map((it, j) => (
                <Card
                  key={'item-' + j}
                  className="p-4 bg-white bg-cover space-y-2"
                  bgImageUrl={it.bgImage}
                >
                  {it.title && (
                    <h2
                      className={classNames('text-lg font-bold', {
                        'text-white': !!it.bgImage
                      })}
                    >
                      {it.title}
                    </h2>
                  )}

                  {it.sub && <div className="text-white">{it.sub}</div>}

                  {it.buttonLink && (
                    <Button href={it.buttonLink.href} theme="white-outline">
                      {it.buttonLink.label}
                    </Button>
                  )}

                  {it.content}
                </Card>
              ))}
          </div>
        ))}
      </div>
    </AdminPageBase>
  );
}
