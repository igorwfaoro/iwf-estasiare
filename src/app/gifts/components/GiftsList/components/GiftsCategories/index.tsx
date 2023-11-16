// import classNames from 'classnames';
// import { GiftCategoryViewModel } from '../../../../../../models/view-models/gift-category.view-model';

// interface GiftsCategoriesProps {
//   categories: GiftCategoryViewModel[];
//   onSelectCategory: (category: GiftCategoryViewModel | null) => void;
//   selectedCategory: GiftCategoryViewModel | null;
// }

// const chipStyle =
//   'category border border-solid border-neutral-400 rounded-full px-3 py-1 cursor-pointer';

// const selectedChipStyle = 'bg-secondary text-white font-bold';

// export default function GiftsCategories({
//   categories,
//   onSelectCategory,
//   selectedCategory,
// }: GiftsCategoriesProps) {
//   return (
//     <div className="flex gap-2 flex-wrap">
//       {!!categories.length && (
//         <div
//           className={classNames(
//             chipStyle,
//             selectedCategory === null && selectedChipStyle
//           )}
//           onClick={() => onSelectCategory(null)}
//         >
//           Todas
//         </div>
//       )}

//       {categories.map((c, i) => (
//         <div
//           key={i}
//           className={classNames(
//             chipStyle,
//             c.id === selectedCategory?.id && selectedChipStyle
//           )}
//           onClick={() => onSelectCategory(c)}
//         >
//           {c.title}
//         </div>
//       ))}
//     </div>
//   );
// }
