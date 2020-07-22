import { useReducer, useEffect } from "react";

function useLocalPersistedReducer(
  reducer,
  initialArg,
  storageKey,
  init = null
) {
  const hookVars = useReducer(reducer, initialArg, (initialArg) => {
    const persisted = JSON.parse(localStorage.getItem(storageKey));
    return persisted !== null
      ? persisted
      : init !== null
      ? init(initialArg)
      : initialArg;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(hookVars[0]));
  }, [storageKey, hookVars[0]]);

  return hookVars;
}

export { useLocalPersistedReducer };
