import Spinner from '../components/Spinner/Spinner';

export default function Loading() {
  return (
    <div className="absolute left-0 top-0 w-full h-screen flex justify-center items-center">
      <div className="font-bold text-primary text-lg flex flex-col items-center gap-1">
        <Spinner />
        <div>Carregando...</div>
      </div>
    </div>
  );
}
