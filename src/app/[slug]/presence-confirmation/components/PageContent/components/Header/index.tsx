import './index.scss';

export default function Header() {
  return (
    <div id="presence-confirmation-header">
      <h1 className="header-title">Confirmação de presença</h1>

      <div className="header-text">
        <p>
          Bem-vindo à nossa página de confirmação de presença! Estamos
          emocionados por compartilhar esse momento especial com você e mal
          podemos esperar para celebrar juntos. Por favor, siga as instruções
          abaixo para confirmar sua presença:
        </p>

        <ol>
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
      </div>
    </div>
  );
}
