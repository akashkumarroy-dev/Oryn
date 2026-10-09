'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from '@/lib/gsap.config';

type CursorState = 'default' | 'link' | 'button' | 'minimal';

interface CursorStateConfig {
  cursor: {
    size: number;
    backgroundColor: string;
    borderRadius: string;
    backdropFilter: string;
  };
  ring: {
    size: number;
    borderColor: string;
    opacity: number;
  };
}

interface CursorConfig {
  size: number;
  ringSize: number;
  dot: { borderRadius: string; backgroundColor: string; backdropFilter: string };
  ring: { borderColor: string };
  states: Record<CursorState, CursorStateConfig>;
}

const CURSOR_CONFIG: CursorConfig = {
  size: 8,
  ringSize: 36,
  dot: { borderRadius: '0%', backgroundColor: '#FD0054', backdropFilter: 'invert(0)' },
  ring: { borderColor: '#EEEEEE' },
  states: {
    default: {
      cursor: { size: 8, backgroundColor: '#FD0054', borderRadius: '0%', backdropFilter: 'invert(0)' },
      ring: { size: 36, borderColor: '#EEEEEE', opacity: 1 },
    },
    link: {
      cursor: { size: 4, backgroundColor: '#EEEEEE', borderRadius: '50%', backdropFilter: 'invert(0)' },
      ring: { size: 72, borderColor: '#FD0054', opacity: 1 },
    },
    button: {
      cursor: {
        size: 52,
        backgroundColor: 'rgba(238,238,238,0)',
        borderRadius: '50%',
        backdropFilter: 'invert(1)',
      },
      ring: { size: 36, borderColor: '#EEEEEE', opacity: 0 },
    },
    minimal: {
      cursor: { size: 6, backgroundColor: '#FD0054', borderRadius: '50%', backdropFilter: 'invert(0)' },
      ring: { size: 44, borderColor: '#FD0054', opacity: 1 },
    },
  },
};

const useCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');

  const initStyles = useCallback(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    gsap.set([cursor, ring], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      willChange: 'transform, opacity',
    });

    gsap.set(cursor, {
      width: CURSOR_CONFIG.size,
      height: CURSOR_CONFIG.size,
      ...CURSOR_CONFIG.dot,
    });

    gsap.set(ring, {
      width: CURSOR_CONFIG.ringSize,
      height: CURSOR_CONFIG.ringSize,
      borderRadius: '50%',
      border: `1px solid ${CURSOR_CONFIG.ring.borderColor}`,
    });
  }, []);

  const applyState = useCallback((newState: CursorState) => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const config = CURSOR_CONFIG.states[newState];

    gsap.to(cursor, {
      width: config.cursor.size,
      height: config.cursor.size,
      backgroundColor: config.cursor.backgroundColor,
      borderRadius: config.cursor.borderRadius,
      backdropFilter: config.cursor.backdropFilter,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to(ring, {
      width: config.ring.size,
      height: config.ring.size,
      borderColor: config.ring.borderColor,
      opacity: config.ring.opacity,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const createSetters = useCallback(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return null;

    return {
      setX: gsap.quickSetter(cursor, 'x', 'px') as (v: number) => void,
      setY: gsap.quickSetter(cursor, 'y', 'px') as (v: number) => void,
      ringX: gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' }),
      ringY: gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' }),
    };
  }, []);

  // Setup (runs first so initStyles happens before any state tween)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    initStyles();
    const setters = createSetters();
    if (!setters) return;

    let visible = false;

    const show = (x: number, y: number) => {
      if (visible) return;
      visible = true;
      gsap.set(ringRef.current!, { x, y });
      gsap.to([cursorRef.current!, ringRef.current!], {
        opacity: 1, duration: 0.15, ease: 'power2.out', overwrite: 'auto',
      });
    };

    const hide = () => {
      if (!visible) return;
      visible = false;
      gsap.to([cursorRef.current!, ringRef.current!], {
        opacity: 0, duration: 0.15, ease: 'power2.out', overwrite: 'auto',
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      show(e.clientX, e.clientY);
      setters.setX(e.clientX);
      setters.setY(e.clientY);
      setters.ringX(e.clientX);
      setters.ringY(e.clientY);
    };

    const onMouseOut = (e: MouseEvent) => {
      // left the window
      if (!e.relatedTarget) {
        hide();
        return;
      }

      // left a link/button or data-cursor target (ignore moves to child elements)
      const fromEl = e.target as HTMLElement | null;
      const interactive = fromEl?.closest('a, [role="link"], button, [role="button"], input[type="button"], input[type="submit"], [data-cursor]');
      if (interactive && !interactive.contains(e.relatedTarget as Node)) {
        setState('default');
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const dataTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (dataTarget) {
        const value = dataTarget.dataset.cursor as CursorState | undefined;
        setState(value && value in CURSOR_CONFIG.states ? value : 'minimal');
        return;
      }

      if (target.closest('a, [role="link"]')) setState('link');
      else if (target.closest('button, [role="button"], input[type="button"], input[type="submit"]')) setState('button');
    };

    const onMouseDown = () => {
      gsap.to([cursorRef.current!, ringRef.current!], {
        scale: 0.7, duration: 0.2, ease: 'power2.out', overwrite: 'auto',
      });
    };

    const onMouseUp = () => {
      gsap.to([cursorRef.current!, ringRef.current!], {
        scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto',
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    window.addEventListener('blur', hide);

    return () => {
      gsap.killTweensOf([cursorRef.current, ringRef.current]);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('blur', hide);
    };
  }, [initStyles, createSetters]);

  // State changes (declared after setup so initStyles runs first on mount)
  useEffect(() => {
    applyState(state);
  }, [state, applyState]);

  return { cursorRef, ringRef, CURSOR: CURSOR_CONFIG, state };
};

export default useCursor;