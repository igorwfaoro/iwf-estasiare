import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react/dist/iconify.mjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../../../../../components/Button/Button';
import Field from '../../../../../components/Field/Field';
import { useLoader } from '../../../../../contexts/LoaderContext';
import { ModalRefPropType } from '../../../../../contexts/ModalContext';
import { useToast } from '../../../../../contexts/ToastContext';
import { ProviderLinkCreateInputModel } from '../../../../../models/input-models/provider-link-create.input';
import { ProviderLinkUpdateInputModel } from '../../../../../models/input-models/provider-link-update.input';
import { ProviderLinkTypeViewModel } from '../../../../../models/view-models/provider-link-type.view-model';
import { ProviderLinkViewModel } from '../../../../../models/view-models/provider-link.view-model';
import { createProviderLinkTypeClientService } from '../../../../../services/client/provider-link-type.client-service';
import { isValidUrl } from '../../../../../util/helpers/http.helper';

export interface LinkModalProps extends ModalRefPropType {
  link?: ProviderLinkViewModel;
}

export interface LinkModalResult {
  link?: ProviderLinkUpdateInputModel | ProviderLinkCreateInputModel;
}

const formSchema = z.object({
  linkTypeId: z
    .string({ required_error: 'Defina o tipo de link' })
    .min(1, 'Defina o tipo de link')
    .or(z.number({ required_error: 'Defina o tipo de link' }))
    .transform((value) => (value ? Number(value) : undefined)),
  label: z.string().min(1, 'Informe nome do link'),
  urlOrUrlKey: z.string().min(1, 'Campo obrigatório')
});

type FormSchema = z.infer<typeof formSchema>;

export default function LinkModal({ link, modalRef }: LinkModalProps) {
  const loader = useLoader();
  const toast = useToast();

  const providerLinkTypeService = createProviderLinkTypeClientService();

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

  const isUpdate = !!link;

  const [linkTypes, setLinkTypes] = useState<ProviderLinkTypeViewModel[]>([]);

  const [selectedLinkType, setSelectedLinkType] =
    useState<ProviderLinkTypeViewModel>();

  const [lastSelectedLinkType, setLastSelectedLinkType] =
    useState<ProviderLinkTypeViewModel>();

  const linkTypeId = watch('linkTypeId');
  const label = watch('label');
  const urlOrUrlKey = watch('urlOrUrlKey');

  useEffect(() => {
    getTypes();

    if (isUpdate) {
      setValue('label', link.label);
      setValue('urlOrUrlKey', link.urlKey || link.url);
    }
  }, []);

  /**
   * set form linkTypeId after types is loaded
   */
  useEffect(() => {
    if (linkTypes.length && isUpdate) {
      setValue('linkTypeId', link.type!.id);
    }
  }, [linkTypes]);

  /**
   * set default label when type change
   */
  useEffect(() => {
    const type = linkTypes.find((it) => it.id === Number(linkTypeId));

    if (type && (!label || (label !== type.name && !!lastSelectedLinkType))) {
      setValue('label', type.name);
    }

    setSelectedLinkType(type);
  }, [linkTypeId]);

  /**
   * set last selectedLinkType
   */
  useEffect(() => {
    setLastSelectedLinkType(selectedLinkType);
  }, [selectedLinkType]);

  /**
   * verify if urlOrUrlKey is link
   */
  useEffect(() => {
    const isRequiredUsername = !!linkTypes.find(
      (t) => t.id === selectedLinkType?.id
    )?.urlStructure;

    if (isRequiredUsername && isValidUrl(urlOrUrlKey)) {
      setError('urlOrUrlKey', {
        message: 'Informe apenas o nome/número de usuário e não o link inteiro'
      });
    } else {
      clearErrors('urlOrUrlKey');
    }
  }, [urlOrUrlKey]);

  const getTypes = () => {
    loader.show();
    providerLinkTypeService
      .getAll()
      .then((response) =>
        setLinkTypes(response.sort((a, b) => a.index - b.index))
      )
      .catch(() => toast.open('Erro ao carregar tipos de links', 'error'))
      .finally(loader.hide);
  };

  const handleFormSubmit = (data: FormSchema) => {
    modalRef.close({
      link: {
        typeId: data.linkTypeId,
        label: data.label,
        urlOrUrlKey: data.urlOrUrlKey
      }
    } as LinkModalResult);
  };

  const handleTransformLinkUrl = () => {
    if (
      selectedLinkType &&
      !selectedLinkType.urlStructure &&
      !urlOrUrlKey.startsWith('http')
    ) {
      setValue('urlOrUrlKey', `https://${urlOrUrlKey}`);
    }
  };

  const fieldLabelLabel = selectedLinkType?.urlStructure
    ? 'Seu nome/número de usuário'
    : 'URL do link';

  const urlOrUrlKeyDescription =
    selectedLinkType?.urlStructure
      ? selectedLinkType.urlStructure.replace('{{urlKey}}', urlOrUrlKey)
      : '';

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Field>
        <Field.Label>Tipo de link</Field.Label>
        <Field.Select {...register('linkTypeId')} includeEmpty>
          {linkTypes.map((type) => (
            <Field.SelectOption key={'linkType' + type.id} value={type.id}>
              {type.name}
            </Field.SelectOption>
          ))}
        </Field.Select>
        <Field.Error>{errors.linkTypeId?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Nome do link</Field.Label>
        <Field.HelpText>
          Você pode escolher um nome personalizado para seu link
        </Field.HelpText>
        <Field.Input {...register('label')} />
        <Field.Error>{errors.label?.message}</Field.Error>
      </Field>

      {!!selectedLinkType && (
        <Field>
          <Field.Label className="flex items-center gap-1">
            <Icon icon={selectedLinkType.icon} />
            {fieldLabelLabel}
          </Field.Label>
          <Field.HelpText>{urlOrUrlKeyDescription}</Field.HelpText>
          <Field.Input
            {...register('urlOrUrlKey')}
            onBlur={handleTransformLinkUrl}
          />
          <Field.Error>{errors.urlOrUrlKey?.message}</Field.Error>
        </Field>
      )}

      <div className="flex justify-end z-[99999]">
        <Button type="submit" className="w-full md:w-auto">
          Salvar
        </Button>
      </div>
    </form>
  );
}
