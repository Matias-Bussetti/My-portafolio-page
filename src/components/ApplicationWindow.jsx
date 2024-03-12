import { useEffect, useRef, useState } from "react";
import { usePositionAndSize } from "../hooks/usePositionAndSize";

const ApplicationWindow = ({
  name,
  startPostion = { x: 10, y: 10 },
  startSize = { w: 200, h: 100 },
  children,
}) => {
  const [showWindow, setShowWindow] = useState(false);

  const isClosing = useRef(false);

  function closeWindow(e) {
    setShowWindow(false);
    isClosing.current = true;
    setTimeout(() => {
      handlePosition.onClose(e);
      handleSize.onClose(e);
      isClosing.current = false;
    }, 500);
  }

  function openWindow() {
    if (!isClosing.current) {
      setTimeout(() => {
        setShowWindow(true);
      }, Math.floor(Math.random() * 1000));
    }
  }

  function expandWindow(e) {
    handlePosition.onFullScreen(e);
    handleSize.onFullScreen(e);
  }

  const { container, position, handlePosition, size, handleSize } =
    usePositionAndSize(startPostion, startSize);

  return (
    <>
      <button onClick={openWindow}>{name}</button>

      <div
        ref={container}
        className={`window ${showWindow ? "show" : "hide"}`}
        style={{
          left: position.x + "px",
          top: position.y + "px",

          width: size.w + "px",
          height: size.h + "px",
        }}
      >
        <div
          className="top-bar"
          onMouseDown={handlePosition.onMouseDown}
          onMouseMove={handlePosition.onMouseMove}
          onMouseUp={handlePosition.onMouseUp}
          onMouseLeave={handlePosition.onMouseUp}
          onTouchStart={handlePosition.onTouchStart}
          onTouchMove={handlePosition.onTouchMove}
          onTouchEnd={handlePosition.onTouchEnd}
        >
          <div className="app-title">
            <h2>{name}</h2>
          </div>
          <button className="close" onClick={expandWindow}>
            <span className="material-symbols-outlined">open_in_full</span>
          </button>
          <button className="close" onClick={closeWindow}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="content-container">
          {children}
          <div className="bottom-bar"></div>
        </div>
        <button
          className="window-spand-btn"
          onMouseDown={handleSize.onMouseDown}
          onMouseMove={handleSize.onMouseMove}
          onMouseUp={handleSize.onMouseUp}
          onMouseLeave={handleSize.onMouseUp}
          onTouchStart={handleSize.onTouchStart}
          onTouchMove={handleSize.onTouchMove}
          onTouchEnd={handleSize.onTouchEnd}
        ></button>
      </div>
    </>
  );
};

export default ApplicationWindow;
