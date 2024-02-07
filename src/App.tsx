import usePerson from "./hooks/usePerson";

const App = () => {
  const all = usePerson(1);
  return <pre>{JSON.stringify(all, null, 2)}</pre>;
};

export default App;
