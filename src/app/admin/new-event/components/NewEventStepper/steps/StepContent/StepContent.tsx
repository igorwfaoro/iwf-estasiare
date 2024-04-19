import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '../../../../../../../components/Button/Button';
import Field from '../../../../../../../components/Field/Field';
import { DEFAULT_INPUT_ACCEPT_FILE_TYPES } from '../../../../../../../constants/file-types';
import { COLORS } from '../../../../../../../util/colors';
import { fileToDataURL } from '../../../../../../../util/helpers/file.helper';
import { useNewEventContext } from '../../../../contexts/NewEventContext';

interface StepContentProps {
  index: number;
}

const formContentSchema = z.object({
  primaryColor: z.string().min(1, 'Informe a cor principal do evento')
});

type FormContentSchema = z.infer<typeof formContentSchema>;

export default function StepContent({ index }: StepContentProps) {
  const {
    stepNext,
    stepPrev,
    setEventCreateData,
    eventCreateData,
    setStepComplete,

    bannerImageFile,
    setBannerImageFile,
    bannerImageThumbnail,
    setBannerImageThumbnail,

    logoImageFile,
    setLogoImageFile,
    logoImageThumbnail,
    setLogoImageThumbnail
  } = useNewEventContext();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormContentSchema>({
    resolver: zodResolver(formContentSchema)
  });

  useEffect(() => {
    // set default color
    setValue('primaryColor', COLORS.primary);

    if (eventCreateData?.content?.primaryColor) {
      setValue('primaryColor', eventCreateData.content.primaryColor);

      setStateFileData(setBannerImageThumbnail, bannerImageFile);
      setStateFileData(setLogoImageThumbnail, logoImageFile);
    }
  }, []);

  const setStateFileData = async (
    setState: (value: SetStateAction<string | undefined>) => void,
    file: File | undefined
  ) => {
    if (!file) return;
    setState(await fileToDataURL(file));
  };

  const handleInputFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
    setFileState: Dispatch<SetStateAction<File | undefined>>,
    setThumbnailState: Dispatch<SetStateAction<string | undefined>>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    setFileState(file);
    setStateFileData(setThumbnailState, file);
  };

  const handleFormSubmit = (data: FormContentSchema) => {
    setEventCreateData((curr) => ({
      ...curr,
      content: {
        primaryColor: data.primaryColor
      }
    }));

    setStepComplete(index);
    stepNext();
  };

  const color = watch('primaryColor');

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, console.log)}
      className="mt-4 flex flex-col gap-2"
    >
      <Field>
        <Field.Label>Qual é a cor principal do seu evento?</Field.Label>
        <div className="flex items-center gap-12">
          <HexColorPicker
            onChange={(c) => setValue('primaryColor', c)}
            color={color}
          />
          {color && (
            <div
              className="w-28 h-28 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
        </div>
        <Field.Error>{errors.primaryColor?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Escolha um banner para seu evento (opcional)</Field.Label>
        <Field.HelpText>
          Você pode definir isso depois se preferir
        </Field.HelpText>
        <Field.Input
          type="file"
          accept={DEFAULT_INPUT_ACCEPT_FILE_TYPES.join(', ')}
          onChange={(event) =>
            handleInputFileChange(
              event,
              setBannerImageFile,
              setBannerImageThumbnail
            )
          }
        />
      </Field>

      <div>
        {bannerImageThumbnail && (
          <img src={bannerImageThumbnail} className="h-28 mb-6 rounded-lg" />
        )}
      </div>

      <Field>
        <Field.Label>Escolha uma logo para seu evento (opcional)</Field.Label>
        <Field.HelpText>
          Você pode definir isso depois se preferir
        </Field.HelpText>
        <Field.Input
          type="file"
          accept={DEFAULT_INPUT_ACCEPT_FILE_TYPES.join(', ')}
          onChange={(event) =>
            handleInputFileChange(
              event,
              setLogoImageFile,
              setLogoImageThumbnail
            )
          }
        />
      </Field>

      <div>
        {logoImageThumbnail && (
          <img src={logoImageThumbnail} className="h-28 mb-6 rounded-lg" />
        )}
      </div>

      <div className="flex justify-between">
        <Button theme="light" type="button" onClick={stepPrev}>
          Voltar
        </Button>
        <Button type="submit">Próximo</Button>
      </div>
    </form>
  );
}
