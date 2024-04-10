'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import Field from '../../../../../../../../../../components/Field/Field';
import Button from '../../../../../../../../../../components/Button/Button';
import { ModalRefPropType } from '../../../../../../../../../../contexts/ModalContext';
import { HandbookInputModel } from '../../../../../../../../../../models/input-models/handbook.input-model';
import { EventHandbookDetailViewModel } from '../../../../../../../../../../models/view-models/event-handbook-detail.view-model';
import ReactQuill from 'react-quill';
import * as Quill from 'quill';
import 'react-quill/dist/quill.snow.css';

// import ImageResize from 'quill-image-resize-module-ts';
// Quill.default.register('modules/imageResize', ImageResize);

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
    setValue
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const [content, setContent] = useState('');

  useEffect(() => {
    if (handbook) {
      setValue('title', handbook.title);
      setValue('description', handbook.description);
      setContent(handbook.content);
    }
  }, []);

  useEffect(() => {
    setValue('content', content);
  }, [content]);

  const handleFormSubmit = (data: FormSchema) => {
    modalRef.close({ handbook: data } as HandbookFormModalResult);
  };

  var toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],

    [{ size: ['small', false, 'large', 'huge'] }],
    ['link', 'image'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],

    ['clean']
  ];

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
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={{
            toolbar: toolbarOptions
          }}
          className="min-h-52 flex flex-col relative bg-white"
        />
        <Field.Error>{errors.content?.message}</Field.Error>
      </Field>

      <div className="flex justify-end z-[99999]">
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
