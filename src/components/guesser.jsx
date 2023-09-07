import React, { useEffect, useState } from "react";
import ReactSearchBox from "react-search-box";

const checkSelection = (selected, correct, onSuccess, onFail, onPartial) => {
  if (selected.title === correct.title && selected.artist === correct.artist) {
    onSuccess(selected);
  } else {
    if (
      selected.title === correct.title ||
      selected.artist === correct.artist
    ) {
      onPartial(selected);
    } else {
      onFail(selected);
    }
  }
};

const Guesser = ({ correct, data, onSuccess, onFail, onPartial, onSkip }) => {
  const [guess, setGuess] = useState({});
  const [userInput, setUserInput] = useState("");
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
            onSkip(guess);
          }}
        >
          Skip
        </button>
        <button
          className="guesser-submit"
          onClick={() => {
            setGuess({});
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
