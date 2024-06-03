import Button from '../../../../../../../components/Button/Button';
import { EventCreateInputModel } from '../../../../../../../models/input-models/event-create.input-model';
import { appDayjs } from '../../../../../../../util/date';
import { eventTitleDescription } from '../../../../../../../util/helpers/event-title-description.helper';
import { renderInitialsIcon } from '../../../../../../../util/helpers/initials-icon.helper';
import { useNewEventContext } from '../../../../contexts/NewEventContext';

interface StepConfirmProps {
  index: number;
}

export default function StepConfirm({ index }: StepConfirmProps) {
  const {
    create,
    stepPrev,
    eventCreateData,
    setStepComplete,
    bannerImageThumbnail,
    logoImageThumbnail
  } = useNewEventContext();

  const confirm = () => {
    setStepComplete(index);
    create();
  };

  const data = eventCreateData as EventCreateInputModel;

  const titleDescription = eventTitleDescription(data);

  const dateFormatted = appDayjs.utc(data.date).format('DD/MM/YYYY HH:mm');

  const logo = logoImageThumbnail ? (
    <img className="h-7" src={logoImageThumbnail} />
  ) : (
    renderInitialsIcon(data, 28)
  );

  return (
    <div className="space-y-4 my-4">
      <div
        className="w-full h-32 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerImageThumbnail})`,
          backgroundColor: data.content.primaryColor
        }}
      />

      <div>
        <h1 className="text-2xl font-bold flex gap-2 items-center pb-2">
          {logo}
          <span>{titleDescription}</span>
        </h1>
        <div
          className="w-full h-[2px]"
          style={{ backgroundColor: data.content.primaryColor }}
        />
      </div>

      <div>
        <div className="text-gray-600">{data.address.formattedAddress}</div>
        <div className="text-gray-600 font-bold">{dateFormatted}</div>
      </div>

      <div className="flex justify-between">
        <Button theme="light" type="button" onClick={stepPrev}>
          Voltar
        </Button>
        <Button onClick={confirm}>Criar!</Button>
      </div>
    </div>
  );
}
