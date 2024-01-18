import EventPageHeader from '../../../../../components/EventPageHeader/EventPageHeader';
import { usePresenceConfirmationContext } from '../../contexts/PresenceConfirmationContext';

export default function Header() {
  const { event } = usePresenceConfirmationContext();

  return (
    <EventPageHeader>
      <EventPageHeader.Title color={event.content?.primaryColor}>
        Confirmação de presença
      </EventPageHeader.Title>
      <EventPageHeader.Sub>
        <p>
          Bem-vindo à nossa página de confirmação de presença! Estamos
          emocionados por compartilhar esse momento especial com você e mal
          podemos esperar para celebrar juntos. Por favor, siga as instruções
          abaixo para confirmar sua presença:
        </p>

        <ol className="list-decimal text-left text-base">
          <li>
            Digite os nomes que estão no convite do convite no campo abaixo
            (digite exatamente igual do convite)
          </li>
          <li>
            Selecione as pessoas pessoas que irão comparecer ao evento junto com
            você
          </li>
          <li>Clique no botão "Confirmar"</li>
        </ol>
      </EventPageHeader.Sub>
    </EventPageHeader>
  );
}
