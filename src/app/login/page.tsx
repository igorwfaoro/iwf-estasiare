'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Field from '../../components/Field/Field';
import GoogleButton from './components/GoogleButton/GoogleButton';

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

  const onSubmit = (data: FormSchema) => {
    console.log(data);
    signIn('credentials', { ...data, redirect: false });
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <Card className="p-4 space-y-4 w-[90%] md:w-96">
        <h1 className="text-2xl font-bold">Estasiare Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Field>
            <Field.Label>E-mail</Field.Label>
            <Field.Input type="email" {...register('email')} />
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

        <GoogleButton />
      </Card>

      <Button theme="light" size="small" href="/">
        Voltar ao Início
      </Button>
    </div>
  );
}
