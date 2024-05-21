import classNames from 'classnames';
import { getSession } from 'next-auth/react';
import { cache } from 'react';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { createEventServerService } from '../../services/server/event.server-service';
import AdminPageBase from './components/AdminPageBase/AdminPageBase';
import EventsList from './components/EventsList/EventsList';
import WelcomeMessage from './components/WelcomeMessage/WelcomeMessage';

const getEvents = cache(async () => {
  return await createEventServerService().getByUser();
});

interface Item {
  title: string;
  sub?: string;
  buttonLink?: {
    label: string;
    href: string;
  };
  content?: JSX.Element;
  bgImage?: string;
}

interface AdminPageProps {}

export default async function AdminPage({}: AdminPageProps) {
  const session = await getSession();

  const events = await getEvents();

  const items = [
    !!events.length && {
      title: 'Meus Eventos',
      content: <EventsList />
    },
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
  ].filter(Boolean) as Item[];

  return (
    <AdminPageBase>
      <AdminPageBase.Title>
        <WelcomeMessage />
      </AdminPageBase.Title>

      <div className="space-y-4">
        {items.map((it, i) => (
          <Card
            key={i}
            className="p-4 bg-white bg-cover space-y-2"
            bgImageUrl={it.bgImage}
          >
            <h2
              className={classNames('text-lg font-bold', {
                'text-white': !!it.bgImage
              })}
            >
              {it.title}
            </h2>

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
    </AdminPageBase>
  );
}
