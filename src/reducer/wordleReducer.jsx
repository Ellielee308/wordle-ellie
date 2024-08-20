export const initialState = {
  guesses: [
    ["", "", "", "", ""], // 第一次猜測
    ["", "", "", "", ""], // 第二次猜測
    ["", "", "", "", ""], // 第三次猜測
    ["", "", "", "", ""], // 第四次猜測
    ["", "", "", "", ""], // 第五次猜測
    ["", "", "", "", ""], // 第六次猜測
  ],
  currentGuessIndex: 0,
  currentGuessPosition: 0,
  answer: "PIXIE", //pixie
  attempt: 0, //紀錄已提交幾個答案
  gameOver: false,
  feedback: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
};

const ENTER_LETTER = "ENTER_LETTER";
const DELETE_LETTER = "DELETE_LETTER";
const SUBMIT_GUESS = "SUBMIT_GUESS";

export function wordleReducer(state, action) {
  switch (action.type) {
    case ENTER_LETTER: {
      //用戶輸入時即時記錄
      const newGuesses = JSON.parse(JSON.stringify(state.guesses));
      if (state.guesses[state.currentGuessIndex][4] === "")
        newGuesses[state.currentGuessIndex][state.currentGuessPosition] =
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
        state.guesses[state.currentGuessIndex][state.currentGuessPosition] !==
          "" //最後一格已填入字母
      ) {
        newGuesses[state.currentGuessIndex][state.currentGuessPosition] = "";
      } else if (
        (state.currentGuessPosition === 4 &&
          state.guesses[state.currentGuessIndex][state.currentGuessPosition] ===
            "") ||
        (state.currentGuessPosition < 4 && state.currentGuessPosition > 0)
      ) {
        newGuesses[state.currentGuessIndex][state.currentGuessPosition - 1] =
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
      const newAttempt = state.attempt + 1;
      const gameOver =
        newAttempt >= 6 ||
        state.guesses[state.currentGuessIndex].join("") === state.answer;
      return {
        ...state,
        attempt: state.attempt + 1,
        currentGuessIndex: state.currentGuessIndex + 1,
        currentGuessPosition: 0,
        gameOver: gameOver,
      };
    }
    default:
      return state;
  }
}
