import ButtonRegister from '../ButtonRegister/ButtonRegister';

export default function HomeHeader() {
  return (
    <header className="w-full h-screen before:bg-cover before:bg-top before:bg-[url(/images/banner-home.jpg)] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:brightness-50">
      <div className="absolute w-full h-screen flex flex-col items-center justify-center gap-2">
        <img className="w-56" src="/images/site-logo.svg" alt="Logo" />

        <h1 className="font-bold text-neutral-50 text-6xl mt-8 mb-2">Estasiare</h1>

        <h2 className="font-bold text-neutral-50">
          Construindo momentos mágicos!
        </h2>

        <ButtonRegister className="px-2 py-1 block md:hidden mt-4" />
      </div>
    </header>
  );
}
