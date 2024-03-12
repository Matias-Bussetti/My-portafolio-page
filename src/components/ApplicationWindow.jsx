import { useRef, useState } from "react";

const ApplicationWindow = ({
  name,
  startPostion = { x: 10, y: 10 },
  startSize = { w: 200, h: 100 },
  children,
}) => {
  const [showWindow, setShowWindow] = useState(false);
  function closeWindow() {
    setShowWindow(false);
  }
  function openWindow() {
    setShowWindow(true);
  }
  const [onMouseDown, setOnMouseDown] = useState(false);
  const [windowPosition, setWindowPosition] = useState({
    x: startPostion.x,
    y: startPostion.x,
  });
  const initialClickPosition = useRef({
    x: 0,
    y: 0,
  });

  function handleWindowPosMouseDown(e) {
    setOnMouseDown(true);
    const rect = windowContainer.current.getBoundingClientRect();
    initialClickPosition.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }
  function handleWindowPosOnMouseUp(e) {
    setOnMouseDown(false);
  }
  function handleWindowPosMouseMove(e) {
    if (onMouseDown) {
      const rect = windowContainer.current.getBoundingClientRect();

      const newX = e.clientX - initialClickPosition.current.x;
      const newY = e.clientY - initialClickPosition.current.y;

      setWindowPosition({
        x: newX,
        y: newY,
      });
    }
  }

  function handleWidowPosOnTouchEnd(e) {
    setOnMouseDown(false);
  }
  function handleWidowPosOnTouchMove(e) {
    if (onMouseDown) {
      const rect = windowContainer.current.getBoundingClientRect();

      const newX = e.touches[0].clientX - initialClickPosition.current.x;
      const newY = e.touches[0].clientY - initialClickPosition.current.y;

      setWindowPosition({
        x: newX,
        y: newY,
      });
    }
  }
  function handleWidowPosOnTouchStart(e) {
    setOnMouseDown(true);
    const rect = windowContainer.current.getBoundingClientRect();
    initialClickPosition.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  }

  //Spand Window
  const [onSpandMouseDown, setSpandOnMouseDown] = useState(false);
  const [windowSize, setWindowSize] = useState({
    w: startSize.w,
    h: startSize.h,
  });

  const initialWindowSize = useRef({
    w: 200,
    h: 100,
  });

  function handleWindowSpandMouseDown(e) {
    setSpandOnMouseDown(true);
    const rect = windowContainer.current.getBoundingClientRect();
    initialClickPosition.current = {
      x: e.clientX,
      y: e.clientY,
    };
    initialWindowSize.current = { w: windowSize.w, h: windowSize.h };
  }
  function handleWindowSpandOnMouseUp(e) {
    setSpandOnMouseDown(false);
  }
  function handleWindowSpandMouseMove(e) {
    if (onSpandMouseDown) {
      const newW =
        initialWindowSize.current.w +
        e.clientX -
        initialClickPosition.current.x;
      const newH =
        initialWindowSize.current.h +
        e.clientY -
        initialClickPosition.current.y;

      setWindowSize({
        w: newW,
        h: newH,
      });
    }
  }

  function handleWindowSpandOnTouchStart(e) {
    setSpandOnMouseDown(true);
    const rect = windowContainer.current.getBoundingClientRect();
    initialClickPosition.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    initialWindowSize.current = { w: windowSize.w, h: windowSize.h };
  }
  function handleWindowSpandOnTouchEnd(e) {
    setSpandOnMouseDown(false);
  }
  function handleWindowSpandOnTouchMove(e) {
    if (onSpandMouseDown) {
      const newW =
        initialWindowSize.current.w +
        e.touches[0].clientX -
        initialClickPosition.current.x;
      const newH =
        initialWindowSize.current.h +
        e.touches[0].clientY -
        initialClickPosition.current.y;

      console.log(
        {
          w: newW,
          h: newH,
        },
        e.touches[0].clientX,
        e.touches[0].clientY,
        initialClickPosition.current,
        initialWindowSize.current
      );
      setWindowSize({
        w: newW,
        h: newH,
      });
    }
  }

  const windowContainer = useRef(null);
  return (
    <>
      <button onClick={openWindow}>{name}</button>

      <div
        ref={windowContainer}
        className={`window ${showWindow ? "show" : "hide"}`}
        style={{
          top: windowPosition.y + "px",
          left: windowPosition.x + "px",

          width: windowSize.w + "px",
          height: windowSize.h + "px",
        }}
      >
        <div
          className="top-bar"
          onMouseDown={handleWindowPosMouseDown}
          onMouseMove={handleWindowPosMouseMove}
          onMouseLeave={handleWindowPosOnMouseUp}
          onMouseUp={handleWindowPosOnMouseUp}
          onTouchEnd={handleWidowPosOnTouchEnd}
          onTouchMove={handleWidowPosOnTouchMove}
          onTouchStart={handleWidowPosOnTouchStart}
        >
          <button className="close" onClick={closeWindow}></button>
        </div>
        <div className="content-container">{children}</div>

        <button
          className="window-spand-btn"
          onMouseDown={handleWindowSpandMouseDown}
          onMouseMove={handleWindowSpandMouseMove}
          onMouseLeave={handleWindowSpandOnMouseUp}
          onMouseUp={handleWindowSpandOnMouseUp}
          onTouchEnd={handleWindowSpandOnTouchEnd}
          onTouchMove={handleWindowSpandOnTouchMove}
          onTouchMoveCapture={handleWindowSpandOnTouchMove}
          onTouchStart={handleWindowSpandOnTouchStart}
        ></button>
      </div>
    </>
  );
};

export default ApplicationWindow;
