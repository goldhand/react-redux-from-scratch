import React from 'react';

const ProviderContext = React.createContext({
  getState: () => null,
  dispatch: () => undefined,
  subscribe: () => () => undefined,
});

export const StoreProvider = ({children, store}) => {
  return (
    <ProviderContext.Provider value={store}>
      {children}
    </ProviderContext.Provider>
  )
}

export const useDispatch = () => {
  const store = React.useContext(ProviderContext);
  return (action) => {
    store.dispatch(action);
  }
}

export const useSelector = (selector, compare = (prev, next) => prev !== next) => {
  const store = React.useContext(ProviderContext);
  // value is the result of calling the selector with store.getState()
  const value = selector(store.getState());

  // used to compare prev to next state
  const [{ prev }, forceUpdate] = React.useState({
    prev: {
      value,
      getState: store.getState,
    }
  })
  // forces a render when state changes
  React.useEffect(() => {
    prev.value = value;
    prev.getState = store.getState;
    forceUpdate({ prev })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // trigger update when selector(store.getState()) returns a new value
    value,
  ])

  // subscribe to redux
  React.useEffect(() => {
    const handleStoreChange = () => {
      // compare prev to next state
      if (compare(prev.value, selector(prev.getState()))) {
        prev.value = selector(prev.getState())
        forceUpdate({ prev });
      }
    }
    // return the unsubscribe function
    return store.subscribe(handleStoreChange)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.subscribe])
  return value;
}
