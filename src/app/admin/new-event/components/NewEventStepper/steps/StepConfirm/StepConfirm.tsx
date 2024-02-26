import dayjs from 'dayjs';
import Button from '../../../../../../../components/Button/Button';
import { EventCreateInputModel } from '../../../../../../../models/input-models/event-create.input-model';
import { eventTitleDescription } from '../../../../../../../util/helpers/event-title-description.helper';
import { useNewEventContext } from '../../../../contexts/NewEventContext';
import InitialsIcon from '../../../../../../../components/InitialsIcon/InitialsIcon';
import { renderInitialsIcon } from '../../../../../../../util/helpers/initials-icon.helper';

interface StepConfirmProps {
  index: number;
}

export default function StepConfirm({ index }: StepConfirmProps) {
  const { create, stepPrev, eventCreateData, setStepComplete } =
    useNewEventContext();

  const confirm = () => {
    setStepComplete(index);
    create();
  };

  const data = eventCreateData as EventCreateInputModel;

  const titleDescription = eventTitleDescription(data);

  const dateFormatted = dayjs(data.date).format('DD/MM/YYYY HH:mm');

  const logo = data.content.logoImage ? (
    <img className="h-7" src={data.content.logoImage} />
  ) : (
    renderInitialsIcon(data, 28)
  );

  return (
    <div className="space-y-4 my-4">
      <div
        className="w-full h-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.content.bannerImage})` }}
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
        <div className="text-gray-600">{data.address.fullDescription}</div>
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
