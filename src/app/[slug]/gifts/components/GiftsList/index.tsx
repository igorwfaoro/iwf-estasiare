'use client';

import Gift from './components/Gift';
import './index.scss';
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

      <div className="row">
        {event.gifts?.map((g, i) => (
          <div key={i} className="col-md-4">
            <Gift event={event} gift={g} />
          </div>
        ))}
      </div>
    </div>
  );
}
