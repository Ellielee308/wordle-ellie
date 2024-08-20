import Grid from "./grid/Grid.jsx";
import React, { useReducer } from "react";
import { wordleReducer, initialState } from "./reducer/wordleReducer.jsx";

function App() {
  const [state, dispatch] = useReducer(wordleReducer, initialState);
  return <Grid />;
}

export default App;
