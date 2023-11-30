import { usePresenceConfirmationContext } from '../../contexts/PresenceConfirmationContext';

export default function Header() {
  const { event } = usePresenceConfirmationContext();

  return (
    <div className="pt-6 pb-16 max-w-2xl">
      <h1
        className="text-3xl font-bold text-center mb-6"
        style={{ color: event.content?.primaryColor }}
      >
        Confirmação de presença
      </h1>

      <div className="text-lg text-gray-800 flex flex-col gap-4">
        <p>
          Bem-vindo à nossa página de confirmação de presença! Estamos
          emocionados por compartilhar esse momento especial com você e mal
          podemos esperar para celebrar juntos. Por favor, siga as instruções
          abaixo para confirmar sua presença:
        </p>

        <ol className='list-disc'>
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
