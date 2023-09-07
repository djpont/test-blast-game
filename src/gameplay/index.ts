import { MVCComponent } from '/classes/mvc';
import type { TCallback, TGameResult } from '/shared/types';
import { GameplayModel } from './model';
import { GameplayView } from './view';
import { GameplayController } from './controller';
import type { TGameplayContent } from 'src/gameplay/types';

export { type TGameplayContent };

export class Gameplay extends MVCComponent<GameplayModel, GameplayView, GameplayController> {
  constructor(content: TGameplayContent, resultsCallback: TCallback<TGameResult>) {
    const model = new GameplayModel(content, resultsCallback);
    const view = new GameplayView(model);
    const controller = new GameplayController(model, view);
    super(model, view, controller);
  }
}
