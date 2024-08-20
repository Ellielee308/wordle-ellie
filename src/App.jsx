import Grid from "./grid/Grid.jsx";
import { useEffect, useReducer } from "react";
import { wordleReducer, initialState } from "./reducer/wordleReducer.jsx";

const ENTER_LETTER = "ENTER_LETTER";
const DELETE_LETTER = "DELETE_LETTER";
const SUBMIT_GUESS = "SUBMIT_GUESS";

export default function App() {
  const [state, dispatch] = useReducer(wordleReducer, initialState);
  console.log(initialState);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace") {
        dispatch({ type: DELETE_LETTER });
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        dispatch({ type: ENTER_LETTER, payload: event.key.toUpperCase() });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <h1 className="mt-3 text-center font-mono text-5xl font-bold tracking-widest">
        wordle.
      </h1>
      <Grid guesses={state.guesses} />
    </>
  );
}
