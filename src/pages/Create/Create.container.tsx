import CreateComponent from './Create.component';

const Create: React.FC = (): JSX.Element => {
  const handleHeaderClick = (mode: String) => {
    console.log({ mode });
  };

  return <CreateComponent {...{ handleHeaderClick }} />;
};

export default Create;
