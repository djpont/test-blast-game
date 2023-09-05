import { GAME } from '/shared/constants';
import { TSceneController } from '/shared/types';
import { TSecondSceneCallbacks, TSecondSceneContent } from './types';

export const secondSceneController: TSceneController = (
  content: TSecondSceneContent,
  callbacks: TSecondSceneCallbacks,
) => {
  const back = () => {
    callbacks.back();
  };

  content.backButton.element.controller.registerPixiEvent(GAME.pointerEvent, back);
};
