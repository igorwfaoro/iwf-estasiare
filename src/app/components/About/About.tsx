import ButtonNewEvent from '../ButtonNewEvent/ButtonNewEvent';
import ButtonRegisterProvider from '../ButtonRegisterProvider/ButtonRegisterProvider';

interface AboutProps {}

export default function About({}: AboutProps) {
  return (
    <section id="about">
      <div className="flex flex-col gap-6 text-center items-center text-lg px-[10%]">
        <p>
          Bem-vindo à <span className="font-bold">Estasiare</span>, sua
          plataforma de confiança para a criação de eventos inesquecíveis.
          Acreditamos que cada momento especial merece ser celebrado de maneira
          única. Com nossa plataforma intuitiva, você pode planejar e organizar
          o evento dos seus sonhos, seja um casamento, um aniversário ou
          qualquer ocasião especial.
        </p>

        <ButtonNewEvent className="px-2 py-1 block" />

        <p>
          Na Estasiare, nossa missão é simplificar a organização de eventos,
          oferecendo ferramentas poderosas para planejamento, gerenciamento de
          convidados e criação de sites personalizados. Além disso, conectamos
          você aos melhores fornecedores do mercado.
        </p>

        <p>
          Se você é um fornecedor, cadastre-se em nossa plataforma para ser
          encontrado por clientes em busca de serviços como o seu. Destaque-se
          com um perfil completo, onde você pode adicionar links para suas redes
          sociais e portfólio, facilitando o contato direto com seus clientes.
        </p>

        <ButtonRegisterProvider className="px-2 py-1 block" />

        <p className="font-bold">
          Junte-se a nós e comece a transformar suas visões em realidade com a
          Estasiare. Celebre a vida com momentos inesquecíveis!
        </p>
      </div>
    </section>
  );
}
