import { Gameplay, type TGameplayContent } from '/gameplay';
import { GAME } from '/shared/constants';
import { TSceneController } from '/shared/types';
import { TGameSceneCallbacks, TGameSceneContent } from './types';

export const gameSceneController: TSceneController = (
  content: TGameSceneContent,
  callbacks: TGameSceneCallbacks,
) => {
  const gameplayContent: TGameplayContent = {
    field: content.field.element,
    progressBar: content.progressBar.element,
    panel: content.panel.element,
    wallet: content.wallet.element,
    buttonBonusBomb: content.buttonBonusBomb.element,
    buttonBonusVertical: content.buttonBonusVertical.element,
    buttonBonusHorizontal: content.buttonBonusHorizontal.element,
    buttonBonusShuffle: content.buttonBonusShuffle.element,
  };

  new Gameplay(gameplayContent);

  const pause = () => {
    callbacks.back();
  };

  content.buttonPause.element.controller.registerPixiEvent(GAME.pointerEvent, pause);
};
