import { combineReducers } from "./redux";

const button = (state = {value: 0}, action) => {
  if (!action) return state;

  if (action.type === "SET_BUTTON_VALUE") {
    return {
      ...state,
      value: action.value,
    }
  }
  return state;
}

const text = (state = {value: ''}, action) => {
  if (!action) return state;

  if (action.type === "SET_TEXT_VALUE") {
    return {
      ...state,
      value: action.value,
    }
  }
  return state;
}

export const rootReducer = combineReducers({
  button,
  text,
});
