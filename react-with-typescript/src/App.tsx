import ListGroup from "./components/ListGroup";

function App() {
  let items = [
    'New York',
    'San Francisco',
    'Tokyo',
    'London',
    'Paris' 
  ];

  const handleSelectItem = (item: string) => {
    console.log(item);
  }

  // In react, Each component has it's own state. So they will be independent of each other. For example: Each `ListGroup` is going to have it's own state.
  return <div><ListGroup heading="Cities" items={items} onSelectItem={handleSelectItem} /></div>;
}

export default App;
