import { MVCComponent } from '/classes/mvc';
import { GameplayModel } from './model';
import { GameplayView } from './view';
import { GameplayController } from './controller';
import { type TGameplayContent } from './type';

export { type TGameplayContent };

export class Gameplay extends MVCComponent<GameplayModel, GameplayView, GameplayController> {
  constructor(content: TGameplayContent) {
    const model = new GameplayModel(content);
    const view = new GameplayView(model);
    const controller = new GameplayController(model, view);
    super(model, view, controller);
  }
}
