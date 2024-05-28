import Accordion from '../../../../../components/Accordion/Accordion';
import Button from '../../../../../components/Button/Button';
import ProviderAccountProvider, {
  useProviderContext
} from './contexts/ProviderAccountProvider';

function ProviderComponent() {
  const {
    handleFormSubmit,
    handleFormError,
    form: { handleSubmit },
    isRegister,
    providerAccordionRef,
    providerAccordionItems
  } = useProviderContext();

  const accordionItems = Object.values(providerAccordionItems);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
      className="space-y-5"
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
    >
      {!isRegister && (
        <div className="flex justify-end md:hidden">
          <Button
            type="submit"
            theme="primary-outline"
            className="w-full md:w-auto"
          >
            Salvar
          </Button>
        </div>
      )}

      <Accordion ref={providerAccordionRef} defaultOpenIndex={0}>
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
