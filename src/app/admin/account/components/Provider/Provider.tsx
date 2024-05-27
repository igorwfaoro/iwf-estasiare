import Accordion from '../../../../../components/Accordion/Accordion';
import Button from '../../../../../components/Button/Button';
import Categories from './components/Categories/Categories';
import General from './components/General/General';
import ProviderAccountProvider, {
  useProviderContext
} from './contexts/ProviderAccountProvider';

function ProviderComponent() {
  const { handleFormSubmit } = useProviderContext();

  const accordionItems = [
    {
      header: 'Geral',
      content: <General />
    },
    {
      header: 'Categorias',
      content: <Categories />
    }
  ];

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5">
      <Accordion defaultOpenIndex={0}>
        {accordionItems.map((it) => (
          <Accordion.Item key={it.header}>
            <Accordion.ItemHeader>{it.header}</Accordion.ItemHeader>
            <Accordion.ItemContent>{it.content}</Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion>

      <div className="flex justify-end">
        <Button type="submit" className="w-full md:w-auto">
          Salvar
        </Button>
      </div>
    </form>
  );
}

interface ProviderProps {
  isRegister?: boolean;
}

export default function Provider({ isRegister }: ProviderProps) {
  return (
    <ProviderAccountProvider isRegister={isRegister}>
      <ProviderComponent />
    </ProviderAccountProvider>
  );
}
