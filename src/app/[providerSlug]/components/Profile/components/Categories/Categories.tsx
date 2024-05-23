import classNames from 'classnames';
import Chip from '../../../../../../components/Chip/Chip';
import { ProviderViewModel } from '../../../../../../models/view-models/provider.view-model';
import { COLORS } from '../../../../../../util/colors';
import { colorIsLight } from '../../../../../../util/helpers/color.helper';

interface CategoriesProps {
  provider: ProviderViewModel;
}

export default function Categories({
  provider: { categories, primaryColor }
}: CategoriesProps) {
  const color = primaryColor || COLORS.primary;
  const primaryColorIsLight = colorIsLight(color);

  return (
    <section className="flex justify-center md:justify-start gap-2 flex-wrap">
      {categories?.map((category, i) => (
        <Chip
          key={'category-' + i}
          className={classNames('bg-transparent border', {
            'border-neutral-800 text-neutral-800': primaryColorIsLight,
            'text-white': !primaryColorIsLight
          })}
          style={{
            ...(!primaryColorIsLight && { backgroundColor: color })
          }}
        >
          {category.description}
        </Chip>
      ))}
    </section>
  );
}
