import Button from '../../../components/Button/Button';

interface ButtonRegisterProviderProps {
  className?: string;
}

export default function ButtonRegisterProvider({
  className
}: ButtonRegisterProviderProps) {
  return (
    <Button
      className={className}
      theme="primary-outline"
      href="/admin/account?tab=provider"
    >
      Seja um fornecedor!
    </Button>
  );
}
