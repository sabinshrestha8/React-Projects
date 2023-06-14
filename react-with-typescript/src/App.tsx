import Alert from "./components/Alert";

function App() {
  return (
    <div>
      {/* <Alert text="Hello World" /> */}
      <Alert>
        Hello <span>World</span> {/* passing text, html content as a child to this component */}
      </Alert>
    </div>
  );
}

export default App;
