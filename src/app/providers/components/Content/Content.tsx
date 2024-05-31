import { useProviderSearchContext } from '../../contexts/ProviderSearchContext';
import Provider from './components/Provider/Provider';

interface ContentProps {}

export default function Content({}: ContentProps) {
  const {
    providersResult: { data: providers, totalResults },
    providersIsLoaded,
    providersIsLoading
  } = useProviderSearchContext();

  const totalResultsText = `${totalResults} fornecedor${(totalResults || 0) > 1 ? 'es' : ''} encontrado${(totalResults || 0) > 1 ? 's' : ''}`;

  if (providersIsLoaded && !providersIsLoading && !providers.length) {
    return (
      <div className="text-xl font-bold text-center p-4">
        Nenhum fornecedor encontrado 😥
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {!!totalResults && <div className="text-sm">{totalResultsText}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {providers.map((provider) => (
          <Provider provider={provider} />
        ))}
      </div>
    </div>
  );
}
