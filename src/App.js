/** @jsx jsx */

import {jsx, css} from '@emotion/core';
import {useState, useEffect} from 'react';

const appCss = css`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const counterCss = css`
  font-weight: bold;
  font-size: 40px;
`;

function useCounter(max, _isRunning) {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(_isRunning);

  useEffect(() => {
    if (isRunning) {
      const timeout = setTimeout(() => {
        if (counter === max) {
          setIsRunning(false);
        } else {
          setCounter(counter + 1);
        }
      }, 50);

      return () => clearTimeout(timeout) || console.log('clean');
    }
  }, [isRunning, counter]);

  return counter;
}

function App() {
  const [max, setMax] = useState(0);

  return (
    <div css={appCss}>
      <input type="text" value={max} onChange={e => setMax(parseInt(e.target.value) || 0)} />
      <Counter max={max} key={max}/>
    </div>
  );
}

function Counter({max}) {
  const counter = useCounter(max, true);

  return (
    <div css={counterCss}>
      {counter}
    </div>
  );
}

export default App;
