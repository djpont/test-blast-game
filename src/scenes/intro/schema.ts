import { Button, Text } from '/components';
import { Localization } from '/shared/localozation';
import { introSceneController } from './controller';
import { TIntroSceneCallbacks, TIntroSceneSchema } from './types';

export const introSceneSchema = (callbacks: TIntroSceneCallbacks): TIntroSceneSchema => {
  return {
    layout: {
      size: {
        width: 1000,
        height: 1000,
      },
    },
    controller: introSceneController,
    callbacks,
    content: {
      textTitle: {
        element: new Text(Localization.text.title),
        layout: { position: { x: 500, y: 350 }, scale: 1 },
      },
      startButton: {
        element: new Button(Localization.text.startGame, 'purple', 600),
        layout: { position: { x: 200, y: 500 }, scale: 1 },
      },
      secondButton: {
        element: new Button('Второе меню', 'purple', 500),
        layout: { position: { x: 300, y: 700 }, scale: 0.8 },
      },
    },
  };
};
