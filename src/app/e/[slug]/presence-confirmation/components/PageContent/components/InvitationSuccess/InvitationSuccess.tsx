import ConfettiExplosion from 'react-confetti-explosion';

import Button from '../../../../../../../../components/Button/Button';
import { usePresenceConfirmationContext } from '../../contexts/PresenceConfirmationContext';

export default function InvitationSuccess() {
  const { event } = usePresenceConfirmationContext();

  const confettiDuration = 3000;
  const confettiParticleCount = 150;
  const confettiWidth = window.innerWidth + 200;

  return (
    <>
      <div className="mt-8 flex flex-col gap-6">
        <div className="bg-sky-400 p-6 text-white font-bold text-2xl rounded-lg text-center">
          🎉👰 Parabéns! Sua confirmação de presença foi registrada com sucesso!
          🤵🎉
        </div>

        <div className="text-center text-lg text-gray-800 flex flex-col">
          <p>
            Estamos animados para compartilhar este dia especial com você e sua
            presença tornará esse momento ainda mais memorável. Mal podemos
            esperar para celebrar juntos!
          </p>
          <p>
            Se você tiver mais alguma pergunta ou precisar de informações
            adicionais, sinta-se à vontade para entrar em contato conosco.
            Agora, é só aguardar ansiosamente pela data do evento. Até lá!
          </p>
        </div>

        <Button theme="primary" href={`/${event.slug}`}>
          Ir para início
        </Button>
      </div>

      <div className="absolute top-1/4 left-1/2">
        <ConfettiExplosion
          duration={confettiDuration}
          particleCount={confettiParticleCount}
          width={confettiWidth}
        />
      </div>
    </>
  );
}
