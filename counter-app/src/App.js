import { useState } from 'react';
import Button from './Button';
import './index.css';

function App() {
  const [counter, setCounter] = useState(0);
  const appName = 'Counter App';

  return (
    <div className="App">
      <h2>{ appName }</h2>
      <p>{counter}</p>
      <Button counter={ counter } setCounter={ setCounter }/>
    </div>
  );
}

export default App;
