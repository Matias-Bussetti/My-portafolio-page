import { useEffect, useRef, useState } from "react";
import { usePositionAndSize } from "../hooks/usePositionAndSize";
import { useAppsRegistered } from "../context/useAppRegisted";

const ApplicationWindow = ({
  id,
  name,
  startPostion = { x: 10, y: 10 },
  startSize = { w: 200, h: 100 },
  children,
}) => {
  const { registerApp, updateAppOpenStatus } = useAppsRegistered();

  const [showWindow, setShowWindow] = useState(false);
  const [isMinimize, setIsMinimize] = useState(false);

  const isClosing = useRef(false);

  function closeWindow(e) {
    setIsMinimize(false);
    setShowWindow(false);
    isClosing.current = true;
    setTimeout(() => {
      handlePosition.onClose(e);
      handleSize.onClose(e);
      isClosing.current = false;
    }, 500);
  }

  function openWindow() {
    setIsMinimize(false);
    if (!isClosing.current) {
      setTimeout(() => {
        setShowWindow(true);
      }, Math.floor(Math.random() * 1000));
    }
  }

  function minimizeWindow() {
    setIsMinimize((p) => !p);
  }

  function expandWindow(e) {
    handlePosition.onFullScreen(e);
    handleSize.onFullScreen(e);
  }

  const { container, position, handlePosition, size, handleSize } =
    usePositionAndSize(startPostion, startSize);

  useEffect(() => {
    registerApp({
      id: id,
      name: name,
      isOpen: showWindow,
      handleClose: closeWindow,
      handleOpen: openWindow,
      handleMinimize: minimizeWindow,
    });
  }, []);

  useEffect(() => {
    updateAppOpenStatus(id, showWindow);
  }, [showWindow]);

  return (
    <>
      <button onClick={openWindow}>{name}</button>

      <div
        ref={container}
        className={`window ${showWindow ? "open" : "close"} ${
          isMinimize ? "minimized" : ""
        }`}
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
          onDoubleClick={expandWindow}
        >
          <div className="app-title">
            <h2>{name}</h2>
          </div>
          <button className="close" onClick={minimizeWindow}>
            <span className="material-symbols-outlined">minimize</span>
          </button>
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
          //onMouseLeave={handleSize.onMouseUp}
          onTouchStart={handleSize.onTouchStart}
          onTouchMove={handleSize.onTouchMove}
          onTouchEnd={handleSize.onTouchEnd}
        ></button>
      </div>
    </>
  );
};

export default ApplicationWindow;
