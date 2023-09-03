export type TPosition = {
  x: number;
  y: number;
};

export type TSize = {
  width: number;
  height: number;
};

export type PromiseResolver<T = unknown> = (value: T) => unknown;

export type TCallback<T = unknown> = (...args: T[]) => unknown;
