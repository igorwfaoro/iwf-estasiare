'use client';

import { GiftViewModel } from '../../../../models/view-models/gift.view-model';
import Gift from './components/Gift';
import { Col, Row } from 'react-grid-system';
import './index.scss';

interface GiftsListProps {
  gifts: GiftViewModel[];
  // categories: GiftCategoryViewModel[];
}

export default function GiftsList({ gifts }: GiftsListProps) {
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
        {gifts.map((g, i) => (
          <Col key={i} md={4}>
            <Gift gift={g} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
