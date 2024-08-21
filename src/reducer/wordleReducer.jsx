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

const ENTER_LETTER = "ENTER_LETTER";
const DELETE_LETTER = "DELETE_LETTER";
const SUBMIT_GUESS = "SUBMIT_GUESS";
const RESET_GAME = "RESET_GAME";

export function wordleReducer(state, action) {
  switch (action.type) {
    case ENTER_LETTER: {
      //用戶輸入時即時記錄
      const newGuesses = JSON.parse(JSON.stringify(state.guesses));
      if (state.guesses[state.currentGuessAttempt][4] === "")
        newGuesses[state.currentGuessAttempt][state.currentGuessPosition] =
          action.payload;
      let newGuessPosition;
      console.log(newGuesses);
      if (state.currentGuessPosition <= 3) {
        newGuessPosition = state.currentGuessPosition + 1;
      } else {
        newGuessPosition = 4;
      }
      return {
        ...state,
        guesses: newGuesses,
        currentGuessPosition: newGuessPosition,
      };
    }
    case DELETE_LETTER: {
      const newGuesses = JSON.parse(JSON.stringify(state.guesses));
      let newGuessPosition = state.currentGuessPosition;
      if (
        state.currentGuessPosition === 4 &&
        state.guesses[state.currentGuessAttempt][state.currentGuessPosition] !==
          "" //最後一格已填入字母
      ) {
        newGuesses[state.currentGuessAttempt][state.currentGuessPosition] = "";
      } else if (
        (state.currentGuessPosition === 4 &&
          state.guesses[state.currentGuessAttempt][
            state.currentGuessPosition
          ] === "") ||
        (state.currentGuessPosition < 4 && state.currentGuessPosition > 0)
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
    case SUBMIT_GUESS: {
      const gameOver =
        state.currentGuessAttempt == 5 ||
        state.guesses[state.currentGuessAttempt].join("") === state.answer;
      let newcurrentGuessAttempt = state.currentGuessAttempt;
      let newCurrentGuessPosition = state.currentGuessPosition;
      if (state.guesses[state.currentGuessAttempt][4] !== "") {
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
        gameOver: gameOver,
        hasWon: hasWon,
      };
    }
    case RESET_GAME: {
      return {
        ...state,
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
        gameOver: false,
        hasWon: false,
      };
    }
    default:
      return state;
  }
}
