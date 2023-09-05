import { Gameplay } from '/gameplay';
import { GAME } from '/shared/constants';
import { TSceneController } from '/shared/types';
import { TGameSceneCallbacks, TGameSceneContent } from './types';

export const gameSceneController: TSceneController = (
  content: TGameSceneContent,
  callbacks: TGameSceneCallbacks,
) => {
  // console.log('gameSceneController function', content);
  let gameplay = new Gameplay();

  const pause = () => {
    callbacks.back();
  };

  content.buttonPause.element.controller.registerPixiEvent(GAME.pointerEvent, pause);
};
