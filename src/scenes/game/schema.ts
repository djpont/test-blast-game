import { ButtonBonus, ButtonPause, Field, Panel, ProgressBar, Wallet } from '/components';
import { gameSceneController } from '/scenes/game/controller';
import { Localization } from '/shared/localozation';
import { TGameSceneCallbacks, TGameSceneSchema } from './types';

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
      buttonBonus1: {
        element: new ButtonBonus(10, Localization.text.bomb),
        layout: { position: { x: 1725, y: 1370 }, scale: 0.9 },
      },
      buttonBonus2: {
        element: new ButtonBonus(10, Localization.text.bomb),
        layout: { position: { x: 2125, y: 1370 }, scale: 0.9 },
      },
      buttonBonus3: {
        element: new ButtonBonus(10, Localization.text.bomb),
        layout: { position: { x: 1725, y: 1750 }, scale: 0.9 },
      },
      buttonBonus4: {
        element: new ButtonBonus(10, Localization.text.bomb),
        layout: { position: { x: 2125, y: 1750 }, scale: 0.9 },
      },
    },
  };
};
