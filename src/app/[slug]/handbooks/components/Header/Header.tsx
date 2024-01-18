import { EventDetailViewModel } from '../../../../../models/view-models/event-detail.view-model';
import EventPageHeader from '../../../components/EventPageHeader/EventPageHeader';

interface HeaderProps {
  event: EventDetailViewModel;
}

export default function Header({ event }: HeaderProps) {
  return (
    <EventPageHeader>
      <EventPageHeader.Title color={event.content?.primaryColor}>
        Manuais para o Grande Dia
      </EventPageHeader.Title>
      <EventPageHeader.Sub>
        <p>
          Bem-vindo à nossa seção de Manuais para o Grande Dia! Aqui, você
          encontrará uma coleção de guias úteis para diversos aspectos do nosso
          evento especial. Queremos tornar a sua experiência o mais agradável e
          organizada possível, e esses manuais foram criados para ajudar você a
          se preparar e aproveitar ao máximo cada momento conosco.
        </p>

        <p>
          Navegue pelos diferentes manuais disponíveis. Cada manual contém
          informações importantes, dicas úteis e recomendações para que você
          possa se sentir à vontade e preparado para celebrar conosco.
        </p>

        <p>
          Se tiver alguma dúvida ou precisar de mais informações sobre algum dos
          manuais, sinta-se à vontade para nos contatar. Estamos aqui para
          ajudar e garantir que você tenha uma experiência incrível durante o
          nosso evento.
        </p>

        <p>
          Agradecemos por fazer parte deste momento especial e esperamos que os
          nossos manuais facilitem a sua participação no nosso grande dia!
        </p>
      </EventPageHeader.Sub>
    </EventPageHeader>
  );
}
