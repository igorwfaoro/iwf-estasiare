import { zodResolver } from '@hookform/resolvers/zod';
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

export interface LinkModalProps extends ModalRefPropType {
  link?: ProviderLinkViewModel;
}

export interface LinkModalResult {
  link?: ProviderLinkUpdateInputModel | ProviderLinkCreateInputModel;
}

const formSchema = z.object({
  type: z.number({ required_error: 'Defina o tipo de link' }),
  label: z.string().min(1, 'Informe nome do link'),
  urlOrUrlKey: z.string().min(0, 'Campo obrigatório')
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
    watch
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const isUpdate = !!link;

  const [types, setTypes] = useState<ProviderLinkTypeViewModel[]>([]);

  const [selectedType, setSelectedType] = useState<ProviderLinkTypeViewModel>();

  const selectedTypeId = watch('type');

  useEffect(() => {
    getTypes();

    if (isUpdate) {
      setValue('label', link.label);
      setValue('urlOrUrlKey', link.urlKey || link.url);
    }
  }, []);

  useEffect(() => {
    if (isUpdate) {
      setValue('type', link.type!.id);
    }
  }, [types]);

  useEffect(() => {
    const t = types.find((it) => it.id === Number(selectedTypeId));
    console.log({ t, selectedTypeId });

    // if (!link && t) setValue('label', selectedType!.name);

    setSelectedType(t);
  }, [selectedTypeId]);

  const getTypes = () => {
    loader.show();
    providerLinkTypeService
      .getAll()
      .then(setTypes)
      .catch(() => toast.open('Erro ao carregar tipos de links', 'error'))
      .finally(loader.hide);
  };

  const handleFormSubmit = (data: FormSchema) => {
    modalRef.close({ link: data } as LinkModalResult);
  };

  const fieldLabelLabel = selectedType?.urlStructure
    ? 'Seu nome/número de usuário'
    : 'URL do link';

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Field>
        <Field.Label>Tipo de link</Field.Label>
        <Field.Select {...register('type')} includeEmpty>
          {types.map((type) => (
            <Field.SelectOption key={'type' + type.id} value={type.id}>
              {type.name}
            </Field.SelectOption>
          ))}
        </Field.Select>
        <Field.Error>{errors.type?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Nome do link</Field.Label>
        <Field.HelpText>
          Você pode escolher um nome personalizado para seu link
        </Field.HelpText>
        <Field.Input {...register('label')} />
      </Field>

      {!!selectedType && (
        <Field>
          <Field.Label>{fieldLabelLabel}</Field.Label>
          <Field.Input {...register('urlOrUrlKey')} />
        </Field>
      )}

      <div className="flex justify-end z-[99999]">
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
