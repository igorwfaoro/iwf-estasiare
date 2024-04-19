import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import GoogleButton from './components/GoogleButton/GoogleButton';

interface AdminLoginPageProps {}

export default function AdminLoginPage({}: AdminLoginPageProps) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <Card className="p-4 flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">Estasiare Login</h1>
        <GoogleButton />
      </Card>

      <Button theme="light" href="/">
        Voltar ao Início
      </Button>
    </div>
  );
}
