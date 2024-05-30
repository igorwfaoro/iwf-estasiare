import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../../../../components/Button/Button';
import Field from '../../../../components/Field/Field';
import { useProviderSearchContext } from '../../contexts/ProviderSearchContext';

interface FilterProps {}

const formSchema = z.object({
  query: z.string().optional(),
  city: z.string().optional(),
  providerCategoryId: z.number().optional()
});

type FormSchema = z.infer<typeof formSchema>;

export default function Filter({}: FilterProps) {
  const { categories, cities } = useProviderSearchContext();

  const { register } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  return (
    <div className="space-y-2">
      <div>
        <Field>
          <Field.Label>Busca</Field.Label>
          <Field.Input
            {...register('query')}
            placeholder="Fornecedor, cidade, categoria..."
          />
        </Field>

        <Field>
          <Field.Label>Categoria</Field.Label>
          <Field.Select>
            {categories.map((c) => (
              <Field.SelectOption key={'category-' + c.id} value={c.id}>
                {c.description}
              </Field.SelectOption>
            ))}
          </Field.Select>
        </Field>

        <Field>
          <Field.Label>Cidade</Field.Label>
          <Field.Select>
            {cities.map((c) => (
              <Field.SelectOption key={'city-' + c} value={c}>
                {c}
              </Field.SelectOption>
            ))}
          </Field.Select>
        </Field>
      </div>

      <div className="flex justify-end gap-2">
        <Button theme="primary-outline">Limpar filtros</Button>
        <Button>Buscar</Button>
      </div>
    </div>
  );
}
