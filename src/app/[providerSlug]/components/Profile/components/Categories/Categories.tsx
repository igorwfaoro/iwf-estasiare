import Chip from '../../../../../../components/Chip/Chip';
import { ProviderViewModel } from '../../../../../../models/view-models/provider.view-model';

interface CategoriesProps {
  provider: ProviderViewModel;
}

export default function Categories({
  provider: { categories }
}: CategoriesProps) {
  return (
    <section className="flex justify-center md:justify-start gap-2 flex-wrap">
      {categories?.map((category, i) => (
        <Chip
          key={'category-' + i}
          className="bg-transparent border border-primary text-primary"
        >
          {category.description}
        </Chip>
      ))}
    </section>
  );
}
