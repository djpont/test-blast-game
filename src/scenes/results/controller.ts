import { GAME } from '/shared/constants';
import { Localization } from '/shared/localozation';
import type { TGameResult, TSceneController } from '/shared/types';
import type { TResultsSceneContent, TResultsSceneCallbacks } from './types';

export const resultsSceneControllerWithResult = (gameResult: TGameResult): TSceneController => {
  return (content: TResultsSceneContent, callbacks: TResultsSceneCallbacks) => {
    content.closeButton.element.controller.registerPixiEvent(GAME.pointerEvent, callbacks.close);
    content.repeatButton.element.controller.registerPixiEvent(GAME.pointerEvent, callbacks.repeat);

    console.log(gameResult);

    const resultText = Localization.text[gameResult.winner ? 'win' : 'loose'];
    content.result.element.controller.changeText(resultText);

    const scoreText = `${Localization.text.score}: ${gameResult.score} из ${gameResult.goal}`;
    content.score.element.controller.changeText(scoreText);

    const stepsText = `${Localization.text.steps}: ${gameResult.steps}`;
    content.steps.element.controller.changeText(stepsText);
  };
};
