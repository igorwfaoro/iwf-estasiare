'use client';

import Gift from './components/Gift/Gift';
import { EventDetailViewModel } from '../../../../../models/view-models/event-detail.view-model';

interface GiftsListProps {
  event: EventDetailViewModel;
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

      <div className="mt-4 gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {event.gifts?.map((g, i) => <Gift key={i} event={event} gift={g} />)}
      </div>
    </div>
  );
}
