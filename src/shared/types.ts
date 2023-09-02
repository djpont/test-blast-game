import { POWERUPSCOLORS, WEAPONS } from '/shared/constants';

export type TPosition = {
  x: number;
  y: number;
};

export type TSize = {
  width: number;
  height: number;
};

export type TSuperPower = {
  minLimit: number;
  color: POWERUPSCOLORS;
  weapon: WEAPONS;
};

export type PromiseResolver<T = unknown> = (value: T) => unknown;

export type TCallback = (...args: unknown[]) => unknown;
