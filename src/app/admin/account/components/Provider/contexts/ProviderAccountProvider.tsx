'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
import { AccordionRefType } from '../../../../../../components/Accordion/Accordion';
import { Place } from '../../../../../../components/Field/components/FieldInputAddressAutocomplete/types/place';
import { useLoader } from '../../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../../contexts/ToastContext';
import { ProviderCategoryViewModel } from '../../../../../../models/view-models/provider-category.view-model';
import { createProviderCategoryClientService } from '../../../../../../services/client/provider-category.client-service';
import { createProviderClientService } from '../../../../../../services/client/provider.client-service';
import { COLORS } from '../../../../../../util/colors';
import { normalizeSlug } from '../../../../../../util/helpers/slug.helper';
import Categories from '../components/Categories/Categories';
import General from '../components/General/General';
import ServiceAreas from '../components/ServiceAreas/ServiceAreas';

export interface ProviderAccountIProvider {
  form: UseFormReturn<FormSchema>;
  formState: UseFormStateReturn<FormSchema>;
  isRegister: boolean;
  user: AuthUser | undefined;
  userIsLoaded: boolean;
  userIsProvider: boolean;
  handleFormSubmit: (data: FormSchema) => void;
  handleFormError: () => void;
  profileImageThumbnail: string | undefined;
  setProfileImageThumbnail: Dispatch<SetStateAction<string | undefined>>;
  categories: CategorySelect[];
  setCategories: Dispatch<SetStateAction<CategorySelect[]>>;
  categoriesIsLoading: boolean;
  serviceAreas: ServiceAreaItem[];
  setServiceAreas: Dispatch<SetStateAction<ServiceAreaItem[]>>;
  serviceAreasIsLoading: boolean;
  providerAccordionRef: RefObject<AccordionRefType>;
  providerAccordionItems: {
    [key in ProviderAccordionItemType]: ProviderAccordionItem;
  };
}

interface ProviderAccountProviderProps {
  children: any;
  isRegister?: boolean;
}

export type CategorySelect = ProviderCategoryViewModel & { selected?: boolean };

export interface ServiceAreaItem {
  address: Place;
}

type ProviderAccordionItemType = 'GENERAL' | 'CATEGORIES' | 'SERVICE_AREAS';

interface ProviderAccordionItem {
  idx: number;
  header: string;
  content: JSX.Element;
}

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

  const providerAccordionItems: {
    [key in ProviderAccordionItemType]: ProviderAccordionItem;
  } = {
    GENERAL: {
      idx: 0,
      header: 'Geral',
      content: <General />
    },
    CATEGORIES: { idx: 1, header: 'Categorias', content: <Categories /> },
    SERVICE_AREAS: {
      idx: 2,
      header: 'Cidades de Atendimento',
      content: <ServiceAreas />
    }
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const formState = useFormState({ control: form.control });

  const loader = useLoader();
  const toast = useToast();

  const providerAccordionRef = useRef<AccordionRefType>(null);

  const providerService = createProviderClientService();
  const providerCategoryService = createProviderCategoryClientService();

  const [profileImageThumbnail, setProfileImageThumbnail] = useState<string>();

  const [categories, setCategories] = useState<CategorySelect[]>([]);
  const [categoriesIsLoading, setCategoriesIsLoading] = useState(false);

  const [serviceAreas, setServiceAreas] = useState<ServiceAreaItem[]>([]);
  const [serviceAreasIsLoading, setCServiceAreasIsLoading] = useState(true);

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

        setServiceAreas(
          provider.serviceAreas?.map(
            (sa): ServiceAreaItem => ({
              address: sa.address as Place
            })
          ) || []
        );
      }
    }
  }, [sessionData]);

  useEffect(() => {
    if (serviceAreas.length) setCServiceAreasIsLoading(false);
  }, [serviceAreas]);

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

  const handleFormError = () => {
    providerAccordionRef.current?.setOpenIndex(
      providerAccordionItems['GENERAL'].idx
    );
  };

  const handleFormSubmit = (data: FormSchema) => {
    if (!form.getValues('categories').length) {
      toast.open('Você não selecionou nenhuma categoria', 'warning');
      providerAccordionRef.current?.setOpenIndex(
        providerAccordionItems['CATEGORIES'].idx
      );
      return;
    }

    if (!serviceAreas.length) {
      toast.open('Você não selecionou nenhuma cidade que atende', 'warning');
      providerAccordionRef.current?.setOpenIndex(
        providerAccordionItems['SERVICE_AREAS'].idx
      );
      return;
    }

    const serviceToCall = userIsProvider
      ? providerService.update(
          {
            slug: data.slug,
            name: data.name,
            bio: data.bio || null,
            address: (data.address as Place) || null,
            primaryColor: data.primaryColor || null,
            categories: data.categories,
            serviceAreas: serviceAreas
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
      handleFormError,
      profileImageThumbnail,
      setProfileImageThumbnail,
      categories,
      setCategories,
      categoriesIsLoading,
      serviceAreas,
      setServiceAreas,
      serviceAreasIsLoading,
      providerAccordionRef,
      providerAccordionItems
    }),
    [
      isRegister,
      sessionData,
      userIsLoaded,
      userIsProvider,
      formState,
      profileImageThumbnail,
      categories,
      categoriesIsLoading,
      serviceAreas,
      serviceAreasIsLoading,
      providerAccordionRef
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
