

export const createStore = (reducer, enhancer) => {

  let state = reducer();
  let subscribers = [];

  const getState = () => state;

  const subscribe = (subscriber, id = '') => {
    subscribers = [...subscribers, subscriber];
    return () => {
      subscribers = subscribers.filter(s => s !== subscriber)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach(subscriber => subscriber());
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}

export const applyMiddleware = (store, ...middlewares) => {
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch)
  });
  return store;
}

export const combineReducers = (reducers = {}) => (state = {}, action) =>
  Object.keys(reducers).reduce((nextState, reducerKey) => {
    nextState[reducerKey] = reducers[reducerKey](state[reducerKey], action);
    return nextState;
  }, {});
