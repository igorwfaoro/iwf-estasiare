import Button from '../../../../components/Button/Button';

interface AboutProps {}

export default function About({}: AboutProps) {
  return (
    <section>
      <Button href="/" theme="primary-outline" size="small">
        Conheça o Estasiare
      </Button>
    </section>
  );
}
