import type { TCallback, TPosition } from '/shared/types';

const turtle = (callback: TCallback, delay: number) => {
  let fn: TCallback = null;
  let timerId: NodeJS.Timeout;

  return () => {
    fn = callback;
    if (!timerId)
      timerId = setTimeout(() => {
        fn();
        timerId = undefined;
      }, delay);
  };
};

const distance = (position1: TPosition, position2: TPosition, sqrt: boolean = false): number => {
  const x = Math.abs(position1.x - position2.x);
  const y = Math.abs(position1.y - position2.y);
  return sqrt ? Math.sqrt(x * x + y * y) : x + y;
};

export const Utils = {
  turtle,
  distance,
};
