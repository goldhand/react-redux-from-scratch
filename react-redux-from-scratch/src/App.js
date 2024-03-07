import React from 'react';
import { useDispatch, useSelector } from './react-redux';

const Button = ({id}) => {
  const dispatch = useDispatch();
  const value = useSelector(state => state.button.value);
  const handleClick = () => {
    dispatch(() => () => () => ({type: "SET_BUTTON_VALUE", value: value + 1}))
  }
  return (
    <button onClick={handleClick}>{String(value)}</button>
  )
}

const Text = ({id}) => {
  const dispatch = useDispatch();
  const value = useSelector(state => state.text.value);
  const handleChange = (e) => {
    dispatch({type: "SET_TEXT_VALUE", value: e.target.value})
  }
  return (
    <>
      {value}
      <br />
      <input onChange={handleChange} />
    </>
  )
}

export function App() {
  return (
    <>
      <h1>App</h1>
      <Button id="btn1" />
      <Button id="btn2" />
      <Text id="text1" />
    </>
  );
}
