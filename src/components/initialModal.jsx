import React, { useEffect, useState } from "react";

const Instructions = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("visited")) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);
  return (
    <dialog
      open={open}
      onClick={() => {
        setOpen(false);
        localStorage.setItem("visited", true);
      }}
      className="dialog-inst"
    >
      <div className="dialog-content">
        <div className="dialog-text">
          <h1>Instructions</h1>
          <p>Guess the song by typing the name of the song or the artist.</p>
          <p>Click on the "Skip" button to skip the song.</p>
          <p>Click on the "Submit" button to submit your guess.</p>
        </div>
        <button className="dialog-button">Start</button>
      </div>
    </dialog>
  );
};

export default Instructions;
