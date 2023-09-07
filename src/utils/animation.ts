import type { TCallback } from '/shared/types';

type TFunction = TCallback;
let functions: TFunction[] = [];

const methods = {
  add: (fn: TFunction) => {
    const already = functions.filter(f => f === fn).length !== 0;
    if (!already) functions.push(fn);
  },
  delete: (fn: TFunction) => {
    functions = functions.filter(f => f !== fn);
  },
  timer: (duration: number) => {
    const timeStart = performance.now();
    return {
      getStep(): number {
        const elapsed = performance.now() - timeStart;
        return Math.min(1, elapsed / duration);
      },
    } as const;
  },
  play: (delta: number) => {
    functions.forEach(fn => fn(delta));
  },
} as const;

const addAnimationFunction = async (
  fn: TCallback<number>,
  duration: number = 0,
  callback: TCallback = undefined,
) => {
  if (duration <= 0) fn(1);
  return new Promise(resolve => {
    if (duration <= 0) {
      resolve(true);
    } else {
      const timer = methods.timer(duration);
      const animatedFn = () => {
        const step = timer.getStep();
        if (step < 1) {
          fn(timer.getStep());
        } else {
          fn(1);
          methods.delete(animatedFn);
          callback?.();
          resolve(true);
        }
      };
      methods.add(animatedFn);
    }
  });
};

export const Animations = {
  add: addAnimationFunction,
  play: methods.play,
} as const;
