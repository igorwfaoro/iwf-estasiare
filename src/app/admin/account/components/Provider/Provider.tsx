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
import { normalizeSlug } from '../../../../../util/helpers/slug.helper';
import { onlyNumbers } from '../../../../../util/helpers/string.helper';

interface ProviderProps {
  isRegister?: boolean;
}

const formSchema = z.object({
  slug: z
    .string()
    .min(1, 'Informe o slug')
    .transform((value) => normalizeSlug(value)),
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

export default function Provider({ isRegister }: ProviderProps) {
  const loader = useLoader();
  const toast = useToast();

  const providerService = createProviderClientService();
  const providerCategoryService = createProviderCategoryClientService();

  const { data: sessionData } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const [profileImageThumbnail, setProfileImageThumbnail] = useState<string>();

  const [categories, setCategories] = useState<CategorySelect[]>([]);
  const [categoriesIsLoading, setCategoriesIsLoading] = useState(false);

  const userIsLoaded = !!sessionData?.user;
  const userIsProvider = !!sessionData?.user.provider;

  const slug = watch('slug');

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

  useEffect(() => {
    providerService.slugAlreadyExists(slug).then((response) => {
      if (response) {
        setError('slug', {
          type: 'validate',
          message: 'Este slug já está sendo utilizado'
        });
      } else {
        clearErrors('slug');
      }
    });
  }, [slug]);

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
            slug: data.slug,
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
        const message = isRegister
          ? 'Fornecedor criado com sucesso!'
          : 'Dados salvos!';

        const route = isRegister ? '/admin?' : '/admin/account?tab=provider&';

        window.location.href = `${route}successMessage=${message}`;
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {!isRegister && (
        <div className="flex justify-end md:hidden">
          <Button
            type="submit"
            theme="primary-outline"
            className="w-full md:w-auto"
          >
            Salvar
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Field isLoading={!userIsLoaded}>
          <Field.Label>Nome de fornecedor</Field.Label>
          <Field.HelpText>Seu nome público de fornecedor</Field.HelpText>
          <Field.Input
            {...register('name')}
            placeholder={
              userIsLoaded && !userIsProvider ? sessionData.user.name : ''
            }
          />
          <Field.Error>{errors.name?.message}</Field.Error>
        </Field>

        <Field isLoading={!userIsLoaded}>
          <Field.Label>Slug</Field.Label>
          <Field.HelpText>
            Um identificador único para o fornecedor no URL. Use apenas letras
            minúsculas, números e hífens (ex: floricultura-bela-rosa).
          </Field.HelpText>
          <div className="flex gap-2 items-center">
            <div>estasiare.com.br/</div>
            <Field.Input
              {...register('slug')}
              containerClassName="w-full"
              onChange={(e) =>
                setValue(
                  'slug',
                  normalizeSlug(e.target.value, { ignoreStartEndHyphen: true })
                )
              }
              onBlur={(e) => setValue('slug', normalizeSlug(e.target.value))}
            />
          </div>
          <Field.Error>{errors.slug?.message}</Field.Error>
        </Field>
      </div>

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
            <img src={profileImageThumbnail} className="h-28 mb-6 rounded-md" />
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
