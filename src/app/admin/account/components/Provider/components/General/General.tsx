import { ChangeEvent } from 'react';
import { HexColorPicker } from 'react-colorful';
import Button from '../../../../../../../components/Button/Button';
import Field from '../../../../../../../components/Field/Field';
import { Place } from '../../../../../../../components/Field/components/FieldInputAddressAutocomplete/types/place';
import { DEFAULT_INPUT_ACCEPT_FILE_TYPES } from '../../../../../../../constants/file-types';
import { fileToDataURL } from '../../../../../../../util/helpers/file.helper';
import { normalizeSlug } from '../../../../../../../util/helpers/slug.helper';
import { useProviderContext } from '../../contexts/ProviderAccountProvider';

interface GeneralProps {}

export default function General({}: GeneralProps) {
  const {
    isRegister,
    user,
    userIsLoaded,
    userIsProvider,
    form: { register, setValue, watch },
    formState: { errors },
    setProfileImageThumbnail,
    profileImageThumbnail
  } = useProviderContext();

  const primaryColor = watch('primaryColor');

  const handleInputFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    setValue('profileImage', file);
    setProfileImageThumbnail(await fileToDataURL(file));
  };

  return (
    <>
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
            placeholder={userIsLoaded && !userIsProvider ? user!.name : ''}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <img
                src={profileImageThumbnail}
                className="h-28 mb-6 rounded-md"
              />
            )}
          </div>
        </Field>

        <Field>
          <Field.Label>Cor da sua marca</Field.Label>
          <Field.HelpText>
            Selecione uma cor para ser usada na sua página de perfil público
          </Field.HelpText>
          <div className="flex items-center gap-12">
            <HexColorPicker
              onChange={(c) => setValue('primaryColor', c)}
              color={primaryColor}
            />
            {primaryColor && (
              <div
                className="w-28 h-28 rounded-full"
                style={{ backgroundColor: primaryColor }}
              />
            )}
          </div>
          <Field.Error>{errors.primaryColor?.message}</Field.Error>
        </Field>
      </div>

      <Field>
        <Field.Label>Endereço</Field.Label>
        <Field.AddressAutocomplete
          defaultPlaceValue={(user?.provider?.address as Place) || undefined}
          onAddressSelected={(value) => setValue('address', value)}
        />
        <Field.Error>{errors.address?.message}</Field.Error>
      </Field>
    </>
  );
}
