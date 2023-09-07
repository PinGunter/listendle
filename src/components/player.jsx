import React, { useEffect, useRef, useState } from "react";
import { fetchSong } from "../services/fetchSong";
import ProgressBar from "progressbar.js";

const timeStamps = [1, 2, 5, 8, 12, 16];

const playAudio = (ref, setPlaying) => {
  ref.current.play();
  setPlaying(true);
};

const pauseAudio = (ref, setPlaying) => {
  ref.current.pause();
  ref.current.currentTime = 0;
  setPlaying(false);
};

const withinRange = (currentTime, expected) => {
  return currentTime >= expected - 0.15 && currentTime <= expected + 0.15;
};

const handleTimeUpdate = (event, audioRef, progressRef) => {
  if (withinRange(event.target.currentTime, 1)) {
    console.log("1 segundo");
  } else if (withinRange(event.target.currentTime, 5)) {
    console.log("5 segundos");
  } else if (withinRange(event.target.currentTime, 10)) {
    console.log("10 segundos");
  } else if (withinRange(event.target.currentTime, 15)) {
    console.log("15 segundos");
  } else if (withinRange(event.target.currentTime, 30)) {
    console.log("30 segundos");
  }

  progressRef.current.value =
    event.target.currentTime / audioRef.current.duration;
};

const Player = ({ songData }) => {
  const [song, setSong] = useState({ loaded: false });
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();
  const progressRef = useRef();
  let progressLine;
  useEffect(() => {
    if (songData.id === undefined) return;
    fetchSong(songData.id, (data) => setSong({ ...data, loaded: true }));
  }, [songData]);
  useEffect(() => console.log(song), [song]);
  return (
    <div className="player">
      {song.loaded ? (
        <>
          <audio
            ref={audioRef}
            src={song.preview}
            className="audio-player"
            onTimeUpdate={(e) => handleTimeUpdate(e, audioRef, progressRef)}
            onEnded={() => pauseAudio(audioRef, setPlaying)}
          />
          <div id="progress" />
          {playing ? (
            <div
              className="player-play"
              onClick={() => pauseAudio(audioRef, setPlaying)}
            >
              <span className="fa-solid fa-pause"></span>
            </div>
          ) : (
            <div
              className="player-play"
              onClick={() => playAudio(audioRef, setPlaying)}
            >
              <span className="fa-solid fa-play"></span>
            </div>
          )}
        </>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};

export default Player;
