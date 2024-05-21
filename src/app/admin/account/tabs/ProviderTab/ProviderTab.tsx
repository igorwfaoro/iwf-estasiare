import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLoader } from '../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../contexts/ToastContext';
import { createProviderClientService } from '../../../../../services/client/provider.client-service';
import { fileToDataURL } from '../../../../../util/helpers/file.helper';

interface ProviderTabProps {}

const formSchema = z.object({
  name: z.string().min(1, 'Informe o nome'),
  contactEmail: z.string().email({ message: 'E-mail inválido' }).optional(),
  contactPhone: z.string().optional(),
  contactWhatsapp: z.string().optional(),
  profileImage: z.any().optional(),
  bio: z.string().optional(),
  link: z.string().url({ message: 'Link inválido' }).optional(),
  categories: z.array(z.number())
});

type FormSchema = z.infer<typeof formSchema>;

export default function ProviderTab({}: ProviderTabProps) {
  const loader = useLoader();
  const toast = useToast();
  const providerService = createProviderClientService();

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

  useEffect(() => {
    if (sessionData?.user) {
    }
  }, [sessionData]);

  const handleFormSubmit = (data: FormSchema) => {
    console.log(data);
    // loader.show();
    // userService
    //   .update({
    //     name: data.name
    //   })
    //   .then(() => toast.open('Dados salvos', 'success'))
    //   .catch(() => toast.open('Erro ao salvar usuário', 'error'))
    //   .finally(() => loader.hide());
  };

  const handleInputFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    setValue('profileImage', file);
    setProfileImageThumbnail(await fileToDataURL(file));
  };

  const providerIsLoading = !sessionData?.user.provider;

  return <div>ProviderTab</div>;
}
