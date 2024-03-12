import { useState, useEffect, useRef } from "react";

export function usePositionAndSize({
  startPostion = { x: 10, y: 10 },
  startSize = { w: 200, h: 100 },
}) {
  const initialClickPosition = useRef({
    x: 0,
    y: 0,
  });

  const [position, setPosition] = useState({
    x: startPostion.x,
    y: startPostion.x,
  });
  const [isMoving, setIsMoving] = useState(false);

  const handlePosition = {
    onMouseDown(e) {
      setIsMoving(true);
      const rect = container.current.getBoundingClientRect();
      initialClickPosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    onMouseUp(e) {
      setIsMoving(false);
    },
    onMouseMove(e) {
      if (isMoving) {
        const rect = container.current.getBoundingClientRect();

        const newX = e.clientX - initialClickPosition.current.x;
        const newY = e.clientY - initialClickPosition.current.y;

        setPosition({
          x: newX,
          y: newY,
        });
      }
    },
    onTouchEnd(e) {
      setIsMoving(false);
    },
    onTouchMove(e) {
      if (isMoving) {
        const rect = container.current.getBoundingClientRect();

        const newX = e.touches[0].clientX - initialClickPosition.current.x;
        const newY = e.touches[0].clientY - initialClickPosition.current.y;

        setPosition({
          x: newX,
          y: newY,
        });
      }
    },
    onTouchStart(e) {
      setIsMoving(true);

      const rect = container.current.getBoundingClientRect();
      initialClickPosition.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    },
    onFullScreen(e) {
      setPosition({ x: 0, y: 0 });
    },
    onClose(e) {
      setPosition(startPostion);
    },
  };

  useEffect(() => {
    if (isMoving) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMoving]);

  //Spand
  const [size, setSize] = useState({
    w: startSize.w,
    h: startSize.h,
  });

  const initialSize = useRef({
    w: 200,
    h: 100,
  });
  const [isResizing, setIsResizing] = useState(false);

  const handleSize = {
    onMouseDown(e) {
      setIsResizing(true);
      initialClickPosition.current = {
        x: e.clientX,
        y: e.clientY,
      };
      initialSize.current = { w: size.w, h: size.h };
    },
    onMouseUp(e) {
      setIsResizing(false);
    },
    onMouseMove(e) {
      if (isResizing) {
        const newW =
          initialSize.current.w + e.clientX - initialClickPosition.current.x;
        const newH =
          initialSize.current.h + e.clientY - initialClickPosition.current.y;

        setSize({
          w: newW,
          h: newH,
        });
      }
    },
    onTouchStart(e) {
      setIsResizing(true);
      initialClickPosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      initialSize.current = { w: size.w, h: size.h };
    },
    onTouchEnd(e) {
      setIsResizing(false);
    },
    onTouchMove(e) {
      if (isResizing) {
        const newW =
          initialSize.current.w +
          e.touches[0].clientX -
          initialClickPosition.current.x;
        const newH =
          initialSize.current.h +
          e.touches[0].clientY -
          initialClickPosition.current.y;

        setSize({
          w: newW,
          h: newH,
        });
      }
    },
    onFullScreen(e) {
      const mainSizes = document.querySelector("main").getBoundingClientRect();
      console.log(mainSizes);
      setSize({ w: mainSizes.width, h: mainSizes.height });
    },
    onClose(e) {
      setSize(startSize);
    },
  };

  useEffect(() => {
    if (isResizing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isResizing]);

  const container = useRef(null);

  return {
    container: container,
    position: position,
    handlePosition: handlePosition,
    size: size,
    handleSize: handleSize,
  };
}
