import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware,createStore } from './redux';
import { rootReducer } from './reducer';
import { App } from './App';
import { StoreProvider } from './react-redux';

const logger = (store) => (next) => (action) => {
  console.log('action', action.type)
  console.log('prevState', JSON.stringify(store.getState(), null, 2))
  const result = next(action);
  console.log('nextState', JSON.stringify(store.getState(), null, 2))
  return result;
}

const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return store.dispatch(action());
  } else {
    return next(action);
  }
}

const store = createStore(rootReducer);
const enhancedStore = applyMiddleware(store, thunk, logger);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider store={enhancedStore}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
