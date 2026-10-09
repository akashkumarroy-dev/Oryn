'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from '@/lib/gsap.config';

interface UseGSAPOptions {
  duration?: number;
  ease?: string;
}

export function useGSAP<T extends HTMLElement = HTMLElement>(options: UseGSAPOptions = {}) {
  const { duration = 0.3, ease = 'power2.out' } = options;
  const elementRef = useRef<T | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const animate = useCallback(
    (target: HTMLElement | null, vars: gsap.TweenVars) => {
      if (!target) return;
      if (animationRef.current) {
        animationRef.current.kill();
      }
      animationRef.current = gsap.to(target, {
        ...vars,
        duration,
        ease,
        overwrite: 'auto',
      });
    },
    [duration, ease]
  );

  const animateFrom = useCallback(
    (target: HTMLElement | null, vars: gsap.TweenVars) => {
      if (!target) return;
      if (animationRef.current) {
        animationRef.current.kill();
      }
      animationRef.current = gsap.from(target, {
        ...vars,
        duration,
        ease,
        overwrite: 'auto',
      });
    },
    [duration, ease]
  );

  const set = useCallback((target: HTMLElement | null, vars: gsap.TweenVars) => {
    if (!target) return;
    gsap.set(target, vars);
  }, []);

  const kill = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      kill();
    };
  }, [kill]);

  return { elementRef, animate, animateFrom, set, kill };
}

export function useGSAPHover<T extends HTMLElement = HTMLElement>(
  onHoverVars: gsap.TweenVars,
  onLeaveVars: gsap.TweenVars,
  options: UseGSAPOptions = {}
) {
  const { elementRef, animate, kill } = useGSAP<T>(options);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<T>) => {
      animate(e.currentTarget, onHoverVars);
    },
    [animate, onHoverVars]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<T>) => {
      animate(e.currentTarget, onLeaveVars);
    },
    [animate, onLeaveVars]
  );

  return { elementRef, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, kill };
}

export default useGSAP;