import ButtonNewEvent from '../ButtonNewEvent/ButtonNewEvent';
import ButtonRegisterProvider from '../ButtonRegisterProvider/ButtonRegisterProvider';

export default function HomeHeader() {
  return (
    <header className="w-full h-screen before:bg-cover before:bg-top before:bg-[url(/images/banner-home.jpg)] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:brightness-50">
      <div className="absolute w-full h-screen flex flex-col items-center justify-center gap-6">
        <img className="w-56" src="/images/site-logo.svg" alt="Logo" />

        <h1 className="font-bold text-neutral-50 text-6xl mt-8 mb-2">
          Estasiare
        </h1>

        <h2 className="font-bold text-xl text-neutral-50">
          Construindo momentos mágicos!
        </h2>

        <p className="text-white text-lg md:w-[40%] text-center">
          Encontre os melhores fornecedores e planeje o evento dos seus sonhos.
          Cadastre-se e descubra como podemos ajudar a tornar cada momento
          inesquecível.
        </p>

        <ButtonNewEvent className="px-2 py-1 block" />
        <ButtonRegisterProvider className="px-2 py-1 block text-white border-white" />
      </div>
    </header>
  );
}
