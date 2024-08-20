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
};

export function wordleReducer(state, action) {
  switch (action.type) {
    case "enter":
      // 更新 guesses 陣列中的當前猜測
      const newGuesses = [...state.guesses];
      newGuesses[state.currentGuessIndex] = action.payload;
      return {
        ...state,
        guesses: newGuesses,
        currentGuessIndex: state.currentGuessIndex + 1,
      };
    case "delete":
      return {};
    case "submit":
      return {};
    default:
      return state;
  }
}
