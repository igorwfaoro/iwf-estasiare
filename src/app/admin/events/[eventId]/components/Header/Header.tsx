import { EventDetailViewModel } from '../../../../../../models/view-models/event-detail.view-model';
import { eventTitleDescription } from '../../../../../../util/helpers/event-title-description.helper';
import { renderInitialsIcon } from '../../../../../../util/helpers/initials-icon.helper';

interface HeaderProps {
  event: EventDetailViewModel;
}

export default function Header({ event }: HeaderProps) {
  const titleDescription = eventTitleDescription(event);

  const logo = event.content?.logoImage ? (
    <img className="h-7" src={event.content.logoImage} />
  ) : (
    renderInitialsIcon(event, 28)
  );

  return (
    <div
      className="w-full h-32 rounded-xl flex items-center justify-center relative"
      style={{ backgroundImage: `url(${event.content?.bannerImage})` }}
    >
      <div className="w-full h-[100%] absolute top-0 left-0 bg-black opacity-50 rounded-xl" />
      <div className="text-2xl font-bold flex gap-2 items-center pb-2 text-white z-10">
        {logo}
        <span>{titleDescription}</span>
      </div>
    </div>
  );
}
