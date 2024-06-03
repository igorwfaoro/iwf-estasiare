'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {} from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Accordion from '../../../../components/Accordion/Accordion';
import Button from '../../../../components/Button/Button';
import Field from '../../../../components/Field/Field';
import Skeleton from '../../../../components/Skeleton/Skeleton';
import { ProviderSearchInputModel } from '../../../../models/input-models/provider-search.input-model';
import { useProviderSearchContext } from '../../contexts/ProviderSearchContext';

interface FilterProps {}

const formSchema = z.object({
  query: z.string().optional(),
  city: z.string().optional(),
  providerCategoryId: z
    .number()
    .optional()
    .or(z.string().optional())
    .transform((v) => (v ? Number(v) : undefined))
});

type FormSchema = z.infer<typeof formSchema>;

export default function Filter({}: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryParams = useSearchParams();

  const {
    categories,
    cities,
    setSearchParams,
    providersIsLoading,
    providersIsLoaded
  } = useProviderSearchContext();

  const { register, handleSubmit, setValue, getValues } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    // Object.entries(getValues()).map(([key, value]) => {
    //   const paramValue = queryParams.get(key);
    //   if (paramValue) setValue(key as any, value);
    // });
  }, []);

  const handleSearch = (data: FormSchema) => {
    const params: ProviderSearchInputModel = {
      q: data.query,
      city: data.city,
      providerCategoryId: data.providerCategoryId,
      index: 0,
      limit: 30
    };

    setSearchParams(params);

    // TODO: use search params query
    // const urlSearchParams = new URLSearchParams();
    // Object.entries(params).map(([key, value]) => {
    //   urlSearchParams.set(key, value ? String(value) : '');
    // });
    // router.push(`${pathname}?${urlSearchParams.toString()}`);
  };

  const handleClear = () => {
    setSearchParams({});
  };

  const cityDatalist = cities.map((c) => ({
    value: c.city,
    label: `${c.city} - ${c.state}`
  }));

  if (!providersIsLoaded && providersIsLoading) {
    return <Skeleton className="w-full h-14 rounded-2xl" />;
  }

  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.ItemHeader>Filtros</Accordion.ItemHeader>
        <Accordion.ItemContent className="bg-white">
          <form onSubmit={handleSubmit(handleSearch, console.error)}>
            <div>
              <Field>
                <Field.Label>Busca</Field.Label>
                <Field.Input
                  {...register('query')}
                  placeholder="Fornecedor, cidade, categoria..."
                  handleClickSearchButton={handleSubmit(handleSearch)}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <Field.Label>Categoria</Field.Label>
                <Field.Select {...register('providerCategoryId')} includeEmpty>
                  {categories.map((c) => (
                    <Field.SelectOption key={'category-' + c.id} value={c.id}>
                      {c.description}
                    </Field.SelectOption>
                  ))}
                </Field.Select>
              </Field>

              <Field>
                <Field.Label>Cidade</Field.Label>
                <Field.Input
                  {...register('city')}
                  id="city"
                  datalist={cityDatalist}
                />
              </Field>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                theme="primary-outline"
                onClick={handleClear}
                disabled={providersIsLoading}
                type="button"
              >
                Limpar filtros
              </Button>
              <Button type="submit" disabled={providersIsLoading}>
                Buscar
              </Button>
            </div>
          </form>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion>
  );
}
