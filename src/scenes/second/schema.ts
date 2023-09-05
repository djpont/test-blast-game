import { Button, Text } from '/components';
import { secondSceneController } from '/scenes/second/controller';
import { TSecondSceneCallbacks, TSecondSceneSchema } from './types';

export const secondSceneSchema = (callbacks: TSecondSceneCallbacks): TSecondSceneSchema => {
  return {
    layout: {
      size: {
        width: 2000,
        height: 2000,
      },
    },
    callbacks,
    controller: secondSceneController,
    content: {
      label: {
        element: new Text('Second'),
        layout: { position: { x: 1000, y: 800 }, scale: 1 },
      },
      backButton: {
        element: new Button('Back', 'purple', 500),
        layout: { position: { x: 800, y: 1100 }, scale: 0.8 },
      },
    },
  };
};
