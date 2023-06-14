import Button from "./components/Button";

function App() {
  return (
    <div>
      <Button onClick={() => console.log('clicked')}>
        Click Me
      </Button>
    </div>
  );
}

export default App;
