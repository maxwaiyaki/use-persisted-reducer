```js
import { useReducer, useEffect } from 'react'

// Usage
const initialState = {count: 0};
  
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useLocallyPersistedReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

// Hook
function useLocallyPersistedReducer(reducer, initialArg, storageKey, init = null) {
  const hookVars = useReducer(reducer, initialArg, (initialArg) => {
    const persisted = JSON.parse(localStorage.getItem(storageKey))
    return persisted !== null
      ? persisted
      : init !== null ? init(initialArg) : initialArg
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(hookVars[0]))
  }, [storageKey, hookVars[0]])

  return hookVars
}

```