interface ProviderComposerProps {
  components: {
    Component: React.JSXElementConstructor<React.PropsWithChildren<any>>;
    props?: { [key: string]: any };
  }[];
  children: React.ReactNode;
}

const ProviderComposer: React.FC<ProviderComposerProps> = (props) => (
  <>
    {props.components.reduceRight(
      (acc, Comp) => (
        <Comp.Component {...Comp.props}>{acc}</Comp.Component>
      ),
      props.children
    )}
  </>
);

export default ProviderComposer;
