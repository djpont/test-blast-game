import { GAME } from '/shared/constants';
import type { TSceneController } from '/shared/types';
import type { TIntroSceneCallbacks, TIntroSceneContent } from './types';

export const introSceneController: TSceneController = (
  content: TIntroSceneContent,
  callbacks: TIntroSceneCallbacks,
) => {
  content.startButton.element.controller.registerPixiEvent(GAME.pointerEvent, callbacks.startGame);
};
