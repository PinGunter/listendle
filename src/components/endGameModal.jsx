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
    open(success, attempts) {
      setModalData({ success, attempts });
      modalRef.current.showModal();
    },
  }));
  return (
    <dialog ref={modalRef} className="dialog">
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
    </dialog>
  );
});

export default EndGameModal;
