import Card from '../../components/Card/Card';
import GoogleButton from './components/GoogleButton/GoogleButton';

interface AdminLoginPageProps {}

export default function AdminLoginPage({}: AdminLoginPageProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className='p-4 flex flex-col items-center gap-2'>
        <h1 className='text-2xl font-bold'>Eventy Login</h1>
        <GoogleButton />
      </Card>
    </div>
  );
}
