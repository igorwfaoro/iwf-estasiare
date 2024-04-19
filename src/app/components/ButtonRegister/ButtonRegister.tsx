import Button from '../../../components/Button/Button';

interface ButtonRegisterProps {
  className?: string;
}

export default function ButtonRegister({ className }: ButtonRegisterProps) {
  return (
    <Button className={className} theme="highlight" href="/admin/new-event">
      Crie seu evento!
    </Button>
  );
}
