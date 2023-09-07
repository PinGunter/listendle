import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const EndGameModal = forwardRef((props, ref) => {
  const modalRef = useRef();
  const [modalData, setModalData] = useState({
    success: false,
    attempts: -1,
  });
  useImperativeHandle(ref, () => ({
    open({ success, attempts }) {
      setModalData({ success, attempts });
      modalRef.current.showModal();
    },
  }));
  return (
    <dialog ref={modalRef} className="dialog" onClick={() => modalRef.current.close()}>
      <div className="dialog-content">
        <div className="dialog-text">
          <h1>Game Ended!</h1>
          {modalData.success ? (
            <h2>Congratulations!</h2>
          ) : (
            <h2>Maybe next time!</h2>
          )}
          <div className="song-info">
            <span>{`${props.song.title} - ${props.song.artist}`}</span>
          </div>
          <span>Attempts: {`${modalData.attempts || 6} / 6`}</span>
          <div className="dialog-buttons">
            <button
              className="dialog-button"
              onClick={() => alert("Not implemented yet")}
            >
              <i className="fa-solid fa-arrow-rotate-left"></i>              Play Again
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
});

export default EndGameModal;
