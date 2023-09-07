import { Button, Text } from '/components';
import { Localization } from '/shared/localozation';
import type { TGameResult } from '/shared/types';
import { resultsSceneControllerWithResult } from './controller';
import type { TResultsSceneCallbacks, TResultsSceneSchema } from './types';

export const resultsSceneSchema = (
  callbacks: TResultsSceneCallbacks,
  gameResult: TGameResult,
): TResultsSceneSchema => {
  return {
    layout: {
      size: {
        width: 1000,
        height: 1000,
      },
    },
    callbacks,
    controller: resultsSceneControllerWithResult(gameResult),
    content: {
      result: {
        element: new Text('result'),
        layout: { position: { x: 500, y: 200 }, scale: 1 },
      },
      score: {
        element: new Text('score'),
        layout: { position: { x: 500, y: 300 }, scale: 1 },
      },
      steps: {
        element: new Text('steps'),
        layout: { position: { x: 500, y: 400 }, scale: 1 },
      },
      repeatButton: {
        element: new Button(Localization.text.repeat, 'purple', 500),
        layout: { position: { x: 325, y: 500 }, scale: 0.7 },
      },
      closeButton: {
        element: new Button(Localization.text.close, 'pink', 500),
        layout: { position: { x: 325, y: 650 }, scale: 0.7 },
      },
    },
  };
};
