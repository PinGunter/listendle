import React, { useEffect, useRef, useState } from "react";
import { fetchSong } from "../services/fetchSong";
import { Line } from "rc-progress";
const timeStamps = [1, 2, 5, 8, 12, 16];
const MaxDuration = 16;
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

const handleTimeUpdate = (
  event,
  audioRef,
  updateAudio,
  updateProgress,
  attemptIndex
) => {
  if (withinRange(event.target.currentTime, timeStamps[attemptIndex])) {
    pauseAudio(audioRef, updateAudio);
    console.log(event.target.currentTime, " - ", timeStamps[attemptIndex]);
  }
  updateProgress((event.target.currentTime / MaxDuration) * 100);
};

const Player = ({ songData, attemptIndex }) => {
  const [song, setSong] = useState({ loaded: false });
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef();
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
            onTimeUpdate={(e) =>
              handleTimeUpdate(
                e,
                audioRef,
                setPlaying,
                setProgress,
                attemptIndex
              )
            }
            onEnded={() => pauseAudio(audioRef, setPlaying)}
          />
          <Line percent={progress} strokeWidth={5} />
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
