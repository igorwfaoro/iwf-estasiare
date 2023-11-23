import './index.scss';

interface AboutProps {}

export default function About({}: AboutProps) {
  return (
    <section id="about">
      <div className="text">
        <p>
          Bem-vindo à <span className="bold">Eventy</span>, o seu parceiro de
          confiança na criação de eventos memoráveis. Na Eventy, acreditamos que
          cada momento especial merece ser celebrado de forma única e
          inesquecível. Com nossa plataforma intuitiva e flexível, você pode
          criar o evento dos seus sonhos, seja um casamento mágico, um
          aniversário emocionante ou qualquer ocasião especial que mereça ser
          comemorada.
        </p>
        <p>
          Nossa missão é tornar a organização de eventos mais simples,
          personalizada e emocionante. Oferecemos ferramentas poderosas para
          planejamento, gerenciamento de convidados, criação de sites
          personalizados e muito mais. Deixe a Eventy ajudar você a transformar
          sua visão em realidade e criar momentos que serão lembrados para
          sempre.
        </p>
        <p className="bold">
          Junte-se a nós e comece a jornada para um evento extraordinário.
          Celebre a vida com a Eventy!
        </p>
      </div>
    </section>
  );
}
