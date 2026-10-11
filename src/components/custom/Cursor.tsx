'use client';
import useCursor from "./useCursor";

const Cursor = () => {
  const { cursorRef, ringRef } = useCursor();

  return (
    <>
      <div ref={cursorRef} className="pointer-events-none fixed top-0 left-0 z-9999" aria-hidden="true" />
      <div ref={ringRef} className="pointer-events-none fixed top-0 left-0 z-9998" aria-hidden="true" />
    </>
  );
};

export default Cursor;