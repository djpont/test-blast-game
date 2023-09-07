import { ButtonBonus, ButtonPause, Field, Panel, ProgressBar, Wallet } from '/components';
import { gameSceneController } from '/scenes/game/controller';
import { GAME } from '/shared/constants';
import { Localization } from '/shared/localization';
import type { TGameSceneCallbacks, TGameSceneSchema } from './types';

export const gameSceneSchema = (callbacks: TGameSceneCallbacks): TGameSceneSchema => {
  return {
    layout: {
      size: {
        width: 2540,
        height: 2120,
      },
    },
    controller: gameSceneController,
    callbacks,
    content: {
      progressBar: {
        element: new ProgressBar(2220),
        layout: { position: { x: 20, y: -100 }, scale: 1 },
      },
      buttonPause: {
        element: new ButtonPause(),
        layout: { position: { x: 2260, y: 10 }, scale: 0.9 },
      },
      field: {
        element: new Field(),
        layout: { position: { x: 0, y: 300 }, scale: 1 },
      },
      panel: {
        element: new Panel(),
        layout: { position: { x: 1650, y: 285 }, scale: 0.8 },
      },
      wallet: {
        element: new Wallet(),
        layout: { position: { x: 1740, y: 1170 }, scale: 1 },
      },
      buttonBonusBomb: {
        element: new ButtonBonus(GAME.bonusPrice.bomb, Localization.text.bonusBomb),
        layout: { position: { x: 1725, y: 1370 }, scale: 0.9 },
      },
      buttonBonusShuffle: {
        element: new ButtonBonus(GAME.bonusPrice.shuffle, Localization.text.bonusShuffle),
        layout: { position: { x: 2125, y: 1370 }, scale: 0.9 },
      },
      buttonBonusVertical: {
        element: new ButtonBonus(GAME.bonusPrice.vertical, Localization.text.bonusVertical),
        layout: { position: { x: 1725, y: 1750 }, scale: 0.9 },
      },
      buttonBonusHorizontal: {
        element: new ButtonBonus(GAME.bonusPrice.horizontal, Localization.text.bonusHorizontal),
        layout: { position: { x: 2125, y: 1750 }, scale: 0.9 },
      },
    },
  };
};
