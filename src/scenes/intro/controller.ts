import { GAME } from '/shared/constants';
import { TSceneController } from '/shared/types';
import { TIntroSceneCallbacks, TIntroSceneContent } from './types';

export const introSceneController: TSceneController = (
  content: TIntroSceneContent,
  callbacks: TIntroSceneCallbacks,
) => {
  const secondMenu = () => {
    callbacks.secondMenu();
  };

  const startGame = () => {
    callbacks.startGame();
  };

  content.startButton.element.controller.registerPixiEvent(GAME.pointerEvent, startGame);
  content.secondButton.element.controller.registerPixiEvent(GAME.pointerEvent, secondMenu);
};
