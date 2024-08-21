import Grid from "./grid/Grid.jsx";
import { useEffect, useReducer } from "react";
import { wordleReducer, initialState } from "./reducer/wordleReducer.jsx";

const ENTER_LETTER = "ENTER_LETTER";
const DELETE_LETTER = "DELETE_LETTER";
const SUBMIT_GUESS = "SUBMIT_GUESS";
const RESET_GAME = "RESET_GAME";

export default function App() {
  const [state, dispatch] = useReducer(wordleReducer, initialState);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (state.gameOver === true) return;
      if (event.key === "Backspace") {
        dispatch({ type: DELETE_LETTER });
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        dispatch({ type: ENTER_LETTER, payload: event.key.toUpperCase() });
      } else if (event.key === "Enter") {
        dispatch({ type: SUBMIT_GUESS });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.gameOver]);

  return (
    <>
      <h1 className="mt-3 text-center font-mono text-5xl font-bold tracking-widest">
        wordle.
      </h1>
      <div className="relative">
        <Grid
          guesses={state.guesses}
          answer={state.answer}
          currentGuessAttempt={state.currentGuessAttempt}
          gameOver={state.gameOver}
          hasWon={state.hasWon}
        />
        {state.gameOver && (
          <div className="absolute inset-0 flex items-center justify-center rounded bg-white bg-opacity-80 text-center font-mono text-lg">
            {state.hasWon ? (
              "Great job on today’s puzzle!"
            ) : (
              <>
                Thanks for playing today! <br /> The answer is {state.answer}.
              </>
            )}
          </div>
        )}
      </div>
      {state.gameOver && (
        <div
          className={
            "mx-auto flex h-6 w-16 items-center justify-center rounded bg-green-600 text-center font-mono text-sm tracking-widest text-white hover:cursor-pointer"
          }
          onClick={() => dispatch({ type: RESET_GAME })}
        >
          RESET
        </div>
      )}
    </>
  );
}
