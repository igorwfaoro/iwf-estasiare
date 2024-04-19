import Button from '../../components/Button/Button';
import AdminPageBase from './components/AdminPageBase/AdminPageBase';
import EventsList from './components/EventsList/EventsList';

interface AdminPageProps {}

export default async function AdminPage({}: AdminPageProps) {
  return (
    <AdminPageBase>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <AdminPageBase.Title>Meus Eventos</AdminPageBase.Title>
        <Button href="/admin/new-event">Novo Evento</Button>
      </div>

      <EventsList />
    </AdminPageBase>
  );
}
