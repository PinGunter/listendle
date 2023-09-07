import React, { useEffect, useRef, useState } from "react";
import AttemptList from "./components/attemptList";
import Guesser from "./components/guesser";
import "./App.css";
import songs from "./data/songs.json";
import EndGameModal from "./components/endGameModal";
import Player from "./components/player";
import Instructions from "./components/initialModal";

function App() {
  const attemptsRef = useRef();
  const modalRef = useRef();
  const [selected, setSelected] = useState(-1);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    setSelected(songs[Math.floor(Math.random() * songs.length)]);
  }, []);
  useEffect(() => console.log(selected), [selected]);
  return (
    <>
      <div className="header">
        <h1>Listendle</h1>
      </div>
      <div className="app">
        <Instructions startGame={() => setStarted(true)} />
        <AttemptList ref={attemptsRef} endGame={modalRef.current?.open} />
        <Player song={selected} />
        <Guesser
          data={songs}
          correct={selected}
          onSuccess={attemptsRef.current?.success}
          onFail={attemptsRef.current?.fail}
          onPartial={attemptsRef.current?.partial}
          onSkip={attemptsRef.current?.skip}
        />
        <EndGameModal ref={modalRef} song={selected} />
      </div>
    </>
  );
}

export default App;
