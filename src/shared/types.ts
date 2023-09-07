import { MVCComponent } from '/mvc';

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

export type TSceneLayout = {
  size?: TSize;
};

export type TSceneComponent<T = MVCComponent> = {
  element: T;
  layout?: {
    position?: TPosition;
    scale?: number;
  };
};

export type TSceneContent = Record<string, TSceneComponent>;

export type TSceneCallbacks = Record<string, TCallback>;

export type TSceneController = (content: TSceneContent, callbacks?: TSceneCallbacks) => void;

export type TSceneSchema = {
  layout?: TSceneLayout;
  callbacks?: TSceneCallbacks;
  controller?: TSceneController;
  content: TSceneContent;
};

export type TGameResult = {
  winner: boolean;
  score: number;
  goal?: number;
  steps: number;
};
