import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../../../../../components/Button/Button';
import Checkbox from '../../../../../components/Checkbox/Checkbox';
import Field from '../../../../../components/Field/Field';
import { DEFAULT_INPUT_ACCEPT_FILE_TYPES } from '../../../../../constants/file-types';
import { useLoader } from '../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../contexts/ToastContext';
import { ProviderCategoryViewModel } from '../../../../../models/view-models/provider-category.view-model';
import { createProviderCategoryClientService } from '../../../../../services/client/provider-category.client-service';
import { createProviderClientService } from '../../../../../services/client/provider.client-service';
import { fileToDataURL } from '../../../../../util/helpers/file.helper';
import { onlyNumbers } from '../../../../../util/helpers/string.helper';

interface ProviderProps {
  fromUser?: boolean;
}

const formSchema = z.object({
  name: z.string().min(1, 'Informe o nome'),
  contactEmail: z
    .string()
    .email({ message: 'E-mail inválido' })
    .optional()
    .or(z.literal('')),
  contactPhone: z
    .string()
    .optional()
    .transform((value) => value && onlyNumbers(value)),
  contactWhatsApp: z
    .string()
    .optional()
    .transform((value) => value && onlyNumbers(value)),
  profileImage: z.any().optional(),
  bio: z
    .string()
    .max(200, 'Número de caracteres excedido')
    .optional()
    .transform((value) => value && value.trim()),
  link: z
    .string()
    .url({ message: 'Link inválido' })
    .optional()
    .or(z.literal('')),
  categories: z.array(z.number())
});

type FormSchema = z.infer<typeof formSchema>;

type CategorySelect = ProviderCategoryViewModel & { selected?: boolean };

