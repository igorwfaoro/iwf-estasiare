import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../../../../../components/Button/Button';
import Field from '../../../../../components/Field/Field';
import { useLoader } from '../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../contexts/ToastContext';
import { useUserClientService } from '../../../../../services/client/user.client-service';
import Provider from '../Provider/Provider';

interface UserProps {}

const formSchema = z.object({
  name: z.string().min(1, 'Informe o seu nome'),
  email: z
    .string()
    .email({ message: 'E-mail inválido' })
    .min(1, 'informe o e-mail')
});

type FormSchema = z.infer<typeof formSchema>;

export default function User({}: UserProps) {
  const loader = useLoader();
  const toast = useToast();
  const userService = useUserClientService();

  const { data: sessionData } = useSession();

  const [createProvider, setCreateProvider] = useState(false);

  const userIsLoaded = !!sessionData?.user;
  const userIsProvider = !!sessionData?.user.provider;

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

  const showButtonSwitchToProviderAccount =
    userIsLoaded && !userIsProvider && !createProvider;

  const showCreateProviderComponent =
    userIsLoaded && !userIsProvider && createProvider;

  return (
    <div className="space-y-4">
      {!showCreateProviderComponent && (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Field isLoading={!userIsLoaded}>
            <Field.Label>Nome</Field.Label>
            <Field.Input {...register('name')} />
            <Field.Error>{errors.name?.message}</Field.Error>
          </Field>

          <Field isLoading={!userIsLoaded}>
            <Field.Label>E-mail</Field.Label>
            <Field.Input {...register('email')} disabled />
            <Field.Error>{errors.email?.message}</Field.Error>
          </Field>

          {userIsLoaded && (
            <div className="flex justify-end">
              <Button type="submit" className="w-full md:w-auto">
                Salvar
              </Button>
            </div>
          )}
        </form>
      )}

      {showButtonSwitchToProviderAccount && (
        <Button
          theme="primary-outline"
          className="w-full md:w-auto whitespace-normal"
          onClick={() => setCreateProvider(true)}
        >
          Ser um fornecedor
        </Button>
      )}

      {showCreateProviderComponent && <Provider isRegister />}
    </div>
  );
}
