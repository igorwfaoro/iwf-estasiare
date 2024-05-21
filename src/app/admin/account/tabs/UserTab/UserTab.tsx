import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../../../../../components/Button/Button';
import Field from '../../../../../components/Field/Field';
import { useLoader } from '../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../contexts/ToastContext';
import { createUserClientService } from '../../../../../services/client/user.client-service';

interface UserTabProps {}

const formSchema = z.object({
  name: z.string().min(1, 'Informe o seu nome'),
  email: z
    .string()
    .email({ message: 'E-mail inválido' })
    .min(1, 'informe o e-mail')
});

type FormSchema = z.infer<typeof formSchema>;

export default function UserTab({}: UserTabProps) {
  const loader = useLoader();
  const toast = useToast();
  const userService = createUserClientService();

  const { data: sessionData } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    if (sessionData?.user) {
      setValue('name', sessionData.user.name);
      setValue('email', sessionData.user.email);
    }
  }, [sessionData]);

  const handleFormSubmit = (data: FormSchema) => {
    loader.show();
    userService
      .update({
        name: data.name
      })
      .then(() => toast.open('Dados salvos', 'success'))
      .catch(() => toast.open('Erro ao salvar usuário', 'error'))
      .finally(() => loader.hide());
  };

  const userIsLoading = !sessionData?.user;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Field isLoading={userIsLoading}>
        <Field.Label>Nome</Field.Label>
        <Field.Input {...register('name')} />
        <Field.Error>{errors.name?.message}</Field.Error>
      </Field>

      <Field isLoading={userIsLoading}>
        <Field.Label>E-mail</Field.Label>
        <Field.Input {...register('email')} disabled />
        <Field.Error>{errors.email?.message}</Field.Error>
      </Field>

      <div className="flex justify-end">
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
