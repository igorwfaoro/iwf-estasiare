import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';

import { EventDetailViewModel } from '../../../../../../../../../../models/view-models/event-detail.view-model';

interface PhotoAlbumCardProps {
  event: EventDetailViewModel;
}

export default function PhotoAlbumCard({ event }: PhotoAlbumCardProps) {
  return (
    <div className="space-y-4">
      photo album
    </div>
  );
}
