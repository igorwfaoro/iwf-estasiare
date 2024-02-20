import Field from '../../../components/Field/Field';
import {
  eventTypeLabel,
  eventTypeList
} from '../../../util/helpers/event-type.helper';
import { useForm } from 'react-hook-form';

interface AdminNewEventProps {}

// eventType   EventType
// date        DateTime

// address   EventAddress @relation(fields: [addressId], references: [id])

// contentId BigInt       @unique
// content   EventContent @relation(fields: [contentId], references: [id])

// weddingDetail   EventWeddingDetail? @relation(fields: [weddingDetailId], references: [id])

export default function AdminNewEvent({}: AdminNewEventProps) {
  const { register, handleSubmit } = useForm();

  const eventTypes = eventTypeList;

  return (
    <div>
      <h1>Criar novo Evento</h1>

      <form>
        <Field>
          <Field.Label>Qual é o tipo do seu evento?</Field.Label>
          <Field.Select>
            {eventTypes.map((eventType) => (
              <Field.Select.Option key={eventType}>
                {(eventTypeLabel as any)[eventType]}
              </Field.Select.Option>
            ))}
          </Field.Select>
        </Field>

        <Field>
          <Field.Label>Quando vai ser?</Field.Label>
          <Field.Input type="datetime-local" />
        </Field>
      </form>
    </div>
  );
}
