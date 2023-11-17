import { EventViewModel } from '../../../../../models/view-models/event.view-model';
import './index.scss';

interface HeaderProps {
  event: EventViewModel;
}

export default function Header({ event }: HeaderProps) {
  return (
    <div id="gifts-header">
      <h1
        className="header-title"
        style={{ color: event.designDetail.primaryColor }}
      >
        Escolha um presente simbólico!
      </h1>

      <div className="header-text">
        <p>
          É com muita felicidade que compartilhamos este momento único em nossas
          vidas. Sua presença é um presente inestimável e torna este dia ainda
          mais especial. Para tornar a celebração ainda mais significativa,
          criamos uma lista com presentes simbólicos que representam nossos
          sonhos e planos futuros.
        </p>

        <p>
          Fique à vontade para escolher um presente que ressoe com você. Seja
          ele um liquidificador para prepararmos deliciosas receitas juntos, um
          porta-retrato para guardar memórias preciosas ou qualquer outra opção
          que toque o seu coração.
        </p>

        <p>
          Saiba que, ao contribuir com o valor do presente, você nos ajuda a
          construir um futuro repleto de amor e cumplicidade.
        </p>

        <p>
          Agradecemos de todo o coração por fazer parte desta celebração e
          compartilhar conosco esse momento de alegria e felicidade.
        </p>

        <p>
          Seu carinho é o nosso presente. Obrigado por fazer parte da nossa
          história.
        </p>
      </div>
    </div>
  );
}
