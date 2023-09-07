import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

const maxAttempts = 6;

const AttemptList = forwardRef(
  ({ endGame, attemptIndex, setAttemptIndex }, ref) => {
    const [end, setEnd] = useState(false);
    const [win, setWin] = useState(false);
    const [attempts, setAttempts] = useState([]);

    useEffect(() => {
      if (attemptIndex === maxAttempts && !end) {
        endGame({ success: false, attempts: attemptIndex });
        setEnd(true);
      }
    }, [attemptIndex, end, endGame]);

    useEffect(() => {
      if (win) {
        endGame({ success: true, attempts: attemptIndex });
        setEnd(true);
      }
    }, [attemptIndex, endGame, win]);

    useImperativeHandle(ref, () => ({
      skip(data) {
        setAttempts((attempts) => [
          ...attempts,
          { state: "skip", text: `Skipped` },
        ]);
        setAttemptIndex((att) => att + 1);
      },
      success(data) {
        setAttempts((attempts) => [
          ...attempts,
          { state: "success", text: `${data.title} - ${data.artist}` },
        ]);
        setAttemptIndex((att) => att + 1);
        setWin(true);
      },
      fail(data) {
        setAttempts((attempts) => [
          ...attempts,
          { state: "fail", text: `${data.title} - ${data.artist}` },
        ]);
        setAttemptIndex((att) => att + 1);
      },
      partial(data) {
        setAttempts((attempts) => [
          ...attempts,
          { state: "partial", text: `${data.title} - ${data.artist}` },
        ]);
        setAttemptIndex((att) => att + 1);
      },
    }));
    return (
      <div className="attempts">
        {Array.from({ length: maxAttempts }).map((_a, index) => (
          <span
            key={index}
            className={`attempt${
              index >= attemptIndex ? "-disabled" : ""
            } attempt-${attempts[index]?.state}`}
          >
            {attempts[index]?.text}
          </span>
        ))}
      </div>
    );
  }
);

export default AttemptList;
