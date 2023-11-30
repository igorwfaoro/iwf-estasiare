'use client';

import Gift from './components/Gift/Gift';
import { EventBySlugViewModel } from '../../../../../models/view-models/event-by-slug.view-model';

interface GiftsListProps {
  event: EventBySlugViewModel;
  // categories: GiftCategoryViewModel[];
}

export default function GiftsList({ event }: GiftsListProps) {
  // const [selectedCategory, setSelectedCategory] =
  // useState<GiftCategoryViewModel | null>(null);

  // const filteredGifts = gifts.filter((g) =>
  //   selectedCategory ? g.category.id === selectedCategory.id : true
  // );

  return (
    <div id="gifts-list">
      {/* <GiftsCategories
        categories={categories}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      /> */}

      <div className="mt-4 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {event.gifts?.map((g, i) => <Gift key={i} event={event} gift={g} />)}
      </div>
    </div>
  );
}
