'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { MdArrowBack } from 'react-icons/md';
import { z } from 'zod';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Field from '../../components/Field/Field';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import { useLoader } from '../../contexts/LoaderContext';
import { useToast } from '../../contexts/ToastContext';
import { useUserClientService } from '../../services/client/user.client-service';

interface RegisterPageProps {}

const formSchema = z
  .object({
    name: z.string().min(1, 'Informe o nome'),
    email: z
      .string()
      .email('Informe um e-mail válido')
      .min(1, 'Informe o email')
      .or(z.literal('')),
    password: z.string().min(1, 'Informe a senha'),
    confirmPassword: z.string().min(1, 'Informe a senha novamente')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmPassword']
  });

type FormSchema = z.infer<typeof formSchema>;

export default function RegisterPage({}: RegisterPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const userService = useUserClientService();

  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const loader = useLoader();

  const onSubmit = (data: FormSchema) => {
    loader.show();
    userService
      .register(data)
      .then(() => {
        toast.open('Usuário registrado com sucesso', 'success');
        router.push(searchParams.get('callbackUrl') || '/admin');
      })
      .catch(() => {
        toast.open(
          'Erro ao registrar usuário. Tente novamente mais tarde.',
          'error'
        );
      })
      .finally(loader.hide);
  };

  const handleGoogleButtonClick = () => {
    signIn('google', { callbackUrl: '/admin' });
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <Card className="p-4 space-y-4 w-[90%] md:w-96">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MdArrowBack
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <span>Estasiare Login</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Field>
            <Field.Label>Nome</Field.Label>
            <Field.Input {...register('name')} />
            <Field.Error>{errors.name?.message}</Field.Error>
          </Field>

          <Field>
            <Field.Label>E-mail</Field.Label>
            <Field.Input type="email" {...register('email')} />
            <Field.Error>{errors.email?.message}</Field.Error>
          </Field>

          <Field>
            <Field.Label>Senha</Field.Label>
            <Field.Input type="password" {...register('password')} />
          </Field>

          <Field>
            <Field.Label>Confirmar Senha</Field.Label>
            <Field.Input type="password" {...register('confirmPassword')} />
            <Field.Error>{errors.confirmPassword?.message}</Field.Error>
          </Field>

          <div className="space-y-2">
            <Button className="w-full" type="submit">
              Registrar-se
            </Button>
          </div>
        </form>

        <div className="text-center">ou</div>

        <GoogleButton onClick={handleGoogleButtonClick}>
          Registrar-se com Google
        </GoogleButton>
      </Card>
    </div>
  );
}
