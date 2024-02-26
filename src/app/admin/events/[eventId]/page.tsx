import { cache } from 'react';
import AdminPageBase from '../../components/AdminPageBase/AdminPageBase';
import { createEventServerService } from '../../../../services/server/event.server-service';
import { eventTitleDescription } from '../../../../util/helpers/event-title-description.helper';
import dayjs from 'dayjs';
import { renderInitialsIcon } from '../../../../util/helpers/initials-icon.helper';
import InitialsIcon from '../../../../components/InitialsIcon/InitialsIcon';

export const revalidate = 3600;

const getEvent = cache(async (id: number) => {
  return await createEventServerService().getById(id);
});

interface AdminEventPageProps {
  params: { id: number };
}

export default async function AdminEventPage({ params }: AdminEventPageProps) {
  const event = await getEvent(params.id);

  const titleDescription = eventTitleDescription(event);

  const dateFormatted = dayjs(event.date).format('DD/MM/YYYY HH:mm');

  const logo = event.content?.logoImage ? (
    <img className="h-7" src={event.content.logoImage} />
  ) : (
    renderInitialsIcon(event, 28)
  );

  return (
    <AdminPageBase>
      <div
        className="w-full h-32 rounded-xl flex items-center justify-center relative"
        style={{ backgroundImage: `url(${event.content?.bannerImage})` }}
      >
        <div className='w-full h-[100%] absolute top-0 left-0 bg-black opacity-50 rounded-xl' />
        <div className="text-2xl font-bold flex gap-2 items-center pb-2 text-white z-10">
          {logo}
          <span>{titleDescription}</span>
        </div>
      </div>
    </AdminPageBase>
  );
}
