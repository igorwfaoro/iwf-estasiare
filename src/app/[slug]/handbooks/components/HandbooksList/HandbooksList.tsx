import Link from 'next/link';
import Card from '../../../../../components/Card/Card';
import { EventDetailViewModel } from '../../../../../models/view-models/event-detail.view-model';

interface HandbooksListProps {
  event: EventDetailViewModel;
}

export default function HandbooksList({
  event: { slug, handbooks }
}: HandbooksListProps) {
  return (
    <div className="max-w-[672px] mx-auto space-y-4">
      {handbooks!.map((handbook) => (
        <Link href={`/${slug}/handbooks/${handbook.id}`} className='block'>
          <Card className="p-4">
            <h1 className="text-xl font-bold">{handbook.title}</h1>
            <h2 className="text-gray-600">{handbook.description}</h2>
          </Card>
        </Link>
      ))}
    </div>
  );
}
