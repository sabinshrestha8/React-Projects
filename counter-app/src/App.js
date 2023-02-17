import { useState } from 'react';
import Button from './Button';
import './index.css';

function App() {
  const [counter, setCounter] = useState(0);
  const appName = 'Counter App';
  /* Since buttons array isn't changing, it can be defined outside
  the component can be passed as a prop to the Button component. */
  const buttons = ['+', 'reset', '-'];

  return (
    <div className="App">
      <h2>{ appName }</h2>
      <p>{counter}</p>
      <Button counter={ counter } setCounter={ setCounter } buttons={ buttons } />
    </div>
  );
}

export default App;
