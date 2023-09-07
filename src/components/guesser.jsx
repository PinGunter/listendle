import React, { useEffect, useState } from "react";
import ReactSearchBox from "react-search-box";
const timeStamps = [1, 1, 3, 3, 4, 4];

const checkSelection = (selected, correct, onSuccess, onFail, onPartial) => {
  if (selected.title === correct.title && selected.artist === correct.artist) {
    onSuccess(selected);
  } else if (
    selected.title === correct.title ||
    selected.artist === correct.artist
  ) {
    onPartial(selected);
  } else {
    onFail(selected);
  }
};

const Guesser = ({ correct, data, onSuccess, onFail, onPartial, onSkip }) => {
  const [guess, setGuess] = useState({});
  const [userInput, setUserInput] = useState("");
  const [attempts, setAttempts] = useState(0);

  useEffect(() => console.log(attempts), [attempts]);

  return (
    <div className="guesser">
      <ReactSearchBox
        placeholder="Look for a song"
        value={userInput}
        onChange={setUserInput}
        data={data}
        onSelect={({ item }) => {
          setGuess(item);
        }}
        autoFocus
        inputBackgroundColor="#fcfcfc"
        inputBorderColor="#ccc"
        inputFontSize="16px"
        inputHeight="53px"
        fuseConfigs={{ threshold: 0.35 }}
      />
      <div className="guesser-buttons">
        <button
          className="guesser-skip"
          onClick={() => {
            setGuess("");
            setAttempts((attempts) => attempts + 1);
            onSkip(guess);
          }}
        >
          Skip +{timeStamps[attempts] || timeStamps[attempts - 1]}s
        </button>
        <button
          className="guesser-submit"
          onClick={() => {
            setGuess({});
            setAttempts((attempts) => attempts + 1);
            checkSelection(guess, correct, onSuccess, onFail, onPartial);
          }}
          disabled={!userInput}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Guesser;
