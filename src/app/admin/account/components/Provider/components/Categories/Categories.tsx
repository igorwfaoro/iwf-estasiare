import Checkbox from '../../../../../../../components/Checkbox/Checkbox';
import Field from '../../../../../../../components/Field/Field';
import { useProviderContext } from '../../contexts/ProviderAccountProvider';

interface CategoriesProps {}

export default function Categories({}: CategoriesProps) {
  const { userIsLoaded, categories, categoriesIsLoading, setCategories } =
    useProviderContext();

  return (
    <Field isLoading={!userIsLoaded && categoriesIsLoading}>
      <Field.Label>Categorias</Field.Label>
      <Field.HelpText>
        Selecione a categorias que tem a ver com os serviços que você presta
      </Field.HelpText>
      <div className="flex flex-col flex-wrap gap-4 md:max-h-[50vh]">
        {categories.map((category) => (
          <Checkbox
            key={category.id}
            label={category.description}
            checked={category.selected}
            onChange={(e) =>
              setCategories((curr) =>
                curr.map((it) =>
                  it.id === category.id
                    ? { ...it, selected: e.target.checked }
                    : it
                )
              )
            }
          />
        ))}
      </div>
    </Field>
  );
}
