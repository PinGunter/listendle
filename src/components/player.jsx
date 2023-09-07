import React, { useState } from "react";

const Player = ({ songData }) => {
  const [song, setSong] = useState({ loaded: false });
  return (
    <div className="player">
      {song.loaded ? songData.title : <span className="loader"></span>}
    </div>
  );
};

export default Player;
