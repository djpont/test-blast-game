import { TCallback } from '/shared/types';

export const turtle = (callback: TCallback, delay: number) => {
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
