import { EventDetailViewModel } from '../../../../../models/view-models/event-detail.view-model';
import EventPageHeader from '../../../components/EventPageHeader/EventPageHeader';

interface HeaderProps {
  event: EventDetailViewModel;
}

export default function Header({ event }: HeaderProps) {
  return (
    <EventPageHeader className="pb-0">
      <EventPageHeader.Title color={event.content?.primaryColor}>
        Escolha um presente simbólico!
      </EventPageHeader.Title>
      <EventPageHeader.Sub>
        <p>
          É com muita felicidade que compartilhamos este momento único em nossas
          vidas. Sua presença é um presente inestimável e torna este dia ainda
          mais especial. Para tornar a celebração ainda mais significativa,
          criamos uma lista com presentes que representam nossos sonhos e planos
          futuros.
        </p>

        <p>
          Agradecemos de todo o coração por fazer parte desta celebração e
          compartilhar conosco esse momento de alegria e felicidade. Seu carinho
          é o nosso presente. Obrigado por fazer parte da nossa história.
        </p>
      </EventPageHeader.Sub>
    </EventPageHeader>
  );
}
