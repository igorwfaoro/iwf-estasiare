'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  UseFormReturn,
  UseFormStateReturn,
  useForm,
  useFormState
} from 'react-hook-form';
import { z } from 'zod';
import { AuthUser } from '../../../../../../auth/auth-user';
import { Place } from '../../../../../../components/Field/components/FieldInputAddressAutocomplete/types/place';
import { useLoader } from '../../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../../contexts/ToastContext';
import { ProviderCategoryViewModel } from '../../../../../../models/view-models/provider-category.view-model';
import { createProviderCategoryClientService } from '../../../../../../services/client/provider-category.client-service';
import { createProviderClientService } from '../../../../../../services/client/provider.client-service';
import { COLORS } from '../../../../../../util/colors';
import { normalizeSlug } from '../../../../../../util/helpers/slug.helper';

export interface ProviderAccountIProvider {
  form: UseFormReturn<FormSchema>;
  formState: UseFormStateReturn<FormSchema>;
  isRegister: boolean;
  user: AuthUser | undefined;
  userIsLoaded: boolean;
  userIsProvider: boolean;
  handleFormSubmit: () => void;
  profileImageThumbnail: string | undefined;
  setProfileImageThumbnail: Dispatch<SetStateAction<string | undefined>>;
  categories: CategorySelect[];
  setCategories: Dispatch<SetStateAction<CategorySelect[]>>;
  categoriesIsLoading: boolean;
}

interface ProviderAccountProviderProps {
  children: any;
  isRegister?: boolean;
}

type CategorySelect = ProviderCategoryViewModel & { selected?: boolean };

const formSchema = z.object({
  slug: z
    .string()
    .min(1, 'Informe o slug')
    .transform((value) => normalizeSlug(value)),
  name: z.string().min(1, 'Informe o nome'),
  profileImage: z.any().optional(),
  bio: z
    .string()
    .max(200, 'Número de caracteres excedido')
    .optional()
    .transform((value) => value && value.trim()),
  address: z.any(),
  primaryColor: z.string().optional(),
  categories: z.array(z.number())
});

type FormSchema = z.infer<typeof formSchema>;

const ProviderAccountContext = createContext<
  ProviderAccountIProvider | undefined
>(undefined);

const ProviderAccountProvider = ({
  children,
  isRegister
}: ProviderAccountProviderProps) => {
  const { data: sessionData } = useSession();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const formState = useFormState({ control: form.control });

  const loader = useLoader();
  const toast = useToast();

  const providerService = createProviderClientService();
  const providerCategoryService = createProviderCategoryClientService();

  const [profileImageThumbnail, setProfileImageThumbnail] = useState<string>();

  const [categories, setCategories] = useState<CategorySelect[]>([]);
  const [categoriesIsLoading, setCategoriesIsLoading] = useState(false);

  const userIsLoaded = !!sessionData?.user;
  const userIsProvider = !!sessionData?.user.provider;

  const slug = form.watch('slug');

  useEffect(() => {
    if (userIsLoaded) {
      getCategories();

      if (userIsProvider) {
        const provider = sessionData.user!.provider!;

        form.setValue('name', provider.name);
        form.setValue('slug', provider.slug);
        form.setValue('bio', provider.bio || '');
        form.setValue('address', provider.address || '');
        form.setValue('primaryColor', provider.primaryColor || COLORS.primary);

        if (provider.profileImage)
          setProfileImageThumbnail(provider.profileImage);
      }
    }
  }, [sessionData]);

  useEffect(() => {
    form.setValue(
      'categories',
      categories.filter((c) => c.selected).map((c) => c.id)
    );
  }, [categories]);

  useEffect(() => {
    providerService.slugAlreadyExists(slug).then((response) => {
      if (response) {
        form.setError('slug', {
          type: 'validate',
          message: 'Este slug já está sendo utilizado'
        });
      } else {
        form.clearErrors('slug');
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

        setCategories(categoriesToSet);
      })
      .catch(() => toast.open('Erro ao carregar categorias', 'error'))
      .finally(() => setCategoriesIsLoading(false));
  };

  const handleFormSubmit = () => {
    form.handleSubmit((data: FormSchema) => {
      const serviceToCall = userIsProvider
        ? providerService.update(
            {
              slug: data.slug,
              name: data.name,
              bio: data.bio || null,
              address: (data.address as Place) || null,
              primaryColor: data.primaryColor || null,
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
        .catch(toast.openHttpError)
        .finally(loader.hide);
    });
  };

  const returnValue = useMemo(
    () => ({
      form,
      formState,
      isRegister: !!isRegister,
      user: sessionData?.user,
      userIsLoaded,
      userIsProvider,
      handleFormSubmit,
      profileImageThumbnail,
      setProfileImageThumbnail,
      categories,
      setCategories,
      categoriesIsLoading
    }),
    [
      isRegister,
      sessionData,
      userIsLoaded,
      userIsProvider,
      formState,
      profileImageThumbnail,
      categories,
      categoriesIsLoading
    ]
  );

  return (
    <ProviderAccountContext.Provider value={returnValue}>
      {children}
    </ProviderAccountContext.Provider>
  );
};

export default ProviderAccountProvider;

export const useProviderContext = () => useContext(ProviderAccountContext)!;
