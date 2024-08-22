import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_apiKEY,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  projectId: "wordle-ellie",
  storageBucket: "wordle-ellie.appspot.com",
  messagingSenderId: "218107262583",
  appId: "1:218107262583:web:e915b99b8bcd00bbfe3872",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getRandomWord(db) {
  // 獲取 'words' 集合的引用
  const wordsCollectionRef = collection(db, "words");

  // 取得所有資料
  const allWordsSnapshot = await getDocs(wordsCollectionRef);
  const totalWordsNumber = allWordsSnapshot.size;

  // random index
  const randomIndex = Math.floor(Math.random() * totalWordsNumber);

  // 找到這個索引對應的answer
  const randomAnswerSnapshot = allWordsSnapshot.docs[randomIndex];

  const randomAnswer = randomAnswerSnapshot.data().answer.toUpperCase();
  console.log("The answer:", randomAnswer);
  return randomAnswer;
}

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
  answer: "",
  gameOver: false,
  hasWon: false,
};

export const ActionTypes = {
  SET_ANSWER: "SET_ANSWER",
  ENTER_LETTER: "ENTER_LETTER",
  DELETE_LETTER: "DELETE_LETTER",
  SUBMIT_GUESS: "SUBMIT_GUESS",
  RESET_GAME: "RESET_GAME",
};

const LAST_POSITION = 4;
const TOTAL_CHANCE = 5;

export function wordleReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_ANSWER: {
      return {
        ...state,
        answer: action.payload,
      };
    }
    case ActionTypes.ENTER_LETTER: {
      //用戶輸入時即時記錄
      if (state.gameOver === true) return state;
      const newGuesses = JSON.parse(JSON.stringify(state.guesses));
      if (state.guesses[state.currentGuessAttempt][LAST_POSITION] === "")
        newGuesses[state.currentGuessAttempt][state.currentGuessPosition] =
          action.payload;
      let newGuessPosition;
      // console.log(newGuesses);
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
      console.log(state.answer);
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
