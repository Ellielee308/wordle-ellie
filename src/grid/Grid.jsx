import PropTypes from "prop-types";

export default function Grid({ guesses }) {
  return (
    <div className="mx-auto my-8 flex flex-col items-center">
      {guesses.map((guess, guessIndex) => (
        <div key={guessIndex} className="mb-4 flex flex-row last:mb-0">
          {guess.map((letter, letterIndex) => (
            <div
              key={letterIndex}
              className="border-gray-5000 mr-4 flex h-12 w-12 items-center justify-center border-2 border-solid text-3xl last:mr-0"
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

Grid.propTypes = {
  guesses: PropTypes.arrayOf(PropTypes.array),
};
