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

interface AdminLoginPageProps {}

const formSchema = z.object({
  email: z
    .string()
    .email('Informe um e-mail válido')
    .min(1, 'Informe o email')
    .or(z.literal('')),
  password: z.string().min(1, 'Informe a senha')
});

type FormSchema = z.infer<typeof formSchema>;

export default function AdminLoginPage({}: AdminLoginPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const loader = useLoader();

  const onSubmit = (data: FormSchema) => {
    loader.show();
    signIn('credentials', { ...data, redirect: false })
      .then((result) => {
        if (result?.ok) {
          router.push(searchParams.get('callbackUrl') || '/admin');
        } else {
          toast.open(result?.error || 'Erro na autenticação', 'error');
        }
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
            <Field.Label>E-mail</Field.Label>
            <Field.Input type="email" {...register('email')} />
            <Field.Error>{errors.email?.message}</Field.Error>
          </Field>

          <Field>
            <Field.Label>Senha</Field.Label>
            <Field.Input type="password" {...register('password')} />
          </Field>

          <div className="space-y-2">
            <Button className="w-full" type="submit">
              Entrar
            </Button>

            <Button className="w-full" href="/register" theme="primary-outline">
              Registrar-se
            </Button>
          </div>
        </form>

        <div className="text-center">ou</div>

        <GoogleButton onClick={handleGoogleButtonClick} />
      </Card>
    </div>
  );
}
