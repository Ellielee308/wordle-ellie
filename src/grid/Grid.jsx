import PropTypes from "prop-types";

export default function Grid({ guesses, answer, currentGuessAttempt }) {
  return (
    <div className="mx-auto my-8 flex flex-col items-center">
      {guesses.map((guess, guessIndex) => {
        return (
          <div key={guessIndex} className="mb-3 flex flex-row last:mb-0">
            {guess.map((letter, letterIndex) => {
              let bgColorClass = "";
              let textColorClass = "text-white";
              let borderClass = "border-2 border-solid border-gray-300";

              if (currentGuessAttempt > guessIndex) {
                if (letter === answer[letterIndex]) {
                  bgColorClass = "bg-green-500";
                  borderClass = "";
                } else if (answer.includes(letter)) {
                  bgColorClass = "bg-yellow-500";
                  borderClass = "";
                } else {
                  bgColorClass = "bg-gray-400";
                  borderClass = "";
                }
              } else if (letter !== "") {
                bgColorClass = "border-gray-600";
                textColorClass = ""; //不需要白色字體，清空
              }

              return (
                <div
                  key={letterIndex}
                  className={`mr-3 flex h-12 w-12 items-center justify-center rounded text-xl font-bold last:mr-0 ${bgColorClass} ${textColorClass} ${borderClass}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

Grid.propTypes = {
  guesses: PropTypes.arrayOf(PropTypes.array),
  answer: PropTypes.string,
  currentGuessAttempt: PropTypes.number,
};