export default function Provider({ fromUser }: ProviderProps) {
  const loader = useLoader();
  const toast = useToast();

  const providerService = createProviderClientService();
  const providerCategoryService = createProviderCategoryClientService();

  const { data: sessionData } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const [profileImageThumbnail, setProfileImageThumbnail] = useState<string>();

  const [categories, setCategories] = useState<CategorySelect[]>([]);
  const [categoriesIsLoading, setCategoriesIsLoading] = useState(false);

  const userIsLoaded = !!sessionData?.user;
  const userIsProvider = !!sessionData?.user.provider;

  useEffect(() => {
    if (userIsLoaded) {
      getCategories();

      if (userIsProvider) {
        const provider = sessionData.user!.provider!;

        setValue('name', provider.name);
        setValue('contactEmail', provider.contactEmail || '');
        setValue('contactPhone', provider.contactPhone || '');
        setValue('contactWhatsApp', provider.contactWhatsApp || '');
        setValue('bio', provider.bio || '');
        setValue('link', provider.link || '');

        if (provider.profileImage)
          setProfileImageThumbnail(provider.profileImage);
      }
    }
  }, [sessionData]);

  useEffect(() => {
    setValue(
      'categories',
      categories.filter((c) => c.selected).map((c) => c.id)
    );
  }, [categories]);

  const getCategories = () => {
    setCategoriesIsLoading(true);
    providerCategoryService
      .getAll()
      .then((response) => {
        const categoriesToSet = response
          .sort((a, b) => a.description.localeCompare(b.description))
          .map((c) => ({
            ...c,
            selected: !!sessionData?.user.provider?.categories?.find(
              (it) => it.id === c.id
            )
          }));

        setCategories([
          ...categoriesToSet.filter((it) => !it.isOther),
          ...categoriesToSet.filter((it) => it.isOther)
        ]);
      })
      .catch(() => toast.open('Erro ao carregar categorias', 'error'))
      .finally(() => setCategoriesIsLoading(false));
  };

  const handleFormSubmit = (data: FormSchema) => {
    const serviceToCall = userIsProvider
      ? providerService.update(
          {
            name: data.name,
            bio: data.bio || null,
            link: data.link || null,
            contactEmail: data.contactEmail || null,
            contactPhone: data.contactPhone || null,
            contactWhatsApp: data.contactWhatsApp || null,
            categories: data.categories
          },
          data.profileImage
        )
      : providerService.create(data, data.profileImage);

    loader.show();
    serviceToCall
      .then(() => {
        const message = fromUser
          ? 'Fornecedor criado com sucesso!'
          : 'Dados salvos!';

        window.location.href = `/admin/account?tab=provider&successMessage=${message}`;
      })
      .catch(() => toast.open('Erro ao salvar usuário', 'error'))
      .finally(() => loader.hide());
  };

  const handleInputFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    setValue('profileImage', file);
    setProfileImageThumbnail(await fileToDataURL(file));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Field isLoading={!userIsLoaded}>
        <Field.Label>Nome de fornecedor (obrigatório)</Field.Label>
        <Field.Input
          {...register('name')}
          placeholder={
            userIsLoaded && !userIsProvider ? sessionData.user.name : ''
          }
        />
        <Field.Error>{errors.name?.message}</Field.Error>
      </Field>

      <Field isLoading={!userIsLoaded}>
        <Field.Label>Bio</Field.Label>
        <Field.TextArea
          {...register('bio')}
          rows={6}
          maxLength={200}
          showCaracterCount
        />
        <Field.Error>{errors.bio?.message}</Field.Error>
      </Field>

      <Field isLoading={!userIsLoaded}>
        <Field.Label>Imagem</Field.Label>
        <Field.Input
          type="file"
          accept={DEFAULT_INPUT_ACCEPT_FILE_TYPES.join(', ')}
          onChange={(event) => handleInputFileChange(event)}
        />
        <Field.Error>{errors.profileImage?.message}</Field.Error>

        <div>
          {profileImageThumbnail && (
            <img src={profileImageThumbnail} className="h-28 mb-6" />
          )}
        </div>
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field isLoading={!userIsLoaded}>
          <Field.Label>Link</Field.Label>
          <Field.HelpText>
            Você pode disponibilizar um link nos eu perfil
          </Field.HelpText>
          <Field.Input {...register('link')} />
          <Field.Error>{errors.link?.message}</Field.Error>
        </Field>

        <Field isLoading={!userIsLoaded}>
          <Field.Label>Whatsapp</Field.Label>
          <Field.HelpText>Deve ser no formato internacional</Field.HelpText>
          <Field.Input {...register('contactWhatsApp')} />
          <Field.Error>{errors.contactWhatsApp?.message}</Field.Error>
        </Field>

        <Field isLoading={!userIsLoaded}>
          <Field.Label>Telefone</Field.Label>
          <Field.Input {...register('contactPhone')} />
          <Field.Error>{errors.contactPhone?.message}</Field.Error>
        </Field>

        <Field isLoading={!userIsLoaded}>
          <Field.Label>E-mail</Field.Label>
          <Field.Input {...register('contactEmail')} />
          <Field.Error>{errors.contactEmail?.message}</Field.Error>
        </Field>
      </div>

      <Field isLoading={!userIsLoaded && categoriesIsLoading}>
        <Field.Label>Categorias</Field.Label>
        <Field.HelpText>
          Selecione a categorias que tem a ver com os serviços que você presta
        </Field.HelpText>
        <div className="flex flex-col flex-wrap gap-4 md:max-h-[50vh]">
          {categories.map((category) => (
            <Checkbox
              key={category.id}
              label={category.description}
              checked={category.selected}
              onChange={(e) =>
                setCategories((curr) =>
                  curr.map((it) =>
                    it.id === category.id
                      ? { ...it, selected: e.target.checked }
                      : it
                  )
                )
              }
            />
          ))}
        </div>
      </Field>

      <div className="flex justify-end">
        <Button type="submit" className="w-full md:w-auto">
          Salvar
        </Button>
      </div>
    </form>
  );
}
