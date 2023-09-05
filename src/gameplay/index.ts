import { MVCComponent } from '/classes/mvc';
import { GameplayModel } from './model';
import { GameplayView } from './view';
import { GameplayController } from './controller';

export class Gameplay extends MVCComponent<GameplayModel, GameplayView, GameplayController> {
  constructor() {
    // console.log('Gameplay constructor');
    const model = new GameplayModel();
    const view = new GameplayView(model);
    const controller = new GameplayController(model, view);
    super(model, view, controller);
  }
}
