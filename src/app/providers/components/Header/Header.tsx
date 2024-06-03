interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <header className="w-full h-[50vh] bg-[url(/images/providers/header-banner.jpg)] bg-cover bg-center flex flex-col items-center justify-center gap-4 mt-4">
      <h1 className="font-bold text-neutral-50 text-5xl mt-8 mb-2">
        Encontre Fornecedores para o Seu Evento
      </h1>

      <p className="text-lg text-white text-center md:max-w-[40%]">
        Explore e filtre fornecedores de confiança para seu evento. Encontre
        contatos de fotógrafos, decoradores, músicos e muitos outros
        profissionais para tornar seu evento inesquecível!
      </p>
    </header>
  );
}
