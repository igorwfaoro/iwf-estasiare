'use client';

import Gift from './components/Gift';
import { Col, Row } from 'react-grid-system';
import './index.scss';
import { EventViewModel } from '../../../../../models/view-models/event.view-model';

interface GiftsListProps {
  event: EventViewModel;
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

      <Row className="row">
        {event.gifts?.map((g, i) => (
          <Col key={i} md={4}>
            <Gift event={event} gift={g} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
