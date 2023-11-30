import { EventBySlugViewModel } from '../../../../../models/view-models/event-by-slug.view-model';

interface HeaderProps {
  event: EventBySlugViewModel;
}

export default function Header({ event }: HeaderProps) {
  return (
    <div className="pt-6 pb-16 px-4">
      <h1
        className="text-3xl font-bold text-center mb-6"
        style={{ color: event.content?.primaryColor }}
      >
        Escolha um presente simbólico!
      </h1>

      <div className="max-w-[672px] mx-auto text-lg text-center text-gray-800 flex flex-col">
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
