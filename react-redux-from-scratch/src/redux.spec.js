import { createStore } from "./redux";

const reducer = (state = {value: 0}, action) => {
  if (!action) return state;

  if (action.type === "SET_VALUE") {
    return {
      ...state,
      value: action.value,
    }
  }
  return state;
}


describe("createStore", () => {
  it("does not explode", () => {
    expect(createStore).toBeTruthy()
  });
  it("returns state", () => {
    expect(createStore(reducer).getState()).toEqual({value: 0})
  });
  it("updates state", () => {
    const store = createStore(reducer);
    expect(store.getState()).toEqual({value: 0})
    store.dispatch({type: "SET_VALUE", value: 1})
    expect(store.getState()).toEqual({value: 1})
  });
  it("subscribes listeners", () => {
    const store = createStore(reducer);
    const subscriber = jest.fn();
    store.subscribe(subscriber);
    store.dispatch({type: "SET_VALUE", value: 1});
    expect(subscriber).toHaveBeenCalled();
  });
  it("unsubscribes listeners", () => {
    const store = createStore(reducer);
    const subscriber = jest.fn();
    const unsubscribe = store.subscribe(subscriber);
    store.dispatch({type: "SET_VALUE", value: 1});
    expect(subscriber).toHaveBeenCalled();
    unsubscribe();
    store.dispatch({type: "SET_VALUE", value: 2});
    expect(subscriber.calls.length).toBe(1);
  });
})
