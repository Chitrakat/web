import React, { useRef, useEffect } from "react";
import p5 from "p5";

const P5Wrapper = ({ sketch }) => {
  const wrapperRef = useRef();

  useEffect(() => {
  const p5Instance = new p5(sketch, wrapperRef.current);
  window.p5Instance = p5Instance;
  window.p5Canvas = p5Instance.canvas;
  window.P5 = p5Instance;
  window.p5lib = p5;
    return () => {
      p5Instance.remove();
    };
  }, [sketch]);

  return <div ref={wrapperRef}></div>;
};

export default P5Wrapper;
