import AdminPageBase from './components/AdminPageBase/AdminPageBase';
import EventsList from './components/EventsList/EventsList';

interface AdminPageProps {}

export default async function AdminPage({}: AdminPageProps) {
  return (
    <AdminPageBase>
      <AdminPageBase.Title>Meus Eventos</AdminPageBase.Title>
      <EventsList />
    </AdminPageBase>
  );
}
