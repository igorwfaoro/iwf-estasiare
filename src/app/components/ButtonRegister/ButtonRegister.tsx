import Button from '../../../components/Button/Button';

interface ButtonRegisterProps {
  className?: string;
}

export default function ButtonRegister({ className }: ButtonRegisterProps) {
  return (
    <Button className={className} theme="highlight" link="/admin/new-event">
      Crie seu evento!
    </Button>
  );
}
