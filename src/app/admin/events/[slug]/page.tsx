import AdminPageBase from '../../components/AdminPageBase/AdminPageBase';

interface AdminEventPageProps {}

export default function AdminEventPage({...props}: AdminEventPageProps) {
    console.log(props)
  return (
    <AdminPageBase>
      <AdminPageBase.Title>ddd</AdminPageBase.Title>
    </AdminPageBase>
  );
}
