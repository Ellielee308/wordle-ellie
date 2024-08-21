export const initialState = {
  guesses: [
    ["", "", "", "", ""], // 第一次猜測
    ["", "", "", "", ""], // 第二次猜測
    ["", "", "", "", ""], // 第三次猜測
    ["", "", "", "", ""], // 第四次猜測
    ["", "", "", "", ""], // 第五次猜測
    ["", "", "", "", ""], // 第六次猜測
  ],
  currentGuessAttempt: 0,
  currentGuessPosition: 0,
  answer: "DITTO",
  gameOver: false,
  hasWon: false,
};

export const ActionTypes = {
  ENTER_LETTER: "ENTER_LETTER",
  DELETE_LETTER: "DELETE_LETTER",
  SUBMIT_GUESS: "SUBMIT_GUESS",
  RESET_GAME: "RESET_GAME",
};

const LAST_POSITION = 4;
const TOTAL_CHANCE = 5;

export function wordleReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ENTER_LETTER: {
      //用戶輸入時即時記錄
      if (state.gameOver === true) return state;
      const newGuesses = JSON.parse(JSON.stringify(state.guesses));
      if (state.guesses[state.currentGuessAttempt][LAST_POSITION] === "")
        newGuesses[state.currentGuessAttempt][state.currentGuessPosition] =
          action.payload;
      let newGuessPosition;
      console.log(newGuesses);
      if (state.currentGuessPosition <= 3) {
        newGuessPosition = state.currentGuessPosition + 1;
      } else {
        newGuessPosition = LAST_POSITION;
      }
      return {
        ...state,
        guesses: newGuesses,
        currentGuessPosition: newGuessPosition,
      };
    }
    case ActionTypes.DELETE_LETTER: {
      if (state.gameOver === true) return state;
      const newGuesses = JSON.parse(JSON.stringify(state.guesses));
      let newGuessPosition = state.currentGuessPosition;
      if (
        state.currentGuessPosition === LAST_POSITION &&
        state.guesses[state.currentGuessAttempt][state.currentGuessPosition] !==
          "" //最後一格已填入字母
      ) {
        newGuesses[state.currentGuessAttempt][state.currentGuessPosition] = "";
      } else if (
        (state.currentGuessPosition === LAST_POSITION &&
          state.guesses[state.currentGuessAttempt][
            state.currentGuessPosition
          ] === "") ||
        (state.currentGuessPosition < LAST_POSITION &&
          state.currentGuessPosition > 0)
      ) {
        newGuesses[state.currentGuessAttempt][state.currentGuessPosition - 1] =
          "";
        newGuessPosition = state.currentGuessPosition - 1;
      }
      console.log(newGuesses);
      return {
        ...state,
        guesses: newGuesses,
        currentGuessPosition: newGuessPosition,
      };
    }
    case ActionTypes.SUBMIT_GUESS: {
      if (state.gameOver === true) return state;
      const gameOver =
        (state.currentGuessAttempt === TOTAL_CHANCE &&
          state.guesses[state.currentGuessAttempt][LAST_POSITION] !== "") ||
        state.guesses[state.currentGuessAttempt].join("") === state.answer;
      let newcurrentGuessAttempt = state.currentGuessAttempt;
      let newCurrentGuessPosition = state.currentGuessPosition;
      if (state.guesses[state.currentGuessAttempt][LAST_POSITION] !== "") {
        newcurrentGuessAttempt += 1;
        newCurrentGuessPosition = 0;
      }
      let hasWon;
      if (state.guesses[state.currentGuessAttempt].join("") === state.answer) {
        hasWon = true;
      }
      console.log(gameOver);
      return {
        ...state,
        currentGuessAttempt: newcurrentGuessAttempt,
        currentGuessPosition: newCurrentGuessPosition,
        gameOver,
        hasWon,
      };
    }
    case ActionTypes.RESET_GAME: {
      return initialState;
    }
    default:
      return state;
  }
}
