'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import Field from '../../../../../../../../../../components/Field/Field';
import Button from '../../../../../../../../../../components/Button/Button';
import { ModalRefPropType } from '../../../../../../../../../../contexts/ModalContext';
import { HandbookInputModel } from '../../../../../../../../../../models/input-models/handbook.input-model';
import { EventHandbookDetailViewModel } from '../../../../../../../../../../models/view-models/event-handbook-detail.view-model';
import MDEditor from '@uiw/react-md-editor';

export interface HandbookFormModalProps extends ModalRefPropType {
  handbook?: EventHandbookDetailViewModel;
}

export interface HandbookFormModalResult {
  handbook?: HandbookInputModel;
}

const formSchema = z.object({
  title: z.string().min(1, 'Informe o título'),
  description: z.string().min(1, 'Informe a descrição'),
  content: z.string().min(1, 'Descreva o conteúdo')
});

type FormSchema = z.infer<typeof formSchema>;

export default function HandbookFormModal({
  handbook,
  modalRef
}: HandbookFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    if (handbook) {
      setValue('title', handbook.title);
      setValue('description', handbook.description);
      setValue('content', handbook.content);
    }
  }, []);

  const handleFormSubmit = (data: FormSchema) => {
    modalRef.close({ gift: data } as HandbookFormModalResult);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Field>
        <Field.Label>Título</Field.Label>
        <Field.Input {...register('title')} />
        <Field.Error>{errors.title?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Descrição</Field.Label>
        <Field.Input {...register('description')} />
        <Field.Error>{errors.description?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Conteúdo</Field.Label>
        <MDEditor
          value={getValues().content}
          onChange={(value) => setValue('content', value || '')}
        />
        <Field.Error>{errors.content?.message}</Field.Error>
      </Field>

      <div className="flex justify-end">
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
